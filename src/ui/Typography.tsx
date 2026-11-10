import type { ElementType } from 'react'
import styled from 'styled-components'
import type { TypographyProps, TypographyTone, TypographyVariant, TypographyWeight } from '../types/typography'
import { TYPOGRAPHY_VARIANTS, TYPOGRAPHY_WEIGHTS } from './const'

const Text = styled.p<{
  $variant: TypographyVariant
  $tone: TypographyTone
  $weight?: TypographyWeight
}>`
  margin: 0;
  font-size: ${({ theme, $variant }) => theme.typography[$variant]};
  font-weight: ${({ $variant, $weight }) => $weight ? TYPOGRAPHY_WEIGHTS[$weight] : TYPOGRAPHY_VARIANTS[$variant].weight};
  line-height: ${({ $variant }) => TYPOGRAPHY_VARIANTS[$variant].lineHeight};
  letter-spacing: ${({ $variant }) => TYPOGRAPHY_VARIANTS[$variant].letterSpacing};
  color: ${({ theme, $tone }) => $tone === 'inherit' ? 'inherit' : theme.colors[$tone]};
  font-variant-numeric: ${({ $variant }) => $variant === 'result' ? 'tabular-nums' : 'normal'};
`

export const Typography = <Element extends ElementType = 'p'>({
  as,
  variant = 'body',
  tone = 'inherit',
  weight,
  ...props
}: TypographyProps<Element>) => (
  <Text as={as ?? 'p'} $variant={variant} $tone={tone} $weight={weight} {...props} />
)
