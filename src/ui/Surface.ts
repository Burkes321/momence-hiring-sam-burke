import styled from 'styled-components'

export const Surface = styled.section`
  min-width: 0;
  padding: clamp(${({ theme }) => theme.space.lg}, 4vw, ${({ theme }) => theme.space.xxl});
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.surface};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow};
`
