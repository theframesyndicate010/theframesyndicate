import { useEffect, useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const workItems = [
  {
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
    category: 'Enterprise',
    title: 'Global Finance Platform',
    summary: 'Cloud-native core banking platform with real-time risk insights.',
    tags: ['Cloud', 'Fintech'],
  },
  {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    category: 'E-commerce',
    title: 'Retail Innovation',
    summary: 'Omnichannel commerce stack with personalization and inventory sync.',
    tags: ['E-commerce', 'Growth'],
  },
  {
    image: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800',
    category: 'Healthcare',
    title: 'MedTech Solutions',
    summary: 'Secure patient portal with telehealth scheduling and insights.',
    tags: ['Healthcare', 'UX'],
  },
  {
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    category: 'IoT',
    title: 'Smart City Network',
    summary: 'Sensor network with predictive analytics and fleet monitoring.',
    tags: ['IoT', 'Analytics'],
  },
  {
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800',
    category: 'Startup',
    title: 'Innovation Hub',
    summary: 'Product platform that scaled from MVP to nationwide launch.',
    tags: ['Startup', 'Product'],
  },
]

export default function PortfolioStack() {
  const wrapperRef = useRef(null)
  const stickyRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const wrapper = wrapperRef.current
    const sticky = stickyRef.current
    if (!wrapper || !sticky) return

    const cards = cardsRef.current.filter(Boolean)
    const totalCards = cards.length
    if (totalCards === 0) return

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const ctx = gsap.context(() => {
      // Each card after the first starts off-screen below
      cards.forEach((card, i) => {
        if (i === 0) return
        gsap.set(card, { yPercent: 100 })
      })

      // Create a timeline scrubbed by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          // No pin needed — the wrapper's height + sticky CSS handles it
        },
      })

      // For each card after the first, animate it sliding up into view
      // and scale/dim the previous card
      for (let i = 1; i < totalCards; i++) {
        const cardIn = cards[i]
        const cardOut = cards[i - 1]

        // Slide new card up from below
        tl.to(
          cardIn,
          {
            yPercent: 0,
            duration: 1,
            ease: 'power2.inOut',
          },
          i - 1 // sequence them one after another
        )

        // Scale down + darken previous card simultaneously
        tl.to(
          cardOut,
          {
            scale: 0.9,
            filter: 'brightness(0.4)',
            duration: 1,
            ease: 'power2.inOut',
          },
          i - 1 // same position as the card coming in
        )
      }
    }, wrapper)

    return () => ctx.revert()
  }, [])

  return (
    <section
      className="portfolio-stack-wrapper"
      ref={wrapperRef}
      id="work"
      style={{ height: `${workItems.length * 100}vh` }}
    >
      {/* Sticky container — stays in viewport while wrapper scrolls */}
      <div className="portfolio-stack-sticky" ref={stickyRef}>
        {/* Header */}
        <div className="portfolio-stack-header">
          <div className="container">
            <div className="portfolio-stack-header-inner">
              <div className="portfolio-stack-heading">
                <span className="section-tag">
                  <span className="tag-dot"></span> Our Portfolio
                </span>
                <h2 className="section-title-large">
                  Our<br />Portfolio
                </h2>
                <p className="portfolio-stack-subtitle">
                  A curated selection of projects built for speed, scale, and measurable impact.
                </p>
              </div>
              <div className="portfolio-stack-actions">
                <Link to="/portfolio" className="btn btn-outline-dark">
                  View All Projects
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Cards viewport */}
        <div className="portfolio-stack-viewport">
          {workItems.map((item, index) => (
            <div
              key={index}
              className="portfolio-stack-card"
              ref={(el) => (cardsRef.current[index] = el)}
              style={{ zIndex: index + 1 }}
            >
              <div className="portfolio-stack-card-inner">
                <img
                  src={item.image}
                  alt={`${item.category} – ${item.title}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                <div className="portfolio-stack-overlay">
                  <div className="portfolio-stack-meta">
                    <span className="portfolio-stack-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="portfolio-stack-category">
                      {item.category}
                    </span>
                  </div>
                  <div className="portfolio-stack-info">
                    <h3 className="portfolio-stack-title">{item.title}</h3>
                    <p className="portfolio-stack-summary">{item.summary}</p>
                    <div className="portfolio-stack-tags">
                      {item.tags.map((tag, j) => (
                        <span key={j} className="portfolio-stack-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link to="/portfolio" className="portfolio-stack-link">
                      View Case Study{' '}
                      <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
