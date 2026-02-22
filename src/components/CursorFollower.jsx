import { useEffect, useRef } from 'react'

export default function CursorFollower() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return
    if (window.matchMedia('(max-width: 768px)').matches || window.matchMedia('(pointer: coarse)').matches) {
      cursor.style.display = 'none'
      return
    }

    let mouseX = 0, mouseY = 0
    let cursorX = 0, cursorY = 0
    let rafId = null

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.12
      cursorY += (mouseY - cursorY) * 0.12
      cursor.style.left = cursorX + 'px'
      cursor.style.top = cursorY + 'px'
      rafId = requestAnimationFrame(animate)
    }

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .work-item, .service-card, .portfolio-item')) {
        cursor.style.transform = 'translate(-50%, -50%) scale(2.5)'
        cursor.style.mixBlendMode = 'normal'
        cursor.style.background = 'rgba(255, 45, 117, 0.25)'
      }
    }

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, .work-item, .service-card, .portfolio-item')) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)'
        cursor.style.mixBlendMode = 'difference'
        cursor.style.background = 'var(--primary-color)'
      }
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })
    rafId = requestAnimationFrame(animate)

    const handleVisibility = () => {
      if (document.hidden && rafId) cancelAnimationFrame(rafId)
      else rafId = requestAnimationFrame(animate)
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('visibilitychange', handleVisibility)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return <div className="cursor-follower" ref={cursorRef} aria-hidden="true" />
}
