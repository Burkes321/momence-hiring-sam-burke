export interface AppTheme {
  mode: 'light' | 'dark'
  colors: {
    background: string
    surface: string
    subtle: string
    text: string
    muted: string
    accent: string
    onAccent: string
    accentSurface: string
    border: string
    controlBorder: string
    error: string
    errorSurface: string
    focus: string
  }
  space: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    xxl: string
    section: string
  }
  radius: { control: string; surface: string }
  typography: { font: string; small: string; body: string; heading: string; title: string; result: string }
  shadow: string
  contentWidth: string
  controlHeight: string
}
