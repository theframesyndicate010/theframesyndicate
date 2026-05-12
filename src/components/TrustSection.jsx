import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay },
  },
})

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }
const cardItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const highlights = [
  {
    icon: 'fas fa-shield-alt',
    title: 'Trusted & Secure',
    desc: 'Enterprise-grade security you can rely on.',
    color: '#4f46e5',
    bg: 'rgba(79,70,229,0.12)',
  },
  {
    icon: 'fas fa-sliders-h',
    title: 'Custom Solutions',
    desc: 'Tailored IT solutions built around your business needs.',
    color: '#0ea5e9',
    bg: 'rgba(14,165,233,0.12)',
  },
  {
    icon: 'fas fa-headset',
    title: '24/7 Expert Support',
    desc: 'Our experts are always here to keep you moving.',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.12)',
  },
]

const statCards = [
  {
    variant: 'light',
    icon: 'fas fa-users',
    value: '150+',
    label: 'Happy Clients',
    desc: 'Businesses across Nepal trust our solutions.',
  },
  {
    variant: 'dark',
    icon: 'fas fa-chart-line',
    value: '99.9%',
    label: 'Uptime',
    desc: 'Unmatched reliability for your critical systems.',
  },
]

const quote = {
  text: 'Their expertise and support have been instrumental in our digital transformation.',
  author: 'CEO, FinX Solutions',
  avatar: 'https://i.pravatar.cc/64?img=32',
}

export default function TrustSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="ts-section" ref={ref}>
      <div className="container">
        <div className="ts-layout">
          <motion.div className="ts-content" variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <motion.span className="ts-eyebrow" variants={fadeUp(0)}>
              TECHNOLOGY THAT MOVES YOU FORWARD
            </motion.span>
            <motion.h2 className="ts-title" variants={fadeUp(0.08)}>
              Built for Performance.<br />
              Designed for Growth.
            </motion.h2>
            <motion.p className="ts-description" variants={fadeUp(0.16)}>
              We partner with businesses to deliver secure, scalable and reliable IT solutions that drive real results.
            </motion.p>

            <motion.div className="ts-points" variants={stagger}>
              {highlights.map((item, i) => (
                <motion.div key={i} className="ts-point" variants={cardItem}>
                  <div className="ts-point-icon" style={{ background: item.bg, color: item.color }}>
                    <i className={item.icon} aria-hidden="true" />
                  </div>
                  <div className="ts-point-body">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                  <span className="ts-point-arrow" aria-hidden="true">
                    <i className="fas fa-arrow-right" />
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp(0.28)}>
              <Link to="/contact" className="ts-cta">
                Let&apos;s Build Something Great <i className="fas fa-arrow-right" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div className="ts-visual" variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <div className="ts-visual-grid">
              <motion.div className="ts-card ts-card-video" variants={cardItem}>
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900"
                  alt="Team working together"
                  loading="lazy"
                />
                <button type="button" className="ts-video-play" aria-label="Play overview video">
                  <i className="fas fa-play" />
                </button>
                <span className="ts-video-caption">See how we work</span>
              </motion.div>

              {statCards.map((card, i) => (
                <motion.div
                  key={i}
                  className={`ts-card ts-card-stat ts-card-${card.variant}`}
                  variants={cardItem}
                >
                  <div className="ts-stat-icon">
                    <i className={card.icon} aria-hidden="true" />
                  </div>
                  <div className="ts-stat-body">
                    <span className="ts-stat-value">{card.value}</span>
                    <span className="ts-stat-label">{card.label}</span>
                    <p className="ts-stat-desc">{card.desc}</p>
                  </div>
                </motion.div>
              ))}

              <motion.div className="ts-card ts-card-quote" variants={cardItem}>
                <div className="ts-quote-icon" aria-hidden="true">
                  <i className="fas fa-quote-left" />
                </div>
                <p className="ts-quote-text">{quote.text}</p>
                <div className="ts-quote-author">
                  <img src={quote.avatar} alt="FinX Solutions representative" loading="lazy" />
                  <span>{quote.author}</span>
                </div>
              </motion.div>

              <motion.div className="ts-card ts-card-image" variants={cardItem}>
                <img
                  src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=900"
                  alt="Modern workspace"
                  loading="lazy"
                />
                <span className="ts-badge">Built in Nepal.<br />Serving Globally.</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
