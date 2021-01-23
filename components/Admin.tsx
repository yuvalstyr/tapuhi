import React from 'react'
import { Box, Flex, Grid, Heading } from 'theme-ui'
import { AdminProps } from '../pages/admin'
import { ItemAdmin } from './ItemAdmin'
import { SupplierAdmin } from './SupplierAdmin'
import { Tabs } from './Tabs'

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
          <Tabs>
            <Grid columns={2}>
              <Tabs.Tab label={'מוצרים'}>מוצרים </Tabs.Tab>
              <Tabs.Tab label={'ספקים'}>ספקים </Tabs.Tab>
            </Grid>
            <Tabs.Panel label="מוצרים">
              <ItemAdmin items={items} />
            </Tabs.Panel>
            <Tabs.Panel label="ספקים">
              <SupplierAdmin suppliers={suppliers} />
            </Tabs.Panel>
          </Tabs>
        </Box>
      </Flex>
    </React.Fragment>
  )
}

export default Admin
