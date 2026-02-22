import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'
import TestimonialSlider from '../components/TestimonialSlider'

const tabContent = {
  1: {
    title: 'Highly Rated',
    text: <>Highly rated IT solutions company trusted by businesses across Nepal. <em>Not to brag</em>, but we&apos;re recognised for delivering quality work and exceptional service.</>,
  },
  2: {
    title: 'Fully Certified',
    text: 'Our team holds certifications from leading technology providers including AWS, Microsoft Azure, Google Cloud, and more. We maintain ISO 27001 and SOC 2 compliance to ensure your data is always protected.',
  },
  3: {
    title: 'Custom Solutions',
    text: "Every business is unique, and so are our solutions. We don't believe in one-size-fits-all approaches. Our team works closely with you to understand your specific needs and deliver tailored solutions that drive real results.",
  },
  4: {
    title: '24/7 Support',
    text: 'Technology never sleeps, and neither does our support team. With round-the-clock monitoring and dedicated support specialists, we ensure your systems run smoothly at all times. Our average response time is under 15 minutes.',
  },
}

const awards = [
  { icon: 'fas fa-trophy', count: '50+', text: 'Projects' },
  { icon: 'fas fa-star', count: '5.0', text: 'Rating' },
  { icon: 'fas fa-award', count: 'Multiple', text: 'Awarded' },
  { icon: 'fas fa-certificate', count: 'Certified', text: 'Experts' },
  { icon: 'fas fa-users', count: '100+', text: 'Clients' },
]

const services = [
  { image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500', alt: 'Cloud Solutions', tags: ['Cloud', 'Infrastructure'], title: 'Cloud Solutions', desc: 'Scalable cloud infrastructure and migration services to transform your business operations.' },
  { image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500', alt: 'Software Development', tags: ['Development', 'Custom Apps'], title: 'Software Development', desc: 'Custom software solutions built with cutting-edge technologies tailored to your needs.' },
  { image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500', alt: 'Cybersecurity', tags: ['Security', 'Protection'], title: 'Cybersecurity', desc: 'Comprehensive security solutions to protect your digital assets and data integrity.' },
  { image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=500', alt: 'AI & Machine Learning', tags: ['AI', 'Automation'], title: 'AI & Machine Learning', desc: 'Intelligent automation and AI-powered solutions to drive innovation and efficiency.' },
  { image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=500', alt: 'SEO Services', tags: ['SEO', 'Marketing'], title: 'SEO Services', desc: 'Expert search engine optimization to boost your online visibility and drive organic growth.' },
]

const workItems = [
  { image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600', alt: 'Global Finance Platform', category: 'Enterprise', title: 'Global Finance Platform', className: 'work-item work-large' },
  { image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', alt: 'Retail Innovation', category: 'E-commerce', title: 'Retail Innovation', className: 'work-item' },
  { image: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=400', alt: 'MedTech Solutions', category: 'Healthcare', title: 'MedTech Solutions', className: 'work-item' },
  { image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400', alt: 'Smart City Network', category: 'IoT', title: 'Smart City Network', className: 'work-item' },
  { image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600', alt: 'Innovation Hub', category: 'Startup', title: 'Innovation Hub', className: 'work-item work-wide' },
]

const statsData = [
  { target: 150, suffix: '', label: 'Projects Delivered' },
  { target: 98, suffix: '%', label: 'Client Satisfaction' },
  { target: 7, suffix: '+', label: 'Team Experts' },
  { target: 3, suffix: '', label: 'Years Experience' },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState(1)
  const aboutRef = useScrollReveal()
  const featuresRef = useScrollReveal()
  const servicesRef = useScrollReveal()
  const workRef = useScrollReveal()
  const ctaRef = useScrollReveal()
  const contactRef = useScrollReveal()

  // Stats counter
  const [counts, setCounts] = useState(statsData.map(() => 0))
  const statsRef = useRef(null)
  const statsAnimated = useRef(false)

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
      <section className="hero" id="hero">
        <div className="hero-background">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>
        <div className="hero-content">
          <p className="hero-subtitle">be innovative</p>
          <h1 className="hero-title">
            <span className="highlight">award winning</span><br />
            IT solutions company
          </h1>
          <p className="hero-description">
            We&apos;re Frame Syndicate, a <strong>cutting-edge IT solutions company</strong>, focused on creating innovative
            and <strong>transformative digital experiences</strong> for businesses and enterprises worldwide.
          </p>
          <a href="#work" className="btn btn-outline" onClick={(e) => scrollToSection(e, 'work')}>Our Work</a>
        </div>
        <div className="scroll-indicator">
          <span>Scroll Down</span>
          <i className="fas fa-arrow-down"></i>
        </div>
        <div className="awards-bar">
          {awards.map((a, i) => (
            <div key={i} className="award-item">
              <div className="award-logo"><i className={a.icon}></i></div>
              <div className="award-info">
                <span className="award-count">{a.count}</span>
                <span className="award-text">{a.text}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about" ref={aboutRef}>
        <div className="container">
          <div className="about-grid">
            <div className="about-images">
              <div className="image-stack">
                <div className="about-image about-image-1">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400" alt="Team collaboration at Frame Syndicate" loading="lazy" />
                </div>
                <div className="about-image about-image-2">
                  <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400" alt="Modern office workspace" loading="lazy" />
                </div>
              </div>
            </div>
            <div className="about-content">
              <span className="section-tag"><span className="tag-dot"></span> Global IT Solutions Company</span>
              <h2 className="section-title">Frame<span className="highlight">Syndicate</span><span className="dot">.</span></h2>
              <p className="about-text">
                We design unique and powerful IT solutions for businesses and enterprises worldwide,
                offering a personalised, hands-on service from our expert team that adds true value.
              </p>
              <p className="about-text">
                We break the process down into easy, manageable steps, working closely with you at every turn.
                From <a href="#">cloud solutions</a> and <a href="#">software development</a> to{' '}
                <a href="#">cybersecurity</a>, <a href="#">AI integration</a>, and UI/UX,
                we take care of every detail to create a solution that&apos;s tailored just for you.
              </p>
              <p className="about-text">
                With a passion for high-performance, innovative digital experiences, we focus on giving
                our clients a competitive edge and delivering strong ROI on their investment.
              </p>
              <a href="#contact" className="btn btn-secondary" onClick={(e) => scrollToSection(e, 'contact')}>About Us</a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" ref={featuresRef}>
        <div className="container">
          <div className="features-grid">
            <div className="features-sidebar">
              {[1, 2, 3, 4].map(tab => (
                <div
                  key={tab}
                  className={`feature-tab${activeTab === tab ? ' active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  <span>{tabContent[tab].title}</span>
                  {activeTab === tab && <span className="tab-line"></span>}
                </div>
              ))}
            </div>
            <div className="features-showcase">
              <div className="showcase-images">
                {[
                  { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300', alt: 'Project 1' },
                  { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=300', alt: 'Project 2' },
                  { src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=300', alt: 'Project 3' },
                  { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300', alt: 'Project 4' },
                  { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300', alt: 'Project 5' },
                  { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300', alt: 'Project 6' },
                ].map((img, i) => (
                  <div key={i} className="showcase-image">
                    <img src={img.src} alt={img.alt} />
                  </div>
                ))}
              </div>
            </div>
            <div className="features-content">
              <h3 className="features-title">{tabContent[activeTab].title}</h3>
              <p className="features-text">{tabContent[activeTab].text}</p>
              <div className="features-badges">
                <div className="badge"><i className="fas fa-check-circle"></i><span>ISO Certified</span></div>
                <div className="badge"><i className="fas fa-shield-alt"></i><span>SOC 2 Compliant</span></div>
                <div className="badge"><i className="fas fa-award"></i><span>Award Winner</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section" id="services" ref={servicesRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag"><span className="tag-dot"></span> What We Do Best</span>
            <h2 className="section-title-large">Creating digital products &amp;<br />experiences</h2>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <div key={i} className="service-card">
                <div className="service-image">
                  <img src={s.image} alt={s.alt} loading="lazy" />
                  <div className="service-tags">
                    {s.tags.map((tag, j) => <span key={j} className="service-tag">{tag}</span>)}
                  </div>
                </div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-description">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section className="work-section" id="work" ref={workRef}>
        <div className="container">
          <div className="work-header">
            <h2 className="section-title-large">Our<br />Portfolio</h2>
          </div>
          <div className="work-grid">
            {workItems.map((w, i) => (
              <div key={i} className={w.className}>
                <img src={w.image} alt={`${w.category} ${w.title}`} loading="lazy" />
                <div className="work-overlay">
                  <span className="work-category">{w.category}</span>
                  <h3 className="work-title">{w.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="work-cta">
            <Link to="/portfolio" className="btn btn-outline-dark">View All Projects</Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" ref={statsRef}>
        <div className="container">
          <div className="stats-grid">
            {statsData.map((s, i) => (
              <div key={i} className="stat-item">
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

      {/* CTA Section */}
      <section className="cta-section" ref={ctaRef}>
        <div className="cta-background">
          <div className="cta-blob cta-blob-1"></div>
          <div className="cta-blob cta-blob-2"></div>
        </div>
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform<br />Your Business?</h2>
            <p className="cta-text">Let&apos;s discuss how we can help you achieve your digital goals.</p>
            <a href="#contact" className="btn btn-light" onClick={(e) => scrollToSection(e, 'contact')}>Get Started Today</a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact" ref={contactRef}>
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
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
            <div className="contact-form-wrapper">
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
