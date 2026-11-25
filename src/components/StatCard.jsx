import './StatCard.css'

export default function StatCard({ label, value, indicator }) {
  return (
    <article className="stat-card">
      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value">{value}</p>
      {indicator ? <p className="stat-card__indicator">{indicator}</p> : null}
    </article>
  )
}
