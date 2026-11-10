import type { ReactNode } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.space.sm};
  min-width: 0;
  label { font-weight: 650; }
`

const Help = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.typography.small};
`

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.small};
  font-weight: 600;
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
    <label htmlFor={htmlFor}>{label}</label>
    {children}
    {help && !error && <Help id={`${htmlFor}-help`}>{help}</Help>}
    <div aria-live="polite" aria-atomic="true">
      {error && <ErrorText id={`${htmlFor}-error`}>{error}</ErrorText>}
    </div>
  </Container>
)
