import { Item, Supplier } from '@prisma/client'
import React from 'react'
import ReactSelect from 'react-select'
import { Box, Card, Heading } from 'theme-ui'
import SupplierAdminCard from './SupplierAdminCard'

interface IProps {
  suppliers: Supplier[]
}

const ItemUpdate: React.FC<IProps> = ({ suppliers }) => {
  const [supplier, setSupplier] = React.useState('')
  const updateSupplier = suppliers.filter((s) => s.name === supplier)
  const oneSupplierSelected = updateSupplier.length === 1
  debugger
  const options = suppliers.map((s) => ({ label: s.name, value: s.name }))
  return (
    <Card>
      <Heading mb={2}>עדכון פריט</Heading>
      <Box mb={2}>
        <ReactSelect
          inputId="react-select"
          options={options}
          onChange={(e) => setSupplier(e?.value ?? '')}
        />
      </Box>
      {oneSupplierSelected && (
        <SupplierAdminCard updateSupplier={updateSupplier[0]} />
      )}
    </Card>
  )
}

export default ItemUpdate
