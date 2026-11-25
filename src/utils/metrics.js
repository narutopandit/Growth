const DAY_MS = 24 * 60 * 60 * 1000
const WEEK_MS = 7 * DAY_MS

export function summarize(transactions) {
  const completed = transactions.filter((transaction) => transaction.status === 'Completed')

  return {
    grossRevenue: completed.reduce((sum, transaction) => sum + transaction.amountINR, 0),
    completedOrders: completed.length,
    unitsSold: completed.reduce((sum, transaction) => sum + transaction.quantity, 0),
    pendingOrders: transactions.filter((transaction) => transaction.status === 'Pending').length,
  }
}

export function weeklyRevenue(completedTransactions) {
  if (completedTransactions.length === 0) return []

  const times = completedTransactions.map((transaction) => Date.parse(transaction.date))
  const start = Math.min(...times)
  const end = Math.max(...times)
  const bucketCount = Math.floor((end - start) / WEEK_MS) + 1

  const buckets = Array.from({ length: bucketCount }, (_, index) => ({
    start: start + index * WEEK_MS,
    total: 0,
  }))

  for (const transaction of completedTransactions) {
    const offset = Math.min(
      bucketCount - 1,
      Math.floor((Date.parse(transaction.date) - start) / WEEK_MS),
    )
    buckets[offset].total += transaction.amountINR
  }

  return buckets
}

export function channelMix(completedTransactions) {
  const counts = new Map()

  for (const transaction of completedTransactions) {
    counts.set(transaction.channel, (counts.get(transaction.channel) ?? 0) + 1)
  }

  const total = completedTransactions.length || 1

  return [...counts.entries()]
    .map(([channel, count]) => ({
      channel,
      count,
      share: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count)
}
