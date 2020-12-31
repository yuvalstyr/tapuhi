import { merge, Theme } from 'theme-ui'
import { dark } from '@theme-ui/presets'

export const theme: Theme = merge(
  dark as Theme,
  {
    fonts: {
      body: 'Assistant',
    },
    colors: {
      ...dark.colors,
      primary: '#24272D',
      secondary: '#DD6031',
      highlight: '#c0f',
      error: '#e21616',
      text: '#F5F1ED',
      title: '#3F4650',
    },
    links: {
      ':hover': {
        color: 'text',
        backgroundColor: '#a40606',
        backgroundImage: ' linear-gradient(315deg, #a40606 0%, #d98324 74%)',
      },
    },
    images: {
      logo: {
        width: 70,
        height: 48,
      },
    },
    form: {
      boxShadow: (t) => `0 0 5px 3px ${t.colors.primary}`,
      h2: {
        padding: '10px',
        margin: '10px',
      },
      label: {
        fontSize: 2,
        fontWeight: 'bold',
      },
      button: {
        padding: '10px',
        margin: '10px 5px 10px 5px',
        backgroundColor: 'secondary',
      },
      input: {
        borderColor: 'gray',
        '&:focus': {
          borderColor: 'primary',
          boxShadow: (t) => `0 0 0 2px ${t.colors.primary}`,
          outline: 'none',
        },
      },
      select: {
        padding: 1,
      },
      option: {
        color: 'black',
      },
    },
    buttons: {
      icon: {
        color: '##000',
      },
    },
    cards: {
      primary: {
        padding: 2,
        borderRadius: 4,
        backgroundColor: 'primary',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      },
    },
    alerts: {
      primary: {
        color: 'background',
        bg: 'primary',
      },
      error: {
        color: 'text',
        bg: '#fc4e03',
      },
      muted: {
        color: 'text',
        bg: 'muted',
      },
    },
  } as Partial<Theme>,
) as Theme
