import styled, { css } from 'styled-components'

const controlStyles = css`
  width: 100%;
  min-width: 0;
  min-height: ${({ theme }) => theme.controlHeight};
  padding: ${({ theme }) => theme.space.md};
  border: 1px solid ${({ theme }) => theme.colors.controlBorder};
  border-radius: ${({ theme }) => theme.radius.control};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  &[aria-invalid='true'] { border-color: ${({ theme }) => theme.colors.error}; }
  &:disabled {
    background: ${({ theme }) => theme.colors.subtle};
    color: ${({ theme }) => theme.colors.muted};
    cursor: not-allowed;
  }
`

export const Input = styled.input`${controlStyles}`
export const Select = styled.select`${controlStyles}`
