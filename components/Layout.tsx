import { jsx, Image, Flex, Label, Avatar, Text } from 'theme-ui'
import { useFetchUser } from '../lib/user'
import useWindowSize from '../lib/useWindows'

/** @jsxRuntime classic /
/** @jsx jsx */

function Logo() {
  return (
    <Flex p={2} sx={{ alignItems: 'center' }}>
      <Image
        src={'./logo.png'}
        sx={{
          width: 72,
          height: 72,
          maxWidth: 72,
          minWidth: 72,
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
          // alignContent: 'center',
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
        <Text>nav</Text>
      </footer>
    </div>
  )
}

export default Layout
