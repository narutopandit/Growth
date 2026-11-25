# Growth Wellness Store — Sales overview

Internal one-page dashboard for the Growth Wellness Store, built with React and Vite. It shows
four derived KPIs, a weekly revenue trend, channel mix and a filterable transaction table.

All figures come from a local synthetic dataset (`src/data/transactions.json`). No records are
real customer data and nothing here reflects live company performance.

## Setup

```bash
npm install
npm run dev      # local dev server (Vite)
npm run build    # production build into dist/
npm run preview  # serve the production build
```

Requires Node 20+.

## Components

| Component | Responsibility |
| --- | --- |
| `App` | Composes the shell (`Sidebar` + page), derives KPI, trend and channel values from the imported dataset, and holds the status/channel filter state. |
| `Sidebar` | Brand lockup and primary navigation (Overview, Transactions, Customers, Products, Settings). Collapses into a top bar with a disclosure button below 1100px. |
| `Header` | Page title, caption and reporting period. |
| `StatCard` | Reusable KPI card: `label`, formatted `value`, optional `indicator`. |
| `RevenueTrend` | SVG weekly completed-revenue line, scaled to the peak week. |
| `ChannelBreakdown` | Completed orders per channel with a proportional bar. |
| `TransactionTable` | Receives the transaction array plus the active status/channel filters and change handlers via props, sorts newest first and paginates 10 rows per page. Contains no hardcoded rows. |

## Styling conventions

- One CSS file per component, imported by that component; no inline `style` props anywhere in
  `src/`.
- Every colour, shadow, radius and spacing value comes from the tokens in `src/index.css`. The
  brand palette from the design spec lives there (`--forest`, `--leaf`, `--sage`, `--canvas`,
  `--white`, `--divider`, `--highlight`) alongside derived text, surface, status and on-forest
  tokens, so no component hardcodes a hex value.
- Padding and margin use the 4px spacing scale `--space-1` (4px) through `--space-9` (56px), and
  radii use `--radius-xs/sm/tile/card/panel/pill`. Cards and controls therefore share the same
  rhythm at every breakpoint.
- Component files and components are PascalCase (`StatCard.jsx`, `TransactionTable.jsx`);
  helper modules stay camelCase (`utils/format.js`, `utils/metrics.js`).
- SVG colours are set through classes (`.logo__leaf--gold`, `.channel-row__bar--leaf`), not
  through JS colour arrays or `fill` attributes.

## Data structure

`src/data/transactions.json` is an array of 81 synthetic transactions:

```json
{
  "id": "TXN-0002",
  "date": "2026-08-03",
  "product": "Botanical Face Oil",
  "quantity": 1,
  "amountINR": 2697,
  "channel": "Website",
  "status": "Completed"
}
```

- `status` — `Completed`, `Pending`, `Refunded` or `Cancelled`
- `channel` — `Website`, `Mobile App` or `Marketplace`
- `amountINR` — line-item total in Indian rupees

Derived values (`src/utils/metrics.js`):

- **Gross revenue** — sum of `amountINR` for `Completed` only
- **Completed orders** — count of `Completed`
- **Units sold** — sum of `quantity` for `Completed` only
- **Pending orders** — count of `Pending`

With the supplied dataset these evaluate to ₹66,065, 53, 85 and 19; the status breakdown is
53 Completed, 19 Pending, 5 Refunded and 4 Cancelled.

## Testing notes

Verified in Chromium (Vite dev server) by measuring the rendered page:

- `npm install`, `npm run dev` and `npm run build` all exit 0; the build emits 46 modules.
- KPIs read ₹66,065 / 53 / 85 / 19, computed from `transactions.json` and cross-checked with a
  Node script (81 rows: 53 Completed, 19 Pending, 5 Refunded, 4 Cancelled).
- At 1440px the 248px sticky sidebar, four KPI cards in one row and the 10-row table are
  visible; `document.documentElement.scrollWidth` equals the client width (no page overflow).
- At 1024px and 768px the layout uses the compact top bar with a disclosure menu, two KPI
  columns, and the table sits in its own horizontally scrollable region (715px of table inside
  a 654–910px container).
- At 390px and 320px the cards stack to one column; page width still equals the viewport and
  only the table region overflows, so the page itself never scrolls sideways.
- Status filter counts match the data: All 81, Completed 53, Pending 19, Refunded 5,
  Cancelled 4. Combined filters return Completed + Marketplace 9 and Pending + Website 6.
  `Reset filters` returns both selects to All and the count to 81.
- Keyboard: focusing the Status select and pressing ArrowDown switched it to Completed and the
  table updated to 53 rows.
- Measured contrast ratios all clear 4.5:1 (body 14.2, KPI labels 5.3, table headers 5.9,
  status pills 4.9–6.4). The sidebar footer label was lifted from 0.5 to 0.62 alpha to pass.
- Landmarks (`main`, `nav[aria-label="Primary"]`, `aside`, `header`, sections labelled by their
  headings) and the heading order H1 → H2 are present; the table scroll region is a labelled,
  focusable `role="region"`.
- No console errors, unhandled exceptions, failed requests or missing assets; the favicon at
  `/brand/growth_logo.svg` returns 200.

Not verified:

- Firefox and Safari. Only the Chromium engine available in this environment was exercised.
- Assistive-technology output. Keyboard operation and semantics were checked, but no screen
  reader (NVDA, VoiceOver) session was run.
- Pagination was exercised only through the first page and a filter change, not page-by-page.

Nothing is deployed; publish to Vercel/Netlify only when authorised to do so.
