import { Supplier } from '@prisma/client'
import React from 'react'
import { Grid } from 'theme-ui'
import CreateSupplier from './SupplierAdminCard'
import SupplierUpdate from './SupplierUpdate'

export const SupplierAdmin: React.FC<IProps> = ({ suppliers }) => {
  return (
    <Grid sx={{ width: '100%' }}>
      <CreateSupplier />
      <SupplierUpdate suppliers={suppliers} />
    </Grid>
  )
}
interface IProps {
  suppliers: Supplier[]
}
