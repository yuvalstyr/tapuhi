import { Item } from '@prisma/client'
import { useMachine } from '@xstate/react'
import React from 'react'
import { Box, Button, Heading, Spinner } from 'theme-ui'
import { FormMachine } from '../machine/FormMachine'
import { EventsEnum } from '../machine/FormMachine.types'
import { ItemForm } from './ItemForm'

export interface IProps {
  updateItem?: Item
}

export const AdminItem: React.FC<IProps> = ({ updateItem }) => {
  const [current, send] = useMachine(FormMachine)
  if (current.matches('idle'))
    return <ItemForm updateItem={updateItem} send={send} />
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
      <Box>
        <Heading>Error 😥</Heading>
        <Button onClick={() => send(EventsEnum.NEW)}>
          משהו השתבש, ניסיון נוסף?
        </Button>
      </Box>
    )
  return <Heading> Should Not Happend!!!!💩💩💩</Heading>
}

export default AdminItem
