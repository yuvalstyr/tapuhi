/* eslint-disable no-unused-vars */
import { Item, Order, Prisma, Supplier } from '@prisma/client'
import request from 'graphql-request'
import { mutate } from 'swr'
import { assign, Machine } from 'xstate'
import {
  CREATE_ITEM,
  CREATE_ORDER,
  CREATE_SUPPLIER,
  ITEMS,
  UPDATE_ITEM,
  UPDATE_SUPPLIER,
} from '../lib/gql'
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
function createSupplier(variables: Prisma.SupplierCreateInput) {
  if (!process.env.API_URL) return Promise.reject('no API URL')
  return request<Supplier>(process.env.API_URL, CREATE_SUPPLIER, { variables })
}
function updateSupplier(variables: Prisma.SupplierUpdateArgs) {
  if (!process.env.API_URL) return Promise.reject('no API URL')
  const { where, data } = variables
  return request<Supplier>(process.env.API_URL, UPDATE_SUPPLIER, {
    where,
    data,
  })
}

export const FormMachine = Machine<
  OrderFormContext,
  OrderFormSchema,
  OrderFormEvent
>(
  {
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
            if (mutation.type === MutationTypesEnum.updateSupplier)
              return updateSupplier(mutation.args)
            if (mutation.type === MutationTypesEnum.createSupplier)
              return createSupplier(mutation.data)
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
          NEW: {
            target: OrderFormStates.idle,
            actions: ['mutate'],
          },
        },
      },
      error: {
        on: {
          NEW: OrderFormStates.idle,
        },
      },
    },
  },
  {
    actions: {
      mutate: () => {
        mutate(ITEMS)
      },
    },
  },
)
