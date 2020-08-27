import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  MutableRefObject,
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

interface SharedElementContextStatePlain {
  ghostLayerRef: MutableRefObject<HTMLElement | null>
  sharedElementRef: MutableRefObject<HTMLElement | null>
  sharedTargetRef: MutableRefObject<HTMLElement | null>
  scrollElementRef: MutableRefObject<HTMLElement | null>
  isAnimating: boolean
  savedScrollPosition: number | null
  restoreScrollPosition: boolean
}

type SharedElementContextStateValues = Pick<
  SharedElementContextState,
  "isAnimating" | "savedScrollPosition" | "restoreScrollPosition"
>

type setSharedElementContextStateValues = (
  stateSetter: (
    prevState: SharedElementContextStateValues,
  ) => SharedElementContextStateValues,
) => unknown

type SharedElementContextState = SharedElementContextStatePlain & {
  setSharedElementContextState: setSharedElementContextStateValues
}

const initialSharedElementContextState: SharedElementContextState = {
  ghostLayerRef: { current: null },
  sharedElementRef: { current: null },
  sharedTargetRef: { current: null },
  scrollElementRef: { current: null },
  isAnimating: false,
  savedScrollPosition: null,
  restoreScrollPosition: false,
  setSharedElementContextState: () => undefined,
}

const SharedElementContext = createContext(initialSharedElementContextState)

interface Props {
  children: ReactElement
  scrollElementRef?: MutableRefObject<HTMLElement | null>
  ghostLayerProps?: DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
}

const transitionSpeed = 500

// IDEA, give this an ID and a way to register the refs, or even pass the refs in.
// so maybe we can have an easy way to manage multiple shared element transitions and be able to cleanup better
// it would probably store the refs in a map of {[id: string]: { trigger: ref, target: ref }}

// find a way to hide the ghost layer until it's needed
export const useSharedElement = () => {
  const { setSharedElementContextState, ...state } = useContext(
    SharedElementContext,
  )

  const startAnimation = useCallback(
    (
      sharedElement: HTMLElement,
      options?: {
        restoreScrollPosition?: boolean
        captureScrollPosition?: boolean
        transitionSpeed?: number
      },
    ) => {
      if (state.ghostLayerRef.current) {
        const scrollElement = state.scrollElementRef?.current
        const ghostLayer = state.ghostLayerRef.current

        const el = sharedElement.cloneNode(true) as HTMLElement
        const boundingRect = sharedElement.getBoundingClientRect()
        const scrollPosition = scrollElement?.scrollTop

        el.style.position = "fixed"
        el.style.top = `${boundingRect.top}px`
        el.style.left = `${boundingRect.left}px`
        el.style.height = `${boundingRect.height}px`
        el.style.width = `${boundingRect.width}px`
        el.style.transition = `${
          options?.transitionSpeed ?? transitionSpeed
        }ms ease`
        el.style.willChange = "transform, width, height"

        state.sharedElementRef.current = ghostLayer.appendChild(el)

        setSharedElementContextState((prevState) => ({
          ...prevState,
          savedScrollPosition: options?.captureScrollPosition
            ? scrollPosition ?? null
            : prevState.savedScrollPosition,
          isAnimating: true,
          restoreScrollPosition: options?.restoreScrollPosition ?? false,
        }))
      }
    },
    [
      setSharedElementContextState,
      state.ghostLayerRef,
      state.scrollElementRef,
      state.sharedElementRef,
    ],
  )

  return [state, { startAnimation }] as const
}

export const SharedElementProvider = ({
  children,
  ghostLayerProps,
  scrollElementRef,
}: Props) => {
  const ghostLayerRef = useRef<HTMLDivElement | null>(null)
  const sharedElementRef = useRef<HTMLElement | null>(null)
  const sharedTargetRef = useRef<HTMLElement | null>(null)

  const [state, setState] = useState<SharedElementContextStateValues>({
    isAnimating: false,
    savedScrollPosition: null,
    restoreScrollPosition: false,
  })

  useLayoutEffect(() => {
    if (
      state.isAnimating &&
      ghostLayerRef.current &&
      sharedElementRef.current &&
      sharedTargetRef.current
    ) {
      const scrollElement = scrollElementRef?.current
      const ghostLayer = ghostLayerRef.current
      const sharedElement = sharedElementRef.current
      const sharedTarget = sharedTargetRef.current

      if (state.restoreScrollPosition && scrollElement) {
        scrollElement.scrollTo(
          0,
          state.savedScrollPosition ?? sharedTarget.offsetTop,
        )
      }

      const sharedElementBoundingBox = sharedElement.getBoundingClientRect()
      const sharedTargetBoundingBox = sharedTarget.getBoundingClientRect()

      const verticalDelta =
        sharedTargetBoundingBox.top - sharedElementBoundingBox.top
      const horizontalDelta =
        sharedTargetBoundingBox.left - sharedElementBoundingBox.left

      const heightTarget = sharedTargetBoundingBox.height
      const widthTarget = sharedTargetBoundingBox.width

      const cleanup = () => {
        if (sharedElement) {
          ghostLayer?.childNodes.forEach((child) => {
            if (child === sharedElement) {
              ghostLayer?.removeChild(child)
            }
          })
        }

        setState((prevState) => ({
          ...prevState,
          isAnimating: false,
          savedScrollPosition: prevState.restoreScrollPosition
            ? null
            : prevState.savedScrollPosition,
          restoreScrollPosition: false,
        }))

        ghostLayer?.removeEventListener("transitionend", cleanup)
      }

      ghostLayer.addEventListener("transitionend", cleanup, {
        once: true,
      })

      requestAnimationFrame(() => {
        if (sharedElement) {
          sharedElement.style.transform = `translateY(${verticalDelta}px) translateX(${horizontalDelta}px)`
          sharedElement.style.width = `${widthTarget}px`
          sharedElement.style.height = `${heightTarget}px`
        }
      })
    }
  }, [
    scrollElementRef,
    state.isAnimating,
    state.restoreScrollPosition,
    state.savedScrollPosition,
  ])

  return (
    <SharedElementContext.Provider
      value={{
        ...state,
        setSharedElementContextState: setState,
        ghostLayerRef,
        sharedElementRef,
        sharedTargetRef,
        scrollElementRef: scrollElementRef ?? { current: null },
      }}
    >
      {children}
      <div
        {...ghostLayerProps}
        style={{
          display: !state.isAnimating ? "none" : undefined,
          ...ghostLayerProps?.style,
        }}
        ref={ghostLayerRef}
      />
    </SharedElementContext.Provider>
  )
}
