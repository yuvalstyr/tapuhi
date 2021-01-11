import React from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Box, Button } from 'theme-ui'
import { FormProps } from '../pages/index'
import ItemList from './ItemList'
import { OrderDetails } from './OrderDetails'

const defaultValues = {
  supplier: { value: '', label: '' },
  date: new Date(),
  orderNumber: '',
}

const ReceptionForm: React.FC<FormProps> = ({
  items: itemsArray,
  suppliers: supplierArray,
}) => {
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues,
  })
  const { handleSubmit, control, register } = methods
  const { fields, append, remove } = useFieldArray({ control, name: 'items' })
  const onSubmit = (data: any) => console.log(data)

  const items = itemsArray.map((i) => ({ value: i.name, label: i.name }))
  const suppliers = supplierArray.map((i) => ({ value: i.name, label: i.name }))
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
        <OrderDetails suppliers={suppliers} />
        <ItemList {...{ fields, register, remove, items, append }} />
        <Button mb="1">צור הזמנה</Button>
      </Box>
    </FormProvider>
  )
}

export default ReceptionForm
