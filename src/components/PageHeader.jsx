import { Link } from 'react-router-dom'

export default function PageHeader({ children, subtitle, breadcrumbLabel, short = false }) {
  return (
    <section className={`page-header${short ? ' page-header-short' : ''}`}>
      <div className="page-header-bg">
        <div className="header-shape header-shape-1"></div>
        <div className="header-shape header-shape-2"></div>
      </div>
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{breadcrumbLabel}</span>
        </div>
        <h1 className="page-title">{children}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
    </section>
  )
}
