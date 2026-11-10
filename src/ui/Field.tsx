import type { ReactNode } from 'react'
import styled from 'styled-components'
import { Typography } from './Typography'

const Container = styled.div`
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.space.sm};
  min-width: 0;
`

interface FieldProps {
  label: string
  htmlFor: string
  help?: string
  error?: string | null
  children: ReactNode
}

export const Field = ({ label, htmlFor, help, error, children }: FieldProps) => (
  <Container>
    <Typography as="label" htmlFor={htmlFor} weight="semibold">{label}</Typography>
    {children}
    {help && !error && <Typography id={`${htmlFor}-help`} variant="small" tone="muted">{help}</Typography>}
    <div aria-live="polite" aria-atomic="true">
      {error && <Typography id={`${htmlFor}-error`} variant="small" tone="error" weight="semibold">{error}</Typography>}
    </div>
  </Container>
)
