import { formatNumber } from '../utils/format'
import './ChannelBreakdown.css'

const BAR_TONES = ['leaf', 'sage', 'gold']

export default function ChannelBreakdown({ channels }) {
  const totalOrders = channels.reduce((sum, channel) => sum + channel.count, 0)

  return (
    <section className="panel channels" aria-labelledby="channels-heading">
      <div className="panel__head">
        <h2 id="channels-heading">Orders by channel</h2>
        <p className="panel__caption">
          Completed orders · {formatNumber(totalOrders)} total
        </p>
      </div>

      <ul className="channels__list">
        {channels.map((channel, index) => (
          <li className="channel-row" key={channel.channel}>
            <span className="channel-row__label">{channel.channel}</span>
            <span className="channel-row__track">
              <svg
                className={`channel-row__bar channel-row__bar--${
                  BAR_TONES[index % BAR_TONES.length]
                }`}
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
              >
                <rect width={Math.max(channel.share, 2)} height="8" />
              </svg>
            </span>
            <span className="channel-row__value">
              <span className="sr-only">{channel.share}% of completed orders: </span>
              {formatNumber(channel.count)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
