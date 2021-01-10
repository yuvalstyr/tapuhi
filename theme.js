import { polaris } from '@theme-ui/presets'

export const theme = {
  ...polaris,
  colors: {
    ...polaris.colors,
    primary: '#92C03E',
    secondary: '#F5F5F5',
    error: '#DC4E41',
  },
  lineHeights: {
    body: [1.25, 1.75],
  },
  styles: { ...polaris.styles },
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      backgroundColor: 'secondary',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    },
  },
  forms: {
    input: {
      borderColor: 'gray',
      backgroundColor: 'white',
      height: '2rem',
      '&:focus': {
        borderColor: 'primary',
        boxShadow: (t) => `0 0 0 2px ${t.colors.primary}`,
        outline: 'none',
      },
    },
  },
  text: {
    default: {
      color: 'text',
      fontSize: 3,
    },
    heading: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      fontSize: [2, 30],
    },
  },
}
