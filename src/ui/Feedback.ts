import styled from 'styled-components'

export const Feedback = styled.div<{ $tone?: 'error' }>`
  padding: ${({ theme }) => theme.space.lg};
  border: 1px solid ${({ theme, $tone }) => $tone === 'error' ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.control};
  background: ${({ theme, $tone }) => $tone === 'error' ? theme.colors.errorSurface : theme.colors.subtle};
  color: ${({ theme, $tone }) => $tone === 'error' ? theme.colors.error : theme.colors.muted};
`
