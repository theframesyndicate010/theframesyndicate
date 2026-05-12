import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992 && mobileOpen) {
        closeMobile()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileOpen])

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const headerClass = `site-header${scrolled || !isHome ? ' scrolled' : ''}${hidden ? ' hidden' : ''}`

  return (
    <>
      <header className={headerClass}>
        <div className="topbar">
          <div className="topbar-container">
            <div className="topbar-left">
              <span className="topbar-item">
                <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                Birtamode, Jhapa, Nepal
              </span>
              <a className="topbar-link" href="mailto:theframesyndicate@gmail.com">
                <i className="fas fa-envelope" aria-hidden="true"></i>
                theframesyndicate@gmail.com
              </a>
            </div>
            <div className="topbar-right">
              <span className="topbar-item">
                <i className="far fa-clock" aria-hidden="true"></i>
                Office Hours: Sun - Fri 9:00 AM - 6:00 PM
              </span>
              <div className="topbar-social" aria-label="Social links">
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f" aria-hidden="true"></i>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in" aria-hidden="true"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar" role="navigation" aria-label="Main navigation">
          <div className="nav-container">
            <div className="logo-wrapper">
              <Link to="/" className="logo">
                <img src="/pogo.jpeg" alt="The Frame Syndicate" className="logo-img" />
                <div className="logo-text-block">
                  <span className="logo-text-name">
                    The <span className="logo-text-highlight">Frame</span> Syndicate
                  </span>
                </div>
              </Link>
            </div>
            <div className="nav-links-desktop">
              <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} end>Home</NavLink>
              <NavLink to="/about" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>About us</NavLink>
              <NavLink to="/services" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Services</NavLink>
              <NavLink to="/portfolio" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Portfolio</NavLink>
              <NavLink to="/contact" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Contact</NavLink>
            </div>
            <div className="nav-right">
              <div className="nav-contact">
                <span className="nav-contact-icon" aria-hidden="true">
                  <i className="fas fa-phone"></i>
                </span>
                <div className="nav-contact-text">
                  <span className="nav-contact-label">Contact</span>
                  <a href="tel:+9779815959883" className="nav-contact-value">+977 9815959883</a>
                </div>
              </div>
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
      </header>

      <div className={`mobile-menu${mobileOpen ? ' active' : ''}`} role="dialog" aria-label="Mobile navigation" aria-modal="true">
        <div className="mobile-menu-content">
          <ul className="mobile-nav-links" role="list">
            <li><Link to="/" onClick={closeMobile}>Home</Link></li>
            <li><Link to="/about" onClick={closeMobile}>About us</Link></li>
            <li><Link to="/services" onClick={closeMobile}>Services</Link></li>
            <li><Link to="/portfolio" onClick={closeMobile}>Portfolio</Link></li>
            <li><Link to="/contact" onClick={closeMobile}>Contact</Link></li>
          </ul>
        </div>
      </div>
    </>
  )
}
