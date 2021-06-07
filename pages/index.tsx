import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { Button, Flex } from 'theme-ui'

const index: NextPage = () => {
  return (
    <React.Fragment>
      <Flex sx={{ flexDirection: 'column' }}>
        <Link href="/order">
          <Button p={2} m={2}>
            הזמנה חדשה
          </Button>
        </Link>
        <Link href="/admin">
          <Button p={2} m={2}>
            ניהול תוכן
          </Button>
        </Link>
      </Flex>
    </React.Fragment>
  )
}

export default index
