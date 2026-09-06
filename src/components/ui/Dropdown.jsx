import { useEffect, useRef, useState } from 'react'

function Dropdown({
  trigger,
  children,
  align = 'left',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        type="button"
        className="dropdown-trigger"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
      >
        {trigger}
      </button>

      {isOpen && (
        <div className={`dropdown-menu dropdown-menu-${align}`}>
          {children}
        </div>
      )}
    </div>
  )
}

export default Dropdown