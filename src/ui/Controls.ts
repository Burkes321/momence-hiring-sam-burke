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
export const Select = styled.select`
  ${controlStyles}
  appearance: none;
  padding-right: ${({ theme }) => theme.space.section};
  background-image: ${({ theme }) => `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="m4 6 4 4 4-4" stroke="${theme.colors.text}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`)}")`};
  background-repeat: no-repeat;
  background-position: right ${({ theme }) => theme.space.md} center;
  background-size: 1rem;

  &:disabled { background-color: ${({ theme }) => theme.colors.subtle}; }

  @media (forced-colors: active) {
    appearance: auto;
    background-image: none;
  }
`
