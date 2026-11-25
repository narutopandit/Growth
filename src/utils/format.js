const indianNumber = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })

export function formatNumber(value) {
  return indianNumber.format(value)
}

export function formatINR(value) {
  return `₹${indianNumber.format(value)}`
}
