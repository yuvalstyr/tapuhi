import React from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'theme-ui'
import Layout from '../components/Layout'
import { theme } from '../theme'
import 'react-datepicker/dist/react-datepicker.css'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function App(props: AppProps) {
  const { pageProps, Component } = props

  console.log('theme', theme)

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
