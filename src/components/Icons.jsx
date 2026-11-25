const baseProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
}

export function IconGrid() {
  return (
    <svg {...baseProps}>
      <rect x="3" y="3" width="7" height="7" rx="1.6" />
      <rect x="14" y="3" width="7" height="7" rx="1.6" />
      <rect x="3" y="14" width="7" height="7" rx="1.6" />
      <rect x="14" y="14" width="7" height="7" rx="1.6" />
    </svg>
  )
}

export function IconReceipt() {
  return (
    <svg {...baseProps}>
      <path d="M6 3.5h12v17l-3-2-3 2-3-2-3 2Z" />
      <path d="M9.5 8.5h5M9.5 12.5h5" />
    </svg>
  )
}

export function IconUsers() {
  return (
    <svg {...baseProps}>
      <circle cx="9.5" cy="8.5" r="3.2" />
      <path d="M3.6 20c0-3.2 2.6-5.3 5.9-5.3s5.9 2.1 5.9 5.3" />
      <path d="M16.4 6.4a3 3 0 0 1 0 5.8M18 14.9c2 .6 3.4 2.3 3.4 4.6" />
    </svg>
  )
}

export function IconLeaf() {
  return (
    <svg {...baseProps}>
      <path d="M20 4c0 8.3-4.4 13-11.4 13H4c0-8.3 4.4-13 11.4-13Z" />
      <path d="M4.5 20.5c1.7-5 4.6-8 9-10" />
    </svg>
  )
}

export function IconSliders() {
  return (
    <svg {...baseProps}>
      <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
      <circle cx="15" cy="7" r="2.1" />
      <circle cx="9" cy="17" r="2.1" />
    </svg>
  )
}

export function IconMenu({ open = false }) {
  return open ? (
    <svg {...baseProps} width={20} height={20}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ) : (
    <svg {...baseProps} width={20} height={20}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}
