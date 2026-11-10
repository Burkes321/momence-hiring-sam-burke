export const FIXING_DATE_FORMATTER = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeZone: 'UTC' })
export const QUOTE_FORMATTER = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 3 })
export const NORMALIZED_QUOTE_FORMATTER = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 8 })
export const AMOUNT_INPUT_HELP = 'Enter a non-negative CZK amount with up to two decimal places.'
