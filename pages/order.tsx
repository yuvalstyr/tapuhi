import { useMachine } from '@xstate/react'
import { EventsEnum } from '../machine/orderFormMachine.types'
import { NextPage } from 'next'
import React from 'react'
import { Button, Heading, Spinner } from 'theme-ui'
import ReceptionForm, { FormProps } from '../components/ReceptionForm'
import prisma from '../lib/prisma'
import { orderFormMachine } from '../machine/OrderFormMachine'
import { inspect } from '@xstate/inspect'

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  inspect({
    iframe: false,
  })
}

export async function getServerSideProps() {
  const results = await Promise.all([
    prisma.item.findMany(),
    prisma.supplier.findMany(),
  ])
  prisma.$disconnect()
  return {
    props: {
      items: results[0],
      suppliers: results[1],
    },
  }
}

const Order: NextPage<FormProps> = ({ items, suppliers }) => {
  const doDev = process.env.NODE_ENV === 'development'
  const [current, send] = useMachine(orderFormMachine, { devTools: doDev })
  if (current.matches('idle'))
    return <ReceptionForm items={items} suppliers={suppliers} send={send} />
  if (current.matches('submiting'))
    return <Spinner size={96} strokeWidth={6} sx={{ alignSelf: 'center' }} />
  if (current.matches('success'))
    return (
      <React.Fragment>
        <Heading>Form Submitetd!!!</Heading>
        <Button onClick={() => send(EventsEnum.NEW)}>הזמנה נוספת?</Button>
      </React.Fragment>
    )
  if (current.matches('error'))
    return (
      <React.Fragment>
        <Heading>Error 😥</Heading>
        <Button onClick={() => send(EventsEnum.NEW)}>
          משהו השתבש, ניסיון נוסף?
        </Button>
      </React.Fragment>
    )
  return <Heading> Should Not Happend!!!!💩💩💩</Heading>
}

export default Order
