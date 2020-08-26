import { MutableRefObject, useEffect } from "react"
import { useHistory } from "react-router-dom"

interface Props {
  scrollRef?: MutableRefObject<HTMLElement | null>
}

export function ScrollToTop(props: Props) {
  const history = useHistory()

  useEffect(() => {
    const unlisten = history.listen((_, action) => {
      if (action !== "POP") {
        if (props.scrollRef?.current) {
          props.scrollRef.current.scrollTo(0, 0)
        } else {
          window.scrollTo(0, 0)
        }
      }
    })
    return () => {
      unlisten()
    }
  }, [history, props.scrollRef])

  return null
}
