import styled from 'styled-components'
import { Surface } from '../ui/Surface'

export const ConverterSurface = styled(Surface)`
  display: grid;
  gap: ${({ theme }) => theme.space.xl};
`

export const Fields = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.space.xl};
  @media (max-width: 42rem) { grid-template-columns: minmax(0, 1fr); }
`

export const Result = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.sm};
  min-width: 0;
  padding: ${({ theme }) => theme.space.xl};
  border-radius: ${({ theme }) => theme.radius.control};
  background: ${({ theme }) => theme.colors.accentSurface};
  color: ${({ theme }) => theme.colors.accent};
  output {
    display: block;
    font-size: ${({ theme }) => theme.typography.result};
    font-weight: 650;
    line-height: 1.25;
    letter-spacing: -0.03em;
    font-variant-numeric: tabular-nums;
  }
  output span {
    display: block;
    margin-bottom: ${({ theme }) => theme.space.sm};
    font-size: ${({ theme }) => theme.typography.small};
    font-weight: 500;
    letter-spacing: normal;
  }
`

export const QuoteDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.lg};
  font-size: ${({ theme }) => theme.typography.small};
  color: ${({ theme }) => theme.colors.muted};
  p:first-child { color: ${({ theme }) => theme.colors.text}; font-weight: 600; }
`

export const Note = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.typography.small};
`
