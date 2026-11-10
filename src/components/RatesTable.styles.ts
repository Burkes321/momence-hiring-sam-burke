import styled from 'styled-components'
import { Surface } from '../ui/Surface'

export const RatesSurface = styled(Surface)`
  h2 { margin-bottom: ${({ theme }) => theme.space.sm}; }
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
  caption {
    text-align: left;
    padding-bottom: ${({ theme }) => theme.space.lg};
  }
  th, td {
    padding: ${({ theme }) => theme.space.lg};
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
  th {
    background: ${({ theme }) => theme.colors.subtle};
    white-space: nowrap;
  }
  th:last-child, td:last-child {
    text-align: right;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }
  tbody tr:last-child td { border-bottom: 0; }
`
