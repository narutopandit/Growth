import { useState } from 'react'
import { IconGrid, IconLeaf, IconMenu, IconReceipt, IconSliders, IconUsers } from './Icons'
import './Sidebar.css'

const NAV_ITEMS = [
  { label: 'Overview', href: '#overview', Icon: IconGrid, available: true },
  { label: 'Transactions', href: '#transactions', Icon: IconReceipt, available: true },
  { label: 'Customers', href: null, Icon: IconUsers, available: false },
  { label: 'Products', href: null, Icon: IconLeaf, available: false },
  { label: 'Settings', href: null, Icon: IconSliders, available: false },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  const closeNavigation = () => setOpen(false)

  return (
    <aside className="sidebar" data-open={open}>
      <div className="sidebar__brand">
        <a className="logo" href="#overview" aria-label="Growth Wellness Store — overview">
          <svg className="logo__mark" viewBox="0 0 84 66" aria-hidden="true" focusable="false">
            <path className="logo__leaf logo__leaf--light" d="M30 60 C-3 43 9 15 30 11 C30 29 36 42 30 60Z" />
            <path className="logo__leaf logo__leaf--tint" d="M30 60 C23 29 38 5 62 8 C56 35 49 48 30 60Z" />
            <path className="logo__leaf logo__leaf--gold" d="M30 60 C39 34 53 23 70 28 C65 43 53 55 30 60Z" />
          </svg>
          <span className="logo__text">
            <span className="logo__word">growth.</span>
            <span className="logo__tag">Wellness Store</span>
          </span>
        </a>

        <button
          type="button"
          className="sidebar__toggle"
          aria-expanded={open}
          aria-controls="sidebar-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <IconMenu open={open} />
          <span className="sr-only">{open ? 'Hide navigation' : 'Show navigation'}</span>
        </button>
      </div>

      <nav className="sidebar__nav" id="sidebar-nav" aria-label="Primary">
        <ul>
          {NAV_ITEMS.map(({ label, href, Icon, available }) => (
            <li key={label}>
              {available ? (
                <a
                  className="sidebar__link"
                  href={href}
                  aria-current={label === 'Overview' ? 'page' : undefined}
                  onClick={closeNavigation}
                >
                  <Icon />
                  <span>{label}</span>
                </a>
              ) : (
                <span className="sidebar__link sidebar__link--muted" aria-disabled="true">
                  <Icon />
                  <span>{label}</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <p className="sidebar__footer">Internal Operations</p>
    </aside>
  )
}
