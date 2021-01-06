import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { Box, Button, Card } from 'theme-ui'
import { itemsArray } from '../lib/item'
import { AddItem } from './AddItem'
import ItemList from './ItemList'
import { OrderDetails } from './OrderDetails'

const defaultValues = {
  supplier: { value: '', label: '' },
  date: new Date(),
  orderNumber: '',
}

const ReceptionForm: React.FC = () => {
  const { register, control, handleSubmit, errors, getValues } = useForm({
    mode: 'onTouched',
    defaultValues,
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'items' })
  const onSubmit = (data) => console.log(data)

  const items = itemsArray.map((i) => ({ value: i.name, label: i.name }))
  return (
    <Box
      as="form"
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        overflow: 'hidden auto',
        gap: '12px',
        width: ['99vw', '90vw', '90vw', '50vw'],
        marginTop: ['0.5rem', '2rem'],
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card sx={{ flexShrink: 0 }}>
        <OrderDetails {...{ items, control, errors, register, getValues }} />
      </Card>
      <Card sx={{ flexShrink: 0 }}>
        <AddItem {...{ items, append }} />
      </Card>
      <ItemList {...{ fields, register, remove }} />
      <Button mb="1">צור הזמנה</Button>
    </Box>
  )
}

export default ReceptionForm
