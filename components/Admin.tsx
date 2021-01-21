import React from 'react'
import { Box, Button, Flex, Grid, Heading } from 'theme-ui'
import { AdminProps } from '../pages/admin'
import CreateItem from './AdminItem'
import UpdateItem from './UpdateItem'

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
        <Grid sx={{ width: '100%' }}>
          <CreateItem />
          <UpdateItem items={items} />
        </Grid>
      </Flex>
    </React.Fragment>
  )
}

export default Admin
