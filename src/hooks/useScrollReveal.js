import { useEffect, useRef } from 'react'

export default function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.opacity = '0'
    el.style.transform = 'translateY(30px)'
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease'

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'

          const children = el.querySelectorAll(
            '.service-card, .work-item, .stat-item, .about-image, .showcase-image, ' +
            '.mission-card, .team-card, .award-card, .tech-item, .portfolio-item, ' +
            '.info-card, .location-card, .process-step'
          )
          children.forEach((child, i) => {
            child.style.opacity = '0'
            child.style.transform = 'translateY(30px)'
            child.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`
            setTimeout(() => {
              child.style.opacity = '1'
              child.style.transform = 'translateY(0)'
            }, 100)
          })

          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px', ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
