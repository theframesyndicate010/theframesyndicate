import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <img src="/logo.png" alt="The Frame Syndicate" className="logo-img" />
              <div className="logo-text-block">
                <span className="slogan">&quot;Frame your ideas with our software&quot;</span>
                <span className="logo-text-name">
                  The <span className="logo-text-highlight">Frame</span> Syndicate
                </span>
              </div>
            </Link>
            <p className="footer-description">
              Award-winning IT solutions company delivering innovative digital experiences worldwide.
            </p>
          </div>
          <div className="footer-links">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services#cloud">Cloud Solutions</Link></li>
              <li><Link to="/services#software">Software Development</Link></li>
              <li><Link to="/services#security">Cybersecurity</Link></li>
              <li><Link to="/services#seo">SEO Services</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/portfolio">Our Work</Link></li>
              <li><Link to="/contact">Careers</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Case Studies</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Frame Syndicate. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
