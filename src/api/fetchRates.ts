export const fetchRates = async (signal?: AbortSignal): Promise<string> => {
  const response = await fetch('/api/rates', { signal })

  if (!response.ok) {
    throw new Error(`Unable to fetch CNB exchange rates (HTTP ${response.status}).`)
  }

  return response.text()
}
