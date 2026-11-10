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
  }
  output span {
    display: block;
    margin-bottom: ${({ theme }) => theme.space.sm};
  }
`

export const QuoteDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.lg};
`
