import { Item, Supplier } from '@prisma/client'
import React from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Box, Button } from 'theme-ui'
import { EventsEnum, SubmitEvent } from '../machine/orderFormMachine.types'
import { Ioptions, OrderFormData } from '../type'
import ItemList from './ItemList'
import { OrderDetails } from './OrderDetails'

export interface FormProps {
  items: Item[]
  suppliers: Supplier[]
  // eslint-disable-next-line no-unused-vars
  send: (event: SubmitEvent) => void
}

const defaultValues = {
  supplier: { value: '', label: '' },
  date: new Date(),
  orderNumber: '',
}

const getIdfromArray = (arr: (Item | Supplier)[], name: string) => {
  return arr.filter((i) => i.name === name)[0].id
}

const asjustItemsForMutation = (
  items: { name: Ioptions; price: number; quantity: number }[],
  supplierId: number,
  itemsArray: Item[],
) =>
  items.map((i) => {
    const { name, price, quantity } = i
    const itemId = String(getIdfromArray(itemsArray, name.value))
    return {
      price: +price,
      quantity: +quantity,
      supplier: { connect: { id: supplierId } },
      item: { connect: { id: itemId } },
    }
  })

const ReceptionForm: React.FC<FormProps> = ({
  items: itemsArray,
  suppliers: supplierArray,
  send,
}) => {
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues,
  })
  const { handleSubmit, control, register } = methods
  const { fields, append, remove } = useFieldArray({ control, name: 'items' })

  const onSubmit = (data: OrderFormData) => {
    const supplierId = +getIdfromArray(supplierArray, data.supplier.value)
    const createItems = asjustItemsForMutation(
      data.items,
      supplierId,
      itemsArray,
    )
    send({
      type: EventsEnum.SUBMIT,
      data: {
        date: data.date,
        supplierId: +supplierId,
        items: createItems,
      },
    })
  }

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
        <ItemList
          {...{ fields, register, remove, items, append, itemsArray }}
        />
        <Button mb="1">צור הזמנה</Button>
      </Box>
    </FormProvider>
  )
}

export default ReceptionForm
