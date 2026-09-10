import { useCallback, useState } from 'react'

function useDisclosure(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggle = useCallback(() => {
    setIsOpen((current) => !current)
  }, [])

  return {
    isOpen,
    open,
    close,
    toggle,
  }
}

export default useDisclosure