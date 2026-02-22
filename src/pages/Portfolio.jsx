import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import TestimonialSlider from '../components/TestimonialSlider'
import useScrollReveal from '../hooks/useScrollReveal'

const portfolioItems = [
  { category: 'cloud', catLabel: 'Cloud Solutions', title: 'Global Finance Platform', brief: 'Enterprise cloud migration for a Fortune 500 financial services company.', image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600' },
  { category: 'software', catLabel: 'Software Development', title: 'E-commerce Revolution', brief: 'Custom e-commerce platform handling 1M+ daily transactions.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600' },
  { category: 'ai', catLabel: 'AI & Machine Learning', title: 'AI Healthcare Assistant', brief: 'Intelligent diagnostic assistant improving patient outcomes by 40%.', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600' },
  { category: 'security', catLabel: 'Cybersecurity', title: 'SecureBank Implementation', brief: 'Complete security overhaul for a major banking institution.', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600' },
  { category: 'software', catLabel: 'Software Development', title: 'Startup Acceleration', brief: 'MVP development that helped secure $50M Series B funding.', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600' },
  { category: 'cloud', catLabel: 'Cloud Solutions', title: 'IoT Smart City', brief: 'Cloud infrastructure for smart city sensors and analytics.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600' },
  { category: 'ai', catLabel: 'AI & Machine Learning', title: 'Predictive Maintenance', brief: 'ML-powered system reducing equipment downtime by 60%.', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600' },
  { category: 'software', catLabel: 'Software Development', title: 'Supply Chain Platform', brief: 'End-to-end logistics management for global operations.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600' },
  { category: 'security', catLabel: 'Cybersecurity', title: 'Zero Trust Architecture', brief: 'Enterprise-wide security transformation for a tech giant.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600' },
]

const filters = [
  { value: 'all', label: 'All Projects' },
  { value: 'cloud', label: 'Cloud' },
  { value: 'software', label: 'Software' },
  { value: 'ai', label: 'AI & ML' },
  { value: 'security', label: 'Security' },
]

const statsData = [
  { target: 98, suffix: '%', label: 'Client Satisfaction' },
  { target: 150, suffix: '', label: 'Projects Completed' },
  { target: 2, suffix: '+', label: 'Countries Served' },
]

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all')
  const gridRef = useScrollReveal()
  const ctaRef = useScrollReveal()

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

  const filtered = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(p => p.category === activeFilter)

  return (
    <>
      <PageHeader breadcrumbLabel="Portfolio" subtitle="Explore our portfolio of successful projects and digital transformations.">
        Our <span className="highlight">Work</span>
      </PageHeader>

      {/* Filter */}
      <section className="portfolio-filter-section">
        <div className="container">
          <div className="filter-tabs">
            {filters.map(f => (
              <button
                key={f.value}
                className={`filter-btn${activeFilter === f.value ? ' active' : ''}`}
                onClick={() => setActiveFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="portfolio-section" ref={gridRef}>
        <div className="container">
          <div className="portfolio-grid">
            {filtered.map((p, i) => (
              <div key={i} className="portfolio-item" data-category={p.category}>
                <div className="portfolio-image">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  <div className="portfolio-overlay">
                    <span className="portfolio-category">{p.catLabel}</span>
                    <h3 className="portfolio-title">{p.title}</h3>
                    <p className="portfolio-brief">{p.brief}</p>
                    <a href="#" className="portfolio-link">View Case Study <i className="fas fa-arrow-right"></i></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="stats-section portfolio-stats" ref={statsRef}>
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

      {/* CTA */}
      <section className="cta-section" ref={ctaRef}>
        <div className="cta-background">
          <div className="cta-blob cta-blob-1"></div>
          <div className="cta-blob cta-blob-2"></div>
        </div>
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Have a Project<br />In Mind?</h2>
            <p className="cta-text">Let&apos;s create something amazing together.</p>
            <Link to="/contact" className="btn btn-light">Start Your Project</Link>
          </div>
        </div>
      </section>
    </>
  )
}
