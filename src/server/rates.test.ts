// @vitest-environment node
import { readFile } from 'node:fs/promises'
import { afterEach, describe, expect, it, vi } from 'vitest'
import endpoint from '../../api/rates.ts'
import { CNB_RATES_URL } from '../api/const.ts'
import { parseCnbRates } from '../utils/cnb.ts'
import { UPSTREAM_TIMEOUT_MS } from './const.ts'

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('/api/rates', () => {
  it('returns the unchanged feed with shared caching and fetches only the fixed source', async () => {
    const fixture = await readFile(new URL('../test/fixtures/cnb-rates.txt', import.meta.url), 'utf8')
    const fetchMock = vi.fn().mockResolvedValue(new Response(fixture))
    vi.stubGlobal('fetch', fetchMock)
    const timeout = vi.spyOn(AbortSignal, 'timeout')

    const response = await endpoint.fetch(new Request('https://example.com/api/rates?url=https://example.org'))

    expect(fetchMock).toHaveBeenCalledExactlyOnceWith(CNB_RATES_URL, { signal: expect.any(AbortSignal) })
    expect(timeout).toHaveBeenCalledWith(UPSTREAM_TIMEOUT_MS)
    expect(response.status).toBe(200)
    expect(response.headers.get('Content-Type')).toBe('text/plain; charset=utf-8')
    expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff')
    expect(response.headers.get('Cache-Control')).toBe('public, max-age=0, s-maxage=300')
    const text = await response.text()
    expect(text).toBe(fixture)
    expect(parseCnbRates(text).rates.length).toBeGreaterThan(0)
  })

  it('rejects unsupported methods without contacting CNB', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const response = await endpoint.fetch(new Request('https://example.com/api/rates', { method: 'POST' }))

    expect(response.status).toBe(405)
    expect(response.headers.get('Allow')).toBe('GET')
    expect(response.headers.get('Cache-Control')).toBe('no-store')
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it.each(['upstream status', 'network failure', 'body failure'])('returns an uncached generic 502 for %s', async (failure) => {
    const fetchMock = vi.fn()
    if (failure === 'upstream status') {
      fetchMock.mockResolvedValue(new Response('private upstream detail', { status: 503 }))
    } else if (failure === 'network failure') {
      fetchMock.mockRejectedValue(new Error('private network detail'))
    } else {
      fetchMock.mockResolvedValue({ ok: true, text: () => Promise.reject(new Error('private body detail')) })
    }
    vi.stubGlobal('fetch', fetchMock)

    const response = await endpoint.fetch(new Request('https://example.com/api/rates'))

    expect(response.status).toBe(502)
    expect(response.headers.get('Cache-Control')).toBe('no-store')
    expect(await response.text()).toBe('Unable to retrieve CNB exchange rates.')
  })

  it('returns an uncached 504 when the upstream deadline expires', async () => {
    const controller = new AbortController()
    vi.spyOn(AbortSignal, 'timeout').mockReturnValue(controller.signal)
    vi.stubGlobal('fetch', vi.fn().mockImplementation(() => {
      controller.abort(new DOMException('Deadline exceeded', 'TimeoutError'))
      return Promise.reject(controller.signal.reason)
    }))

    const response = await endpoint.fetch(new Request('https://example.com/api/rates'))

    expect(response.status).toBe(504)
    expect(response.headers.get('Cache-Control')).toBe('no-store')
    expect(await response.text()).toBe('CNB exchange rates request timed out.')
  })
})
