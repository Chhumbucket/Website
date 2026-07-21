import { useSyncExternalStore } from 'react'

// Minimal client-side router over the History API — no dependency. Components
// read the current path with useRoute(); <Link> and navigate() push new paths
// and notify subscribers so the tree re-renders. Deep links / refreshes work
// because the dev server and GitHub Pages both fall back to index.html
// (see the 404.html copy in the build script).

const listeners = new Set()

const subscribe = (callback) => {
  listeners.add(callback)
  window.addEventListener('popstate', callback)
  return () => {
    listeners.delete(callback)
    window.removeEventListener('popstate', callback)
  }
}

const getPath = () => window.location.pathname

export function navigate(to) {
  if (to === getPath()) return
  window.history.pushState(null, '', to)
  window.scrollTo(0, 0)
  listeners.forEach((callback) => callback())
}

export function useRoute() {
  return useSyncExternalStore(subscribe, getPath)
}

export function Link({ to, children, ...rest }) {
  const handleClick = (event) => {
    // Let the browser handle new-tab / modified clicks natively.
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }
    event.preventDefault()
    navigate(to)
  }
  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
