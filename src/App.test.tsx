// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, cleanup, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { App } from './App'
import { QUERY_DEFAULT_OPTIONS } from './const'
import fixture from './test/fixtures/cnb-rates.txt?raw'

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

const renderApp = () => {
  const client = new QueryClient({
    defaultOptions: { queries: { ...QUERY_DEFAULT_OPTIONS, retry: false, gcTime: 0 } },
  })
  return render(<QueryClientProvider client={client}><App /></QueryClientProvider>)
}

const createPendingResponse = () => {
  let resolve!: (response: Response) => void
  const promise = new Promise<Response>((resolveResponse) => { resolve = resolveResponse })
  return { promise, resolve }
}

describe('converter with fetched CNB rates', () => {
  it('loads rates and converts input without making additional requests', async () => {
    const user = userEvent.setup()
    const pending = createPendingResponse()
    const fetchMock = vi.fn().mockReturnValue(pending.promise)
    vi.stubGlobal('fetch', fetchMock)
    renderApp()
    expect(screen.getByRole('status')).toHaveTextContent('Loading exchange rates…')
    expect(screen.queryByLabelText('Amount in CZK')).not.toBeInTheDocument()
    await act(async () => pending.resolve(new Response(fixture)))
    const converter = within(await screen.findByRole('region', { name: 'Currency converter' }))
    expect(await screen.findByRole('table')).toHaveAccessibleName('Fixing date: 6 November 2026')
    expect(converter.getByRole('status')).toHaveTextContent(/EUR\s40\.00/)
    await user.selectOptions(converter.getByLabelText('Convert to'), 'HUF')
    expect(converter.getByRole('status')).toHaveTextContent(/HUF\s16,000$/)
    await user.clear(converter.getByLabelText('Amount in CZK'))
    expect(converter.queryByRole('status')).not.toBeInTheDocument()
    await user.type(converter.getByLabelText('Amount in CZK'), '250')
    expect(converter.getByRole('status')).toHaveTextContent(/HUF\s4,000$/)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('recovers from an initial network failure through Retry', async () => {
    const user = userEvent.setup()
    const fetchMock = vi.fn()
      .mockRejectedValueOnce(new TypeError('Network unavailable'))
      .mockResolvedValueOnce(new Response(fixture))
    vi.stubGlobal('fetch', fetchMock)
    renderApp()
    expect(await screen.findByRole('alert')).toHaveTextContent('Unable to load CNB exchange rates.')
    expect(screen.queryByLabelText('Amount in CZK')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Retry' }))
    expect(await screen.findByLabelText('Amount in CZK')).toHaveValue(1000)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('explains malformed data without displaying a conversion', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('invalid CNB data')))
    renderApp()
    expect(await screen.findByRole('alert')).toHaveTextContent('CNB returned data we couldn’t read.')
    expect(screen.queryByLabelText('Amount in CZK')).not.toBeInTheDocument()
  })

  it('preserves usable inputs during refresh and recalculates from the new fixing', async () => {
    const user = userEvent.setup()
    const pending = createPendingResponse()
    const fetchMock = vi.fn().mockResolvedValueOnce(new Response(fixture)).mockReturnValueOnce(pending.promise)
    vi.stubGlobal('fetch', fetchMock)
    renderApp()
    const input = await screen.findByLabelText('Amount in CZK')
    const converter = within(screen.getByRole('region', { name: 'Currency converter' }))
    await user.selectOptions(converter.getByLabelText('Convert to'), 'HUF')
    await user.click(screen.getByRole('button', { name: 'Refresh rates' }))
    expect(screen.getByText('Refreshing rates…')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Fetching rates…' })).toBeDisabled()
    await user.clear(input)
    await user.type(input, '250')
    expect(converter.getByRole('status')).toHaveTextContent(/HUF\s4,000$/)
    await act(async () => pending.resolve(new Response(fixture.replace('06 Nov', '09 Nov').replace('6.250', '5.000'))))
    await waitFor(() => expect(converter.getByRole('status')).toHaveTextContent(/HUF\s5,000$/))
    expect(input).toHaveValue(250)
    expect(converter.getByLabelText('Convert to')).toHaveValue('HUF')
    expect(converter.getByText('9 November 2026')).toHaveAttribute('datetime', '2026-11-09')
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('preserves the converter after a failed refresh and clears the warning on Retry', async () => {
    const user = userEvent.setup()
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(fixture))
      .mockResolvedValueOnce(new Response('invalid refreshed data'))
      .mockResolvedValueOnce(new Response(fixture))
    vi.stubGlobal('fetch', fetchMock)
    renderApp()
    const input = await screen.findByLabelText('Amount in CZK')
    const converter = within(screen.getByRole('region', { name: 'Currency converter' }))
    await user.selectOptions(converter.getByLabelText('Convert to'), 'HUF')
    await user.click(screen.getByRole('button', { name: 'Refresh rates' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Refresh failed. Showing the previously loaded rates.')
    await user.clear(input)
    await user.type(input, '500')
    expect(converter.getByRole('status')).toHaveTextContent(/HUF\s8,000$/)
    await user.click(screen.getByRole('button', { name: 'Retry' }))
    await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument())
    expect(input).toHaveValue(500)
    expect(converter.getByLabelText('Convert to')).toHaveValue('HUF')
    expect(converter.getByRole('status')).toHaveTextContent(/HUF\s8,000$/)
  })
})
