import type { ComponentPropsWithoutRef, ElementType } from 'react'

export type TypographyVariant = 'title' | 'heading' | 'body' | 'small' | 'result'
export type TypographyTone = 'inherit' | 'text' | 'muted' | 'accent' | 'error'
export type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold'

export type TypographyProps<Element extends ElementType = 'p'> = {
  as?: Element
  variant?: TypographyVariant
  tone?: TypographyTone
  weight?: TypographyWeight
} & Omit<ComponentPropsWithoutRef<Element>, 'as' | 'variant' | 'tone' | 'weight'>
