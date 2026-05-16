import { useEffect, useRef } from 'react'

const DEFAULT_CHILD_SELECTORS = [
  '.service-card',
  '.work-item',
  '.stat-item',
  '.about-image',
  '.showcase-image',
  '.mission-card',
  '.team-card',
  '.award-card',
  '.tech-item',
  '.portfolio-item',
  '.info-card',
  '.location-card',
  '.process-step',
  '.timeline-item',
  '.faq-item',
  '.about-showcase-badge',
  '.about-showcase-control',
  '.intro-stat',
  '.contact-item',
  '.social-link',
].join(', ')

export default function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      reveal = 'fade-up',
      stagger = false,
      staggerDelay = 0.12,
      rootMargin = '0px 0px -10% 0px',
      threshold = 0.15,
      once = true,
    } = options

    if (!el.dataset.reveal) {
      el.dataset.reveal = reveal
    }

    el.classList.add('scroll-reveal')

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const hasStagger = stagger || el.hasAttribute('data-reveal-stagger')

    const staggerItems = []
    if (hasStagger) {
      const explicitItems = el.querySelectorAll('[data-reveal-item]')
      const targets = explicitItems.length
        ? explicitItems
        : el.querySelectorAll(DEFAULT_CHILD_SELECTORS)

      targets.forEach((item, index) => {
        item.setAttribute('data-reveal-item', '')
        if (!item.dataset.reveal) {
          item.dataset.reveal = 'fade-up'
        }
        item.style.transitionDelay = `${index * staggerDelay}s`
        staggerItems.push(item)
      })
    }

    const revealChildren = Array.from(el.querySelectorAll('[data-reveal]')).filter(
      (child) => child !== el
    )

    const parallaxItems = []
    if (!prefersReducedMotion && !isMobile) {
      if (el.dataset.reveal === 'parallax') parallaxItems.push(el)
      el.querySelectorAll('[data-reveal="parallax"]').forEach((item) => {
        if (item !== el) parallaxItems.push(item)
      })
    }

    let rafId = null
    const updateParallax = () => {
      rafId = null
      const viewHeight = window.innerHeight || 1
      parallaxItems.forEach((item) => {
        const rect = item.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const progress = (center - viewHeight / 2) / viewHeight
        const intensity = Number(item.dataset.parallaxIntensity || 18)
        const offset = Math.max(Math.min(progress * intensity, intensity), -intensity)
        item.style.setProperty('--parallax-translate', `${-offset}px`)
      })
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(updateParallax)
    }

    if (parallaxItems.length) {
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
      updateParallax()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-revealed')
          revealChildren.forEach((child) => child.classList.add('is-revealed'))
          staggerItems.forEach((item) => item.classList.add('is-revealed'))

          if (once) observer.unobserve(el)
        } else if (!once) {
          el.classList.remove('is-revealed')
          revealChildren.forEach((child) => child.classList.remove('is-revealed'))
          staggerItems.forEach((item) => item.classList.remove('is-revealed'))
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      if (parallaxItems.length) {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
        if (rafId !== null) cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return ref
}
