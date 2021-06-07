import { useMachine } from '@xstate/react'
import { EventsEnum } from '../machine/FormMachine.types'
import { NextPage } from 'next'
import React from 'react'
import { Box, Button, Heading, Spinner } from 'theme-ui'
import ReceptionForm, { FormProps } from '../components/ReceptionForm'
import prisma from '../lib/prisma'
import { FormMachine } from '../machine/FormMachine'
import { inspect } from '@xstate/inspect'
import useSWR from 'swr'
import { Item, Supplier } from '.prisma/client'
import { ITEMS, SUPLLIERS } from '../lib/gql'
import { fetcher } from './admin'

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  inspect({
    iframe: false,
  })
}

const Order: NextPage<FormProps> = () => {
  const { data: itemsData } = useSWR<{ ['findManyItem']: Item[] }, any>(
    ITEMS,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  )
  const { data: suppliersData } = useSWR<
    { ['findManySupplier']: Supplier[] },
    any
  >(SUPLLIERS, fetcher, {
    revalidateOnFocus: false,
  })
  const items = itemsData?.findManyItem
  const suppliers = suppliersData?.findManySupplier
  // const doDev = process.env.NODE_ENV === 'development'
  const [current, send] = useMachine(FormMachine)
  if (!items || !suppliers)
    return <Spinner size={96} strokeWidth={6} sx={{ alignSelf: 'center' }} />
  if (current.matches('idle'))
    return <ReceptionForm items={items} suppliers={suppliers} send={send} />
  if (current.matches('submiting'))
    return <Spinner size={96} strokeWidth={6} sx={{ alignSelf: 'center' }} />
  if (current.matches('success'))
    return (
      <React.Fragment>
        <Heading>Form Submitted!!!</Heading>
        <Button onClick={() => send(EventsEnum.NEW)}>הזמנה נוספת?</Button>
      </React.Fragment>
    )
  if (current.matches('error'))
    return (
      <Box>
        <Heading>Error 😥</Heading>
        <Button onClick={() => send(EventsEnum.NEW)}>
          משהו השתבש, ניסיון נוסף?
        </Button>
      </Box>
    )
  return <Heading> Should Not Happend!!!!💩💩💩</Heading>
}

export default Order
