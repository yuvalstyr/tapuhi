import { Item, Supplier } from '@prisma/client'
import { useMachine } from '@xstate/react'
import { request } from 'graphql-request'
import React from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Box, Button, Heading } from 'theme-ui'
import { CREATE_ORDER } from '../lib/gql'
import { EventsEnum, orderFormMachine } from '../machine/OrderFormMachine'
import { FormProps } from '../pages/index'
import { Ioptions } from '../type'
import ItemList from './ItemList'
import { OrderDetails } from './OrderDetails'

const defaultValues = {
  supplier: { value: '', label: '' },
  date: new Date(),
  orderNumber: '',
}

type FormData = {
  date: Date
  orderNumber?: string
  supplier: Ioptions
  items: { name: Ioptions; price: number; quantity: number }[]
}

const getIdfromArray = (arr: (Item | Supplier)[], name: string) => {
  return arr.filter((i) => i.name === name)[0].id
}

const createItemForMutation = (
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
}) => {
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues,
  })
  const { handleSubmit, control, register } = methods
  const { fields, append, remove } = useFieldArray({ control, name: 'items' })
  const [current, send] = useMachine(orderFormMachine)
  if (current.matches('fetching')) return <Heading>Loading..</Heading>
  if (current.matches('success')) return <Heading>Form Submitetd!!!</Heading>
  if (current.matches('error')) return <Heading>Error 😥</Heading>
  const onSubmit = (data: FormData) => {
    const supplierId = +getIdfromArray(supplierArray, data.supplier.value)
    const createItems = createItemForMutation(
      data.items,
      supplierId,
      itemsArray,
    )
    send({
      type: EventsEnum.FETCH,
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
        <ItemList {...{ fields, register, remove, items, append }} />
        <Button mb="1">צור הזמנה</Button>
      </Box>
    </FormProvider>
  )
}

export default ReceptionForm
