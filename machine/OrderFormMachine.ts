/* eslint-disable no-unused-vars */
import { Order, Prisma } from '@prisma/client'
import request from 'graphql-request'
import { CREATE_ORDER } from '../lib/gql'
import { Machine, assign } from 'xstate'

export interface ICreateOrder {
  date: Date
  supplierId: number
  items: Prisma.OrderItemCreateWithoutOrderInput[]
}
export enum OrderFormStates {
  fetching = 'fetching',
  idle = 'idle',
  success = 'success',
  error = 'error',
}

export enum EventsEnum {
  NEW = 'NEW',
  FETCH = 'FETCH',
}

export type OrderFormSchema = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  states: { [key in OrderFormStates]: {} }
}

export type OrderFormEvent = NewEvent | FetchEvent

type NewEvent = { type: EventsEnum.NEW }
type FetchEvent = { type: EventsEnum.FETCH; data: ICreateOrder }

export interface OrderFormContext {
  data: ICreateOrder
}

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
        FETCH: {
          target: 'fetching',
          actions: assign<OrderFormContext, FetchEvent>({
            data: (_context, event: FetchEvent) => event.data,
          }),
        },
      },
    },
    fetching: {
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
        NEW: 'idle',
      },
    },
    error: {
      on: {
        NEW: 'idle',
      },
    },
  },
})
