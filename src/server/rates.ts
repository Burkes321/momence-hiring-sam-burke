import { parseCnbRates } from '../utils/cnb.ts'
import { CNB_RATES_URL } from '../api/const.ts'
import { RESPONSE_HEADERS, SUCCESS_CACHE_CONTROL, UPSTREAM_TIMEOUT_MS } from './const.ts'

export const handleRates = async (request: Request): Promise<Response> => {
  if (request.method !== 'GET') {
    return new Response('Method not allowed.', {
      status: 405,
      headers: { ...RESPONSE_HEADERS, Allow: 'GET', 'Cache-Control': 'no-store' },
    })
  }

  const signal = AbortSignal.timeout(UPSTREAM_TIMEOUT_MS)

  try {
    const upstream = await fetch(CNB_RATES_URL, { signal })

    if (!upstream.ok) {
      return new Response('Unable to retrieve CNB exchange rates.', {
        status: 502,
        headers: { ...RESPONSE_HEADERS, 'Cache-Control': 'no-store' },
      })
    }

    const text = await upstream.text()
    parseCnbRates(text)

    return new Response(text, {
      headers: { ...RESPONSE_HEADERS, 'Cache-Control': SUCCESS_CACHE_CONTROL },
    })
  } catch {
    const status = signal.aborted ? 504 : 502
    const message = signal.aborted ? 'CNB exchange rates request timed out.' : 'Unable to retrieve CNB exchange rates.'

    return new Response(message, {
      status,
      headers: { ...RESPONSE_HEADERS, 'Cache-Control': 'no-store' },
    })
  }
}
