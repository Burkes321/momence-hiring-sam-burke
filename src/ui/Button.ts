import styled from 'styled-components'

export const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  min-height: ${({ theme }) => theme.controlHeight};
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.xl};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radius.control};
  background: ${({ theme, $variant }) => $variant === 'secondary' ? theme.colors.surface : theme.colors.accent};
  color: ${({ theme, $variant }) => $variant === 'secondary' ? theme.colors.accent : theme.colors.onAccent};
  font-weight: 650;
  cursor: pointer;
  &:hover:not(:disabled) { text-decoration: underline; text-underline-offset: 0.2em; }
  &:disabled {
    background: ${({ theme }) => theme.colors.subtle};
    border-color: ${({ theme }) => theme.colors.controlBorder};
    color: ${({ theme }) => theme.colors.muted};
    cursor: default;
  }
`
