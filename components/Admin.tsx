import React from 'react'
import { Box, Button, Flex, Heading } from 'theme-ui'
import { AdminProps } from '../pages/admin'
import { ItemAdmin } from './ItemAdmin'
import { SupplierAdmin } from './SupplierAdmin'

const Admin: React.FC<AdminProps> = ({ items, suppliers }) => {
  return (
    <React.Fragment>
      <Flex
        mt={2}
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          width: ['99vw', '90vw', '90vw', '50vw'],
        }}
      >
        <Heading mb={2}>ניהול תוכן</Heading>
        <Box mb={2}>
          <Button mr={2}>מוצרים</Button>
          <Button mr={2}>ספקים</Button>
        </Box>
        <ItemAdmin items={items} />
        <SupplierAdmin suppliers={suppliers} />
      </Flex>
    </React.Fragment>
  )
}

export default Admin
