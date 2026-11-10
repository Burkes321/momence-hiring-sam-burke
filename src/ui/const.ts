import type { TypographyVariant, TypographyWeight } from '../types/typography'

export const TYPOGRAPHY_VARIANTS = {
  title: { weight: 700, lineHeight: 1.2, letterSpacing: '-0.035em' },
  heading: { weight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' },
  body: { weight: 400, lineHeight: 1.6, letterSpacing: 'normal' },
  small: { weight: 400, lineHeight: 1.6, letterSpacing: 'normal' },
  result: { weight: 650, lineHeight: 1.25, letterSpacing: '-0.03em' },
} satisfies Record<TypographyVariant, { weight: number; lineHeight: number; letterSpacing: string }>

export const TYPOGRAPHY_WEIGHTS = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} satisfies Record<TypographyWeight, number>
