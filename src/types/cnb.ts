export interface ExchangeRate {
  country: string
  currency: string
  amount: number
  code: string
  rate: number
}

export interface ExchangeRateTable {
  publishedAt: string
  sequence: number
  rates: ExchangeRate[]
}
