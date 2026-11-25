import { formatINR } from '../utils/format'
import './RevenueTrend.css'

const WIDTH = 640
const HEIGHT = 210
const PADDING_X = 10
const PADDING_Y = 18

export default function RevenueTrend({ weekly }) {
  const totals = weekly.map((bucket) => bucket.total)
  const peak = totals.length ? Math.max(...totals) : 0
  const total = totals.reduce((sum, value) => sum + value, 0)
  const max = Math.max(peak, 1)

  const step = weekly.length > 1 ? (WIDTH - PADDING_X * 2) / (weekly.length - 1) : 0
  const points = weekly.map((bucket, index) => ({
    x: PADDING_X + index * step,
    y: HEIGHT - PADDING_Y - (bucket.total / max) * (HEIGHT - PADDING_Y * 2),
  }))

  const polyline = points.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(' ')
  const gridLines = [0, 0.33, 0.66, 1].map(
    (fraction) => HEIGHT - PADDING_Y - fraction * (HEIGHT - PADDING_Y * 2),
  )

  return (
    <section className="panel trend" aria-labelledby="trend-heading">
      <div className="panel__head">
        <h2 id="trend-heading">Revenue trend</h2>
        <p className="panel__caption">Completed orders · weekly</p>
      </div>

      <p className="sr-only">
        {weekly.length} weeks of completed revenue totalling {formatINR(total)}, peaking at{' '}
        {formatINR(peak)} in a single week.
      </p>

      <svg
        className="trend__chart"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        aria-hidden="true"
        focusable="false"
      >
        <g className="trend__grid">
          {gridLines.map((y) => (
            <line key={y} x1={0} y1={y} x2={WIDTH} y2={y} />
          ))}
        </g>
        {points.length > 1 ? <polyline className="trend__line" points={polyline} /> : null}
        {points.map((point) => (
          <circle
            key={point.x}
            className="trend__dot"
            cx={point.x}
            cy={point.y}
            r="4"
          />
        ))}
      </svg>
    </section>
  )
}
