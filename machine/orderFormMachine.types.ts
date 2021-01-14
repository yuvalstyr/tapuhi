import { ICreateOrder } from './OrderFormMachine'

export enum OrderFormStates {
  fatching = 'fatching',
  idle = 'idle',
  success = 'success',
  error = 'error',
}

enum orderFormEvents {
  NEW = 'NEW',
  FETCH = 'FETCH',
}

export interface OrderFormSchema {
  states: {
    [OrderFormStates.idle]: { [key: string]: unknown }
    [OrderFormStates.fatching]: { [key: string]: unknown }
    [OrderFormStates.success]: { [key: string]: unknown }
    [OrderFormStates.error]: { [key: string]: unknown }
  }
}

export type OrderFormEvent =
  | { type: orderFormEvents.NEW; workoutId: number }
  | { type: orderFormEvents.FETCH; data: ICreateOrder }
