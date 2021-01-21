/* eslint-disable no-unused-vars */
import { Item, Order, Prisma } from '@prisma/client'
import request from 'graphql-request'
import { assign, Machine } from 'xstate'
import { CREATE_ITEM, CREATE_ORDER, UPDATE_ITEM } from '../lib/gql'
import {
  ICreateOrder,
  OrderFormContext,
  OrderFormSchema,
  OrderFormEvent,
  OrderFormStates,
  SubmitEvent,
  MutationTypesEnum,
} from './FormMachine.types'

function createOrder(variables: ICreateOrder) {
  if (!process.env.API_URL) return Promise.reject('no API URL')
  return request<Order>(process.env.API_URL, CREATE_ORDER, variables)
}

function updateItem(variables: Prisma.ItemUpdateArgs) {
  if (!process.env.API_URL) return Promise.reject('no API URL')
  const { where, data } = variables
  return request<Item>(process.env.API_URL, UPDATE_ITEM, { where, data })
}
function createItem(variables: Prisma.ItemCreateInput) {
  if (!process.env.API_URL) return Promise.reject('no API URL')
  return request<Item>(process.env.API_URL, CREATE_ITEM, { variables })
}

export const FormMachine = Machine<
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
            mutation: (_context, event: SubmitEvent) => event.mutation,
          }),
        },
      },
    },
    [OrderFormStates.submiting]: {
      invoke: {
        id: 'sendForm',
        src: ({ mutation }) => {
          if (mutation.type === MutationTypesEnum.createOrder)
            return createOrder(mutation.data)
          if (mutation.type === MutationTypesEnum.updateItem)
            return updateItem(mutation.args)
          if (mutation.type === MutationTypesEnum.createItem)
            return createItem(mutation.data)
          throw new Error('wrong mutation type')
        },
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
