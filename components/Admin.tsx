import { Item } from '@prisma/client'
import React from 'react'
import useSWR from 'swr'
import { Box, Flex, Grid, Heading } from 'theme-ui'
import { ITEMS } from '../lib/gql'
import { AdminProps, fetcher } from '../pages/admin'
import { ItemAdmin } from './ItemAdmin'
import { SupplierAdmin } from './SupplierAdmin'
import { Tabs } from './Tabs'

const Admin: React.FC<AdminProps> = ({ items, suppliers }) => {
  const { data } = useSWR<{ ['findManyItem']: Item[] }, any>(ITEMS, fetcher, {
    initialData: { findManyItem: items },
    revalidateOnFocus: false,
  })
  if (!data) return <div>loading...</div>
  const { findManyItem } = data

  return (
    <React.Fragment>
      <Flex
        mt={2}
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          width: ['99vw', '90vw', null, '50vw'],
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
              <ItemAdmin items={findManyItem} />
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
