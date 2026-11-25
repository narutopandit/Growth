import { useMemo, useState } from 'react'
import { formatINR, formatNumber } from '../utils/format'
import './TransactionTable.css'

const PAGE_SIZE = 10
const STATUS_OPTIONS = ['All', 'Completed', 'Pending', 'Refunded', 'Cancelled']
const CHANNEL_OPTIONS = ['All', 'Website', 'Mobile App', 'Marketplace']

const byNewestFirst = (a, b) => {
  if (a.date === b.date) return a.id.localeCompare(b.id)
  return a.date < b.date ? 1 : -1
}

export default function TransactionTable({
  transactions,
  status = 'All',
  channel = 'All',
  onStatusChange,
  onChannelChange,
  onResetFilters,
}) {
  const [page, setPage] = useState(1)

  const sorted = useMemo(() => [...transactions].sort(byNewestFirst), [transactions])

  const filtered = useMemo(
    () =>
      sorted.filter(
        (transaction) =>
          (status === 'All' || transaction.status === status) &&
          (channel === 'All' || transaction.channel === channel),
      ),
    [sorted, status, channel],
  )

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const visibleRows = filtered.slice(startIndex, startIndex + PAGE_SIZE)
  const endIndex = startIndex + visibleRows.length
  const filtersActive = status !== 'All' || channel !== 'All'

  const updateStatus = (value) => {
    onStatusChange?.(value)
    setPage(1)
  }

  const updateChannel = (value) => {
    onChannelChange?.(value)
    setPage(1)
  }

  const resetFilters = () => {
    onResetFilters?.()
    setPage(1)
  }

  return (
    <section className="table-panel" aria-labelledby="transactions-heading">
      <div className="table-panel__head">
        <h2 id="transactions-heading">Recent transactions</h2>

        <div className="filters">
          <label className="filter">
            <span className="filter__label">Status</span>
            <select value={status} onChange={(event) => updateStatus(event.target.value)}>
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option === 'All' ? 'All statuses' : option}
                </option>
              ))}
            </select>
          </label>

          <label className="filter">
            <span className="filter__label">Channel</span>
            <select value={channel} onChange={(event) => updateChannel(event.target.value)}>
              {CHANNEL_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option === 'All' ? 'All channels' : option}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className="filters__reset"
            onClick={resetFilters}
            disabled={!filtersActive}
          >
            Reset filters
          </button>
        </div>
      </div>

      <div
        className="table-scroll"
        role="region"
        aria-label="Transactions table, scroll horizontally if needed"
        tabIndex={0}
      >
        <table className="transactions">
          <caption className="sr-only">
            Transactions sorted newest first, page {currentPage} of {pageCount}
          </caption>
          <thead>
            <tr>
              <th scope="col">Transaction ID</th>
              <th scope="col">Date</th>
              <th scope="col">Product</th>
              <th scope="col" className="num">
                Amount (INR)
              </th>
              <th scope="col">Channel</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.length === 0 ? (
              <tr>
                <td colSpan={6} className="transactions__empty">
                  No transactions match these filters.{' '}
                  <button type="button" className="link-button" onClick={resetFilters}>
                    Clear filters
                  </button>
                </td>
              </tr>
            ) : (
              visibleRows.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="transactions__id">{transaction.id}</td>
                  <td className="transactions__date">{transaction.date}</td>
                  <td>
                    {transaction.product}
                    {transaction.quantity > 1 ? (
                      <span className="transactions__quantity"> × {transaction.quantity}</span>
                    ) : null}
                  </td>
                  <td className="num">{formatINR(transaction.amountINR)}</td>
                  <td>{transaction.channel}</td>
                  <td>
                    <span className={`status status--${transaction.status.toLowerCase()}`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-panel__foot">
        <p className="table-panel__count" aria-live="polite">
          {filtered.length === 0
            ? 'No matching transactions'
            : `Showing ${formatNumber(startIndex + 1)}–${formatNumber(endIndex)} of ${formatNumber(filtered.length)}`}
        </p>

        <div className="pagination">
          <button
            type="button"
            className="pagination__button"
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            Previous
          </button>
          <span className="pagination__status">
            Page {currentPage} of {pageCount}
          </span>
          <button
            type="button"
            className="pagination__button"
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage >= pageCount}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}
