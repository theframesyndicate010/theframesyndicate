import { useState, useEffect, useRef, useCallback } from 'react'

const testimonials = [
  {
    text: '"Frame Syndicate transformed our entire digital infrastructure. Their team\'s expertise and dedication to our project exceeded all expectations. Highly recommended!"',
    name: 'Digivents',
    role: 'Client',
    link: 'https://digivents.com.np/', 
  },
]

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef(null)

  const startAutoPlay = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length)
    }, 5000)
  }, [])

  const resetAutoPlay = useCallback(() => {
    clearInterval(intervalRef.current)
    startAutoPlay()
  }, [startAutoPlay])

  useEffect(() => {
    startAutoPlay()
    return () => clearInterval(intervalRef.current)
  }, [startAutoPlay])

  const goTo = (index) => {
    let next = index
    if (next < 0) next = testimonials.length - 1
    if (next >= testimonials.length) next = 0
    setCurrent(next)
    resetAutoPlay()
  }

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div className="section-header center">
          <span className="section-tag">
            <span className="tag-dot"></span> What Clients Say
          </span>
          <h2 className="section-title-large">Client Testimonials</h2>
        </div>

        <div
          className="testimonials-slider"
          onMouseEnter={() => clearInterval(intervalRef.current)}
          onMouseLeave={startAutoPlay}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`testimonial-card${i === current ? ' active' : ''}`}
            >
              <div className="testimonial-content">
                <div className="quote-icon">
                  <i className="fas fa-quote-left"></i>
                </div>

                <p className="testimonial-text">{t.text}</p>

                <div className="testimonial-author">
                  <img src={t.image} alt={t.name} loading="lazy" />

                  <div className="author-info">
                    {/* Clickable Name */}
                    <h4>
                      <a
                        href={t.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="author-link"
                      >
                        {t.name}
                      </a>
                    </h4>

                    <span>{t.role}</span>

                    {/* Optional Button Link */}
                    {t.link && (
                      <a
                        href={t.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="visit-btn"
                      >
                        Visit Website →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonial-nav">
          <button className="nav-btn prev" onClick={() => goTo(current - 1)}>
            <i className="fas fa-arrow-left"></i>
          </button>

          <div className="testimonial-dots">
            {testimonials.map((_, i) => (
              <span
                key={i}
                className={`dot${i === current ? ' active' : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <button className="nav-btn next" onClick={() => goTo(current + 1)}>
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </section>
  )
}