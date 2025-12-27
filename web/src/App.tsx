import { useEffect, useState } from 'react'

type ApiResponse = {
  message: string
}

function resolveApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_BASE_URL?.trim()
  if (envUrl && /^https?:\/\/[^/]+/i.test(envUrl)) {
    return envUrl.replace(/\/+$/, '')
  }

  if (typeof window !== 'undefined') {
    const host =
      window.location.hostname ||
      (window.location.host ? window.location.host.split(':')[0] : '') ||
      'localhost'
    const protocol = window.location.protocol || 'http:'
    return `${protocol}//${host}:4000`
  }

  return 'http://localhost:4000'
}

const apiBaseUrl = resolveApiBaseUrl()

export default function App() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${apiBaseUrl}/api/message`, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`)
        }
        const body = (await res.json()) as ApiResponse
        setData(body)
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return
        }
        setError(err.message)
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  return (
    <main className="page">
      <section className="card">
        <p className="eyebrow">Example Full-Stack App</p>
        <h1>React front-end</h1>
        <p className="subhead">
          This page calls the Express API at
          <code className="code"> {apiBaseUrl}/api/message</code>
        </p>

        <div className="result">
          {loading && <p className="muted">Loading message…</p>}
          {!loading && error && (
            <p className="error">
              <span role="img" aria-hidden="true">
                ⚠️
              </span>{' '}
              {error}
            </p>
          )}
          {!loading && data && (
            <>
              <p className="label">API response</p>
              <pre className="payload">{JSON.stringify(data, null, 2)}</pre>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
