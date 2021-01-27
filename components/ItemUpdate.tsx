import { Item } from '@prisma/client'
import React from 'react'
import ReactSelect from 'react-select'
import { Box, Card, Heading } from 'theme-ui'
import ItemAdmin from './ItemAdminCard'

interface IProps {
  items: Item[]
}

const ItemUpdate: React.FC<IProps> = ({ items }) => {
  const [item, setItem] = React.useState('')
  const updateItem = items.filter((i) => i.name === item)
  const oneItemSelected = updateItem.length === 1
  const options = items.map((i) => ({ label: i.name, value: i.name }))
  return (
    <Card>
      <Heading mb={2}>עדכון פריט</Heading>
      <Box mb={2}>
        <ReactSelect
          inputId="react-select"
          options={options}
          onChange={(e) => setItem(e?.value ?? '')}
          value={{ label: item, value: item }}
        />
      </Box>
      {oneItemSelected && (
        <ItemAdmin updateItem={updateItem[0]} setItem={setItem} />
      )}
    </Card>
  )
}

export default ItemUpdate
