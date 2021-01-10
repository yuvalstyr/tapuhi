import { Item } from '@prisma/client'
import { ArrayField, useFieldArray, useForm } from 'react-hook-form'

export type Register = ReturnType<typeof useForm>['register']
export type Control = ReturnType<typeof useForm>['control']
export type Errors = ReturnType<typeof useForm>['errors']
export type GetValues = ReturnType<typeof useForm>['getValues']

export type Remove = ReturnType<typeof useFieldArray>['remove']
export type Append = ReturnType<typeof useFieldArray>['append']
export type ItemField = Partial<ArrayField<Item, 'id'>>

export interface Ioptions {
  value: string
  label: string
}
