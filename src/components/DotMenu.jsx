import { useState, useEffect, useRef } from 'react'

export default function DotMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <div className="dot-menu-wrapper" ref={wrapperRef}>
      <button
        className="dot-menu-btn"
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen) }}
        aria-label="Quick Access"
      >
        <span className="dot-grid">
          {[...Array(9)].map((_, i) => (
            <span key={i} className="dot" />
          ))}
        </span>
      </button>
      <div className={`dot-menu-popup${isOpen ? ' active' : ''}`}>
        <div className="dot-menu-title">Fast Access</div>
        <ul className="dot-menu-list">
          <li><a href="#" className="dot-menu-link">Sajha Karobar</a></li>
          <li><a href="#" className="dot-menu-link">Thekedar Sahajta</a></li>
          <li><a href="#" className="dot-menu-link">Finding Hives</a></li>
          <li><a href="#" className="dot-menu-link">Billing System</a></li>
          {[...Array(5)].map((_, i) => (
            <li key={i}><span className="dot-menu-link disabled">Coming Soon</span></li>
          ))}
        </ul>
      </div>
    </div>
  )
}
