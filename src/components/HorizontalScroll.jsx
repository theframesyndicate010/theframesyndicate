import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * HorizontalScroll — wraps children in a sticky/pinned container that
 * translates horizontally as the user scrolls vertically.
 *
 * Props:
 *  - children: React nodes (the cards/panels to scroll)
 *  - sectionTag: small uppercase label above the heading
 *  - sectionTitle: the heading JSX/string
 *  - speed: multiplier for scroll length (default 1)
 */
export default function HorizontalScroll({
  children,
  sectionTag = 'What We Do Best',
  sectionTitle,
  speed = 1,
}) {
  const sectionRef = useRef(null)
  const triggerRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    // Skip on mobile — CSS handles vertical fallback
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    // Small delay so DOM is painted and widths are accurate
    const timer = setTimeout(() => {
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth
        const viewportWidth = window.innerWidth
        return -(trackWidth - viewportWidth)
      }

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: () => `+=${Math.abs(getScrollAmount()) * speed}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      // Store for cleanup
      track._hzTween = tween
    }, 100)

    return () => {
      clearTimeout(timer)
      if (track._hzTween) {
        track._hzTween.scrollTrigger?.kill()
        track._hzTween.kill()
      }
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === triggerRef.current) t.kill()
      })
    }
  }, [speed])

  return (
    <section className="hz-scroll-section" ref={sectionRef} id="services">
      <div className="hz-scroll-trigger" ref={triggerRef}>
        {/* Floating header */}
        <div className="hz-scroll-header">
          <div className="container">
            <span className="section-tag">
              <span className="tag-dot"></span> {sectionTag}
            </span>
            {sectionTitle || (
              <h2 className="section-title-large">
                Creating digital products &amp;<br />experiences
              </h2>
            )}
          </div>
        </div>

        {/* Horizontal track */}
        <div className="hz-scroll-track" ref={trackRef}>
          {children}
        </div>

        {/* Scroll indicator */}
        <div className="hz-scroll-indicator">
          <div className="hz-scroll-indicator-line">
            <div className="hz-scroll-indicator-progress"></div>
          </div>
          <span className="hz-scroll-indicator-text">Scroll to explore</span>
        </div>
      </div>
    </section>
  )
}
