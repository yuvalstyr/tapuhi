import useWindowSize from '../lib/useWindows'
/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, Image, Flex, Text, Button } from 'theme-ui'
import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

function Logo() {
  return (
    <Flex p={2} sx={{ alignItems: 'center' }}>
      <Image
        src={'./logo.png'}
        sx={{
          width: [46, 72],
          height: [46, 72],
          maxWidth: [46, 72],
          minWidth: [46, 72],
        }}
      />
    </Flex>
  )
}

const ReturnButton: React.FC = () => {
  const { pathname } = useRouter()
  if (pathname == '/') return null
  return (
    <Link href="/">
      <Button pt={2} pb={2} mb={2} mt={2}>
        חזרה
      </Button>
    </Link>
  )
}

const Layout: React.FC = ({ children }) => {
  const { height } = useWindowSize()
  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: height,
        direction: 'rtl',
      }}
    >
      <header
        sx={{
          flexShrink: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 20px',
          zIndex: 1,
          borderBottom: 'solid 1px rgb(219, 217,217)',
        }}
      >
        <Logo />
        <ReturnButton />
      </header>
      <main
        sx={{
          flexGrow: 1,
          overflow: 'hidden auto',
          display: 'grid',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        {children}
      </main>
      <footer
        sx={{
          backgroundColor: 'primary',
          width: '100%',
          zIndex: '200',
        }}
      >
        <Text>{`_`}</Text>
      </footer>
    </div>
  )
}

export default Layout
