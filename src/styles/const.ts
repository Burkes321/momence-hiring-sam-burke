import type { AppTheme } from '../types/theme'

export const SHARED_TOKENS = {
  space: { xs: '0.25rem', sm: '0.5rem', md: '0.75rem', lg: '1rem', xl: '1.5rem', xxl: '2rem', section: '3rem' },
  radius: { control: '0.5rem', surface: '1rem' },
  typography: {
    font: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    small: '0.875rem',
    body: '1rem',
    heading: '1.25rem',
    title: 'clamp(2rem, 5vw, 3rem)',
    result: 'clamp(1.75rem, 5vw, 2.75rem)',
  },
  contentWidth: '68rem',
  controlHeight: '3rem',
}

export const LIGHT_THEME: AppTheme = {
  ...SHARED_TOKENS,
  mode: 'light',
  colors: {
    background: '#f6f5f1',
    surface: '#ffffff',
    subtle: '#f0efeb',
    text: '#202b2a',
    muted: '#566361',
    accent: '#12695d',
    onAccent: '#ffffff',
    accentSurface: '#eaf4ef',
    border: '#dcded7',
    controlBorder: '#7c8984',
    error: '#a72b31',
    errorSurface: '#fff0ef',
    focus: '#12695d',
  },
  shadow: '0 4px 20px rgb(32 43 42 / 4%)',
}

export const DARK_THEME: AppTheme = {
  ...SHARED_TOKENS,
  mode: 'dark',
  colors: {
    background: '#151b1a',
    surface: '#1e2725',
    subtle: '#283330',
    text: '#f0f3ee',
    muted: '#b0bfb8',
    accent: '#91d6bd',
    onAccent: '#152b23',
    accentSurface: '#253e34',
    border: '#3d4d46',
    controlBorder: '#7c9287',
    error: '#ffb3b5',
    errorSurface: '#40292a',
    focus: '#91d6bd',
  },
  shadow: '0 4px 20px rgb(0 0 0 / 12%)',
}
