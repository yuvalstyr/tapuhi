/* eslint-disable no-unused-vars */
import { Order } from '@prisma/client'
import request from 'graphql-request'
import { assign, Machine } from 'xstate'
import { CREATE_ORDER } from '../lib/gql'
import {
  ICreateOrder,
  OrderFormContext,
  OrderFormSchema,
  OrderFormEvent,
  OrderFormStates,
  SubmitEvent,
} from './orderFormMachine.types'

function createOrder(variables: ICreateOrder) {
  if (!process.env.API_URL) return Promise.reject('no API URL')
  return request<Order>(process.env.API_URL, CREATE_ORDER, variables)
}

export const orderFormMachine = Machine<
  OrderFormContext,
  OrderFormSchema,
  OrderFormEvent
>({
  initial: OrderFormStates.idle,
  states: {
    idle: {
      on: {
        SUBMIT: {
          target: OrderFormStates.submiting,
          actions: assign<OrderFormContext, SubmitEvent>({
            data: (_context, event: SubmitEvent) => event.data,
          }),
        },
      },
    },
    submiting: {
      invoke: {
        id: 'sendForm',
        src: (context) => createOrder(context.data),
        onDone: {
          target: OrderFormStates.success,
        },
        onError: {
          target: OrderFormStates.error,
        },
      },
    },
    success: {
      on: {
        NEW: OrderFormStates.idle,
      },
    },
    error: {
      on: {
        NEW: OrderFormStates.idle,
      },
    },
  },
})
