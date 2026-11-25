import { useMemo, useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import StatCard from './components/StatCard'
import RevenueTrend from './components/RevenueTrend'
import ChannelBreakdown from './components/ChannelBreakdown'
import TransactionTable from './components/TransactionTable'
import transactions from './data/transactions.json'
import { channelMix, summarize, weeklyRevenue } from './utils/metrics'
import { formatINR, formatNumber } from './utils/format'
import './App.css'

const DATE_RANGE_LABEL = '01 Aug — 12 Nov 2026'

export default function App() {
  const [statusFilter, setStatusFilter] = useState('All')
  const [channelFilter, setChannelFilter] = useState('All')

  const stats = useMemo(() => summarize(transactions), [])

  const completed = useMemo(
    () => transactions.filter((transaction) => transaction.status === 'Completed'),
    [],
  )
  const weekly = useMemo(() => weeklyRevenue(completed), [completed])
  const channels = useMemo(() => channelMix(completed), [completed])

  const resetFilters = () => {
    setStatusFilter('All')
    setChannelFilter('All')
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#overview">
        Skip to content
      </a>

      <Sidebar />

      <div className="app-main">
        <main className="page" id="overview">
          <Header
            title="Sales overview"
            subtitle="Monitor orders and customer demand across your wellness store"
            rangeLabel={DATE_RANGE_LABEL}
          />

          <section className="kpi-section" aria-labelledby="kpi-heading">
            <h2 className="sr-only" id="kpi-heading">
              Key performance indicators
            </h2>
            <div className="kpi-grid">
              <StatCard
                label="Gross revenue"
                value={formatINR(stats.grossRevenue)}
                indicator="Completed sales"
              />
              <StatCard
                label="Completed orders"
                value={formatNumber(stats.completedOrders)}
                indicator="Paid transactions"
              />
              <StatCard
                label="Units sold"
                value={formatNumber(stats.unitsSold)}
                indicator="From completed orders"
              />
              <StatCard
                label="Pending orders"
                value={formatNumber(stats.pendingOrders)}
                indicator="Requires review"
              />
            </div>
          </section>

          <div className="insights">
            <RevenueTrend weekly={weekly} />
            <ChannelBreakdown channels={channels} />
          </div>

          <div id="transactions">
            <TransactionTable
              transactions={transactions}
              status={statusFilter}
              channel={channelFilter}
              onStatusChange={setStatusFilter}
              onChannelChange={setChannelFilter}
              onResetFilters={resetFilters}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
