import React from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
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
  const methods = useForm({
    mode: 'onTouched',
    defaultValues,
  })
  const { register, control, handleSubmit } = methods
  const { fields, append, remove } = useFieldArray({ control, name: 'items' })
  const onSubmit = (data) => console.log(data)

  const items = itemsArray.map((i) => ({ value: i.name, label: i.name }))
  return (
    <FormProvider {...methods}>
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
          <OrderDetails {...{ items }} />
        </Card>
        <Card sx={{ flexShrink: 0 }}>
          <AddItem {...{ items, append }} />
        </Card>
        {fields.length > 0 && (
          <ItemList {...{ fields, register, remove, items }} />
        )}
        <Button mb="1">צור הזמנה</Button>
      </Box>
    </FormProvider>
  )
}

export default ReceptionForm
