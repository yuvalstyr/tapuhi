import { merge, Theme } from 'theme-ui'
import { polaris } from '@theme-ui/presets'

export const theme: Theme = merge(
  polaris as Theme,
  {
    ...polaris,
    colors: { ...polaris.colors, primary: '#92C03E', secondary: '#F5F5F5' },
    styles: { ...polaris.styles },
    cards: {
      primary: {
        padding: 2,
        borderRadius: 4,
        backgroundColor: 'secondary',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      },
    },
  } as Partial<Theme>,
) as Theme
