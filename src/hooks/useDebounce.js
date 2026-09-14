import {
  useCallback,
  useEffect,
  useRef,
} from 'react'

function useDebounce(callback, delay = 400) {
  const callbackRef = useRef(callback)
  const timeoutRef = useRef(null)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const cancel = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const debouncedCallback = useCallback(
    (...args) => {
      cancel()

      timeoutRef.current = window.setTimeout(() => {
        callbackRef.current(...args)
        timeoutRef.current = null
      }, delay)
    },
    [cancel, delay],
  )

  useEffect(() => {
    return cancel
  }, [cancel])

  return {
    debouncedCallback,
    cancel,
  }
}

export default useDebounce