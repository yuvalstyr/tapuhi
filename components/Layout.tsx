import useWindowSize from '../lib/useWindows'
/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, Image, Flex, Text } from 'theme-ui'

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
