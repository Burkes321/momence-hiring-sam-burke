import styled from 'styled-components'
import { Surface } from './ui/Surface'

export const RatesSurface = styled(Surface)`
  h2 { margin-bottom: ${({ theme }) => theme.space.sm}; }
`

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.typography.small};
`

export const ScrollRegion = styled.section`
  max-width: 100%;
  overflow-x: auto;
  margin-top: ${({ theme }) => theme.space.xl};
  border-radius: ${({ theme }) => theme.radius.control};
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.typography.small};
  caption {
    text-align: left;
    padding-bottom: ${({ theme }) => theme.space.lg};
    color: ${({ theme }) => theme.colors.muted};
  }
  th, td {
    padding: ${({ theme }) => theme.space.lg};
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
  th {
    background: ${({ theme }) => theme.colors.subtle};
    font-weight: 650;
    white-space: nowrap;
  }
  th:last-child, td:last-child {
    text-align: right;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }
  td:nth-child(3) { font-weight: 650; }
  tbody tr:last-child td { border-bottom: 0; }
`
