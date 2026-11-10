import styled from 'styled-components'

export const Page = styled.main`
  width: min(100%, ${({ theme }) => theme.contentWidth});
  margin-inline: auto;
  padding: ${({ theme }) => theme.space.xxl} ${({ theme }) => theme.space.lg} ${({ theme }) => theme.space.section};
  display: grid;
  gap: ${({ theme }) => theme.space.xl};
`

export const Header = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.xl};
  padding-block: ${({ theme }) => theme.space.xl};
  > div { display: grid; gap: ${({ theme }) => theme.space.md}; max-width: 42rem; }
  > div > p:last-child { color: ${({ theme }) => theme.colors.muted}; }
`

export const Eyebrow = styled.p`
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.typography.small};
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`

export const ThemeControl = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  min-height: ${({ theme }) => theme.controlHeight};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.small};
  white-space: nowrap;
  input { width: 1.125rem; height: 1.125rem; accent-color: ${({ theme }) => theme.colors.accent}; }
`

export const RequestBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.typography.small};
`

export const Footer = styled.footer`
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.typography.small};
`
