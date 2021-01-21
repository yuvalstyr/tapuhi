import { Item } from '@prisma/client'
import React from 'react'
import { Grid } from 'theme-ui'
import CreateItem from './ItemAdminCard'
import ItemUpdate from './ItemUpdate'

export const ItemAdmin: React.FC<IProps> = ({ items }) => {
  return (
    <Grid sx={{ width: '100%' }}>
      <CreateItem />
      <ItemUpdate items={items} />
    </Grid>
  )
}
interface IProps {
  items: Item[]
}
