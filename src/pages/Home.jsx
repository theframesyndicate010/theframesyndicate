import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'
import TestimonialSlider from '../components/TestimonialSlider'
import TrustSection from '../components/TrustSection'
import HorizontalScroll from '../components/HorizontalScroll'
import PortfolioStack from '../components/PortfolioStack'
import { pageData } from '../content/pageData'


const aboutPoints = [
  '24/7 Call Services Available',
  'Great Skilled Consultant',
  'Expert Team Members',
]

const aboutBadges = [
  {
    icon: 'fas fa-certificate',
    title: 'Certified Company',
    text: 'Trusted and certified for delivering quality IT solutions.',
  },
  {
    icon: 'fas fa-award',
    title: 'Award Ceremony',
    text: 'Proud recipient of industry awards for innovation and excellence in IT services.',
  },
]

const services = [
  { image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500', alt: 'Cloud Solutions', tags: ['Cloud', 'Infrastructure'], title: 'Cloud Solutions', desc: 'Scalable cloud infrastructure and migration services to transform your business operations.' },
  { image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500', alt: 'Software Development', tags: ['Development', 'Custom Apps'], title: 'Software Development', desc: 'Custom software solutions built with cutting-edge technologies tailored to your needs.' },
  { image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500', alt: 'Cybersecurity', tags: ['Security', 'Protection'], title: 'Cybersecurity', desc: 'Comprehensive security solutions to protect your digital assets and data integrity.' },
  { image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=500', alt: 'AI & Machine Learning', tags: ['AI', 'Automation'], title: 'AI & Machine Learning', desc: 'Intelligent automation and AI-powered solutions to drive innovation and efficiency.' },
  { image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=500', alt: 'SEO Services', tags: ['SEO', 'Marketing'], title: 'SEO Services', desc: 'Expert search engine optimization to boost your online visibility and drive organic growth.' },
]


const statsData = [
  { target: 10, suffix: '', label: 'Projects Delivered' },
  { target: 98, suffix: '%', label: 'Client Satisfaction' },
  { target: 7, suffix: '+', label: 'Team Experts' },
  { target: 3, suffix: '', label: 'Years Experience' },
]

export default function Home() {
  const page = pageData['/']
  const heroRef = useScrollReveal({ reveal: 'fade-up', stagger: true })
  const aboutRef = useScrollReveal({ reveal: 'fade-up', stagger: true })

  const contactRef = useScrollReveal({ reveal: 'fade-up', stagger: true })

  // Stats counter
  const [counts, setCounts] = useState(statsData.map(() => 0))
  const statsRef = useRef(null)
  const statsRevealRef = useScrollReveal({ reveal: 'fade-up', stagger: true })
  const statsAnimated = useRef(false)
  const setStatsRefs = (node) => {
    statsRef.current = node
    statsRevealRef.current = node
  }

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsAnimated.current) {
          statsAnimated.current = true
          const duration = 2000
          const start = Date.now()
          const update = () => {
            const progress = Math.min((Date.now() - start) / duration, 1)
            setCounts(statsData.map(s => Math.floor(s.target * progress)))
            if (progress < 1) requestAnimationFrame(update)
          }
          update()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Parallax blobs
  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return
    const handleScroll = () => {
      const scrollY = window.pageYOffset
      document.querySelectorAll('.blob, .cta-blob').forEach((blob, i) => {
        blob.style.transform = `translateY(${scrollY * (i + 1) * 0.08}px)`
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Contact form
  const [formData, setFormData] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [formStatus, setFormStatus] = useState(null)

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('sending')
    setTimeout(() => {
      setFormStatus('sent')
      setFormData({ name: '', email: '', company: '', service: '', message: '' })
      setTimeout(() => setFormStatus(null), 2000)
    }, 1500)
  }

  const scrollToSection = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero hero-classic" id="hero" ref={heroRef}>
        <div className="hero-media" aria-hidden="true">
          <div className="hero-video" data-reveal="mask" data-reveal-item>
            <video autoPlay muted loop playsInline preload="auto">
              <source
                src="https://cdn.pixabay.com/video/2026/04/22/348116_large.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-classic-content" data-reveal="scale-blur" data-reveal-item>
            <span className="hero-topline">Optimize IT Systems</span>
            <h1 className="hero-title">
              Building Digital <span className="highlight">Solutions</span><br />
              That Scale
            </h1>
            <p className="hero-description">
              We design and develop powerful digital experiences and IT solutions that help
              businesses streamline operations, delight customers, and grow faster.
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-light hero-cta">
                Start Now
                <span className="btn-arrow" aria-hidden="true"><i className="fas fa-arrow-right"></i></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-showcase" id="about" ref={aboutRef}>
        <div className="container">
          <div className="about-showcase-shell">
            <div className="about-showcase-grid">
              <div className="about-showcase-media" data-reveal="parallax" data-parallax-intensity="22" data-reveal-item>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900"
                  alt="Engineering team collaboration"
                  loading="lazy"
                />
                <div className="about-showcase-controls" aria-hidden="true">
                  <button type="button" className="about-showcase-control">
                    <i className="fas fa-arrow-left" aria-hidden="true"></i>
                  </button>
                  <button type="button" className="about-showcase-control">
                    <i className="fas fa-arrow-right" aria-hidden="true"></i>
                  </button>
                </div>
                <div className="about-showcase-stat">
                  <span className="about-showcase-stat-value">1M+</span>
                  <span className="about-showcase-stat-label">Overall happy Customers</span>
                </div>
              </div>
              <div className="about-showcase-content" data-reveal-item>
                <span className="about-showcase-tag">About Us</span>
                <h2 className="about-showcase-title">Scaling Engineering Teams for Growing IT Companies</h2>
                <p className="about-showcase-text">
                  Helping IT companies scale faster with expert engineering talent and flexible
                  development support.
                </p>
                <ul className="about-showcase-list">
                  {aboutPoints.map((point) => (
                    <li key={point}>
                      <i className="fas fa-circle" aria-hidden="true"></i>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="about-showcase-badges">
                  {aboutBadges.map((badge) => (
                    <div key={badge.title} className="about-showcase-badge">
                      <span className="about-showcase-badge-icon" aria-hidden="true">
                        <i className={badge.icon}></i>
                      </span>
                      <div>
                        <h4>{badge.title}</h4>
                        <p>{badge.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustSection />

      {/* Services Section — Horizontal Scroll */}
      <HorizontalScroll
        sectionTag="What We Do Best"
        sectionTitle={
          <h2 className="section-title-large">
            Creating digital products &amp;<br />experiences
          </h2>
        }
      >
        {services.map((s, i) => (
          <div key={i} className="hz-card">
            <div className="hz-card-number">{String(i + 1).padStart(2, '0')}</div>
            <div className="service-image">
              <img src={s.image} alt={s.alt} loading="lazy" />
              <div className="service-tags">
                {s.tags.map((tag, j) => (
                  <span key={j} className="service-tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="hz-card-body">
              <h3 className="service-title">{s.title}</h3>
              <p className="service-description">{s.desc}</p>
              <Link to="/services" className="hz-card-link">
                Learn More <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        ))}
      </HorizontalScroll>

      {/* Portfolio — Stacking Scroll Animation */}
      <PortfolioStack />

      {/* Stats Section */}
      <section className="stats-section" ref={setStatsRefs}>
        <div className="container">
          <div className="stats-grid">
            {statsData.map((s, i) => (
              <div key={i} className="stat-item" data-reveal-item>
                <span className="stat-number">{counts[i]}</span>
                {s.suffix && <span className="stat-suffix">{s.suffix}</span>}
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSlider />

      {/* Contact Section */}
      <section className="contact-section" id="contact" ref={contactRef}>
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info" data-reveal-item>
              <span className="section-tag"><span className="tag-dot"></span> Get In Touch</span>
              <h2 className="section-title-large">Let&apos;s Start<br />A Project</h2>
              <p className="contact-text">
                Have a project in mind? We&apos;d love to hear about it. Get in touch with us and
                let&apos;s see how we can help transform your ideas into reality.
              </p>
              <div className="contact-details">
                <div className="contact-item"><i className="fas fa-envelope"></i><span>theframesyndicate@gmail.com</span></div>
                <div className="contact-item"><i className="fas fa-envelope"></i><span>surajmechesuraj@gmail.com</span></div>
                <div className="contact-item"><i className="fas fa-phone"></i><span>+977 9815959883</span></div>
                <div className="contact-item"><i className="fas fa-map-marker-alt"></i><span>Birtamode &amp; Dhulabari, Jhapa, Nepal</span></div>
              </div>
              <div className="social-links">
                <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-link"><i className="fab fa-github"></i></a>
                <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
            <div className="contact-form-wrapper" data-reveal-item>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input type="text" name="name" placeholder="Your Name" required value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <input type="email" name="email" placeholder="Your Email" required value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <input type="text" name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <select name="service" required value={formData.service} onChange={handleChange}>
                    <option value="" disabled>Select a Service</option>
                    <option value="cloud">Cloud Solutions</option>
                    <option value="software">Software Development</option>
                    <option value="security">Cybersecurity</option>
                    <option value="ai">AI &amp; Machine Learning</option>
                    <option value="seo">SEO Services</option>
                    <option value="consulting">IT Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea name="message" placeholder="Tell us about your project" rows="5" required value={formData.message} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-full" disabled={formStatus === 'sending'}>
                  {formStatus === 'sending' ? 'Sending...' : formStatus === 'sent' ? 'Sent!' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
