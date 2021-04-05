import {useEffect, useState} from 'react'

export function useHash() {
  const [hash, setHash] = useState()

  useEffect(() => {
    setHash(window.location.hash)
  }, [])

  useEffect(() => {
    const change = () => setHash(window.location.hash)

    window.addEventListener('hashchange', change)

    return () => window.removeEventListener('hashchange', change)
  }, [])

  const setHashForce = id => window.history.pushState(null, null, id)

  return {hash, setHashForce}
}
