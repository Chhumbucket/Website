import { Link, useRoute } from '../lib/router'

const NAV_ITEMS = [
  { to: '/', label: 'home' },
  { to: '/wordle', label: 'wordle' },
]

export default function Navbar() {
  const path = useRoute()

  return (
    <nav className="navbar" aria-label="Primary">
      <Link to="/" className="navbar__brand">
        dylchhum:~$
      </Link>
      <ul className="navbar__links" role="list">
        {NAV_ITEMS.map((item) => {
          // Home matches only exactly; other tabs match their path prefix.
          const active =
            item.to === '/' ? path === '/' : path.startsWith(item.to)
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className="navbar__link"
                aria-current={active ? 'page' : undefined}
              >
                [ {item.label} ]
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
