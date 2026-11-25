import './Header.css'

export default function Header({ title, subtitle, rangeLabel }) {
  return (
    <header className="page-header">
      <div className="page-header__text">
        <h1 className="page-header__title">{title}</h1>
        {subtitle ? <p className="page-header__subtitle">{subtitle}</p> : null}
      </div>
      {rangeLabel ? (
        <p className="page-header__range">
          <span className="page-header__range-label">Reporting period</span>
          <span>{rangeLabel}</span>
        </p>
      ) : null}
    </header>
  )
}
