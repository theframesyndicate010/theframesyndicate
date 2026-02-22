import { Link } from 'react-router-dom'

export default function FloatingCTA() {
  return (
    <Link to="/contact" className="floating-cta">
      <span>Speak To Us</span>
    </Link>
  )
}
