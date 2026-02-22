import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import DotMenu from './DotMenu'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    let lastScroll = 0
    const handleScroll = () => {
      const currentScroll = window.pageYOffset
      setScrolled(currentScroll > 50)
      if (currentScroll > lastScroll && currentScroll > 200) {
        setHidden(true)
      } else if (lastScroll - currentScroll > 5 || currentScroll <= 200) {
        setHidden(false)
      }
      lastScroll = currentScroll
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    document.body.style.overflow = ''
  }, [location.pathname])

  const toggleMobile = () => {
    const next = !mobileOpen
    setMobileOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  const closeMobile = () => {
    setMobileOpen(false)
    document.body.style.overflow = ''
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mobileOpen) closeMobile()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileOpen])

  const navClass = `navbar${scrolled || !isHome ? ' scrolled' : ''}`

  return (
    <>
      <nav
        className={navClass}
        role="navigation"
        aria-label="Main navigation"
        style={{ transform: hidden ? 'translateY(-100%)' : 'translateY(0)' }}
      >
        <div className="nav-container">
          <div className="logo-wrapper">
            <Link to="/" className="logo">
              <img src="/logo.png" alt="The Frame Syndicate" className="logo-img" />
              <div className="logo-text-block">
                <span className="slogan">&quot;Frame your ideas with our software&quot;</span>
                <span className="logo-text-name">
                  The <span className="logo-text-highlight">Frame</span> Syndicate
                </span>
              </div>
            </Link>
          </div>
          <div className="nav-links-desktop">
            <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} end>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>About</NavLink>
            <NavLink to="/services" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Services</NavLink>
            <NavLink to="/portfolio" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Portfolio</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Contact</NavLink>
          </div>
          <div className="nav-right">
            <Link to="/contact" className="btn btn-primary">Start A Project</Link>
            {isHome && <DotMenu />}
            <button
              className={`menu-toggle${mobileOpen ? ' active' : ''}`}
              onClick={toggleMobile}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu${mobileOpen ? ' active' : ''}`} role="dialog" aria-label="Mobile navigation">
        <div className="mobile-menu-content">
          <ul className="mobile-nav-links" role="list">
            <li><Link to="/" onClick={closeMobile}>Home</Link></li>
            <li><Link to="/about" onClick={closeMobile}>About Us</Link></li>
            <li><Link to="/services" onClick={closeMobile}>Services</Link></li>
            <li><Link to="/portfolio" onClick={closeMobile}>Portfolio</Link></li>
            <li><Link to="/contact" onClick={closeMobile}>Contact</Link></li>
          </ul>
        </div>
      </div>
    </>
  )
}
