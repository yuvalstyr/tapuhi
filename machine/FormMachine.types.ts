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

export enum MutationTypesEnum {
  createOrder = 'createOrder',
  updateItem = 'updateItem',
  createItem = 'createItem',
}

export type createOrder = {
  type: MutationTypesEnum.createOrder
  data: ICreateOrder
}
export type updateItem = {
  type: MutationTypesEnum.updateItem
  args: Prisma.ItemUpdateArgs
}

export type createItem = {
  type: MutationTypesEnum.createItem
  data: Prisma.ItemCreateInput
}

export type MutationsType = createOrder | updateItem | createItem

export type NewEvent = { type: EventsEnum.NEW }

export type SubmitEvent = {
  type: EventsEnum.SUBMIT
  mutation: MutationsType
}

export type OrderFormEvent = NewEvent | SubmitEvent

export type Current = State<
  OrderFormContext,
  OrderFormEvent,
  StateSchema<OrderFormContext>,
  Typestate<OrderFormContext>
>
export interface OrderFormContext {
  mutation: MutationsType
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
