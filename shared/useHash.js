import {useEffect, useState} from 'react'

export function useHash() {
  const [state, setState] = useState(null)

  useEffect(() => {
    setState(window.location.hash)
  }, [])

  useEffect(() => {
    const change = () => {
      setState(window.location.hash)
    }

    window.addEventListener('hashchange', change)

    return () => window.removeEventListener('hashchange', change)
  }, [])

  const setHash = id => {
    window.history.pushState(null, null, id)
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  }

  return [state, setHash]
}
