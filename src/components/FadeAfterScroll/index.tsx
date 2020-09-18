import React, { ReactElement, useEffect, useRef, useState } from "react"
import { DelayedFade } from "../DelayedFade"
import { DelayedSlide } from "../DelayedSlide"

type Props = {
  height?: number
  timeout?: number
  children?: ReactElement
  startVisible?: boolean
  animateExit?: boolean
}

function getAnimationDirection(
  scrollDir: "up" | "down",
  showComp: boolean,
): "up" | "down" {
  switch (scrollDir) {
    case "up": {
      if (showComp) {
        return "down"
      }

      return "up"
    }
    case "down": {
      if (showComp) {
        return "up"
      }

      return "down"
    }
  }
}

export function FadeAfterScroll({
  children,
  height,
  timeout,
  startVisible = false,
  animateExit = false,
}: Props) {
  const [showComp, setShowComp] = useState(startVisible)
  const [scrollDir, setScrollDir] = useState<null | "up" | "down">(null)
  const scrollRef = useRef(
    document.getElementById("scrollToTop") ?? document.scrollingElement,
  )
  const scrollPosRef = useRef(scrollRef.current?.scrollTop)

  const targetRef = useRef<HTMLDivElement | null>(null)
  const hasMounted = useRef(false)

  useEffect(() => {
    hasMounted.current = true
  }, [])

  useEffect(() => {
    const target = targetRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const nextScrollDir =
            (scrollPosRef.current ?? 0) - (scrollRef.current?.scrollTop ?? 0) >
            0
              ? "up"
              : "down"

          if (entry.target === target && entry.isIntersecting && !showComp) {
            scrollPosRef.current = scrollRef.current?.scrollTop
            setScrollDir(nextScrollDir)
            setShowComp(true)
          }

          if (
            entry.target === target &&
            !entry.isIntersecting &&
            showComp &&
            animateExit
          ) {
            scrollPosRef.current = scrollRef.current?.scrollTop
            setScrollDir(nextScrollDir)
            setShowComp(false)
          }
        })
      },
      {
        root: scrollRef.current,
        rootMargin: "0px",
        threshold: 1.0,
      },
    )

    if (target) {
      observer.observe(target)
    }

    return () => {
      if (target) {
        observer.unobserve(target)
      }
    }
  }, [animateExit, setScrollDir, showComp])

  const direction = getAnimationDirection(scrollDir ?? "up", showComp)

  return (
    <div ref={targetRef} style={{ minHeight: height }}>
      <DelayedFade
        in={showComp}
        timeout={startVisible && !hasMounted.current ? 0 : timeout}
        unmountOnExit={false}
      >
        <div>
          <DelayedSlide
            in={showComp}
            direction={direction}
            timeout={startVisible && !hasMounted.current ? 0 : timeout}
            unmountOnExit={false}
          >
            {children}
          </DelayedSlide>
        </div>
      </DelayedFade>
    </div>
  )
}
