/* eslint-disable no-unused-vars */
import { Prisma } from '@prisma/client'
import { State, StateSchema, Typestate } from 'xstate'

export enum EventsEnum {
  NEW = 'NEW',
  SUBMIT = 'SUBMIT',
}
export enum OrderFormStates {
  submiting = 'submiting',
  idle = 'idle',
  success = 'success',
  error = 'error',
}

export type NewEvent = { type: EventsEnum.NEW }
export type SubmitEvent = { type: EventsEnum.SUBMIT; data: ICreateOrder }

export type OrderFormEvent = NewEvent | SubmitEvent

export type Current = State<
  OrderFormContext,
  OrderFormEvent,
  StateSchema<OrderFormContext>,
  Typestate<OrderFormContext>
>
export interface OrderFormContext {
  data: ICreateOrder
}

export interface ICreateOrder {
  date: Date
  supplierId: number
  items: Prisma.OrderItemCreateWithoutOrderInput[]
}

export type OrderFormSchema = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  states: { [key in OrderFormStates]: {} }
}
