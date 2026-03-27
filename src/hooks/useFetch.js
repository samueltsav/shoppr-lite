import { useState, useEffect } from 'react'

/**
 * Generic data-fetching hook.
 * Handles loading, error, and success states.
 * Aborts in-flight requests when the URL changes or the component unmounts.
 */
export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
        return res.json()
      })
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch(err => {
        if (err.name === 'AbortError') return
        setError(err.message || 'Something went wrong')
        setLoading(false)
      })

    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}
