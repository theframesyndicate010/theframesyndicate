import { Link } from 'react-router-dom'

export default function PageHeader({ children, subtitle, breadcrumbLabel, short = false, author, updatedAt }) {
  return (
    <section className={`page-header${short ? ' page-header-short' : ''}`}>
      <div className="page-header-bg">
        <div className="header-shape header-shape-1"></div>
        <div className="header-shape header-shape-2"></div>
      </div>
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>{breadcrumbLabel}</span>
        </nav>
        <h1 className="page-title">{children}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
        {(author || updatedAt) && (
          <p className="page-meta">
            {author && <span>By {author}</span>}
            {author && updatedAt && <span> · </span>}
            {updatedAt && <span>Updated {updatedAt}</span>}
          </p>
        )}
      </div>
    </section>
  )
}
