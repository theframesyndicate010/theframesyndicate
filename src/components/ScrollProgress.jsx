import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    let lastTime = 0
    const handleScroll = () => {
      const now = Date.now()
      if (now - lastTime < 16) return
      lastTime = now
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      if (scrollHeight > 0 && barRef.current) {
        barRef.current.style.width = (scrollTop / scrollHeight) * 100 + '%'
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={barRef}
      className="scroll-progress"
      role="progressbar"
      aria-label="Reading progress"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #ff2d75, #ff6b35)',
        zIndex: 9999,
        transition: 'width 0.1s linear',
        willChange: 'width',
      }}
    />
  )
}
