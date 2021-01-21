import { Item, Prisma } from '@prisma/client'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Button, Card, Flex, Grid, Heading, Text } from 'theme-ui'
import { saleTypeTranslate, translateSaleTypeHebToEng } from '../lib/utils'
import {
  EventsEnum,
  MutationTypesEnum,
  SubmitEvent,
} from '../machine/FormMachine.types'
import { Ioptions } from '../type'
import { InputWithError } from './InputWithError'
import { Select } from './Select'

export interface IProps {
  updateItem?: Item
  // eslint-disable-next-line no-unused-vars
  send: (event: SubmitEvent) => void
}

type FormData = {
  id: string
  name: string
  description: string
  category: string
  snWebSite: string | null
  snHerzelia: string | null
  saleType: Ioptions
}

export function convetItemToDefaultValues(item?: Item) {
  if (!item) return {}
  const saleType = saleTypeTranslate[item.saleType]
  return { ...item, saleType: { label: saleType, value: saleType } }
}

export const ItemForm: React.FC<IProps> = ({ updateItem, send }) => {
  const defaultValues = convetItemToDefaultValues(updateItem)
  const methods = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues,
  })
  const { handleSubmit, reset, register } = methods

  React.useEffect(() => {
    reset({ ...convetItemToDefaultValues(updateItem) })
  }, [updateItem])

  const mutationType = updateItem
    ? MutationTypesEnum.updateItem
    : MutationTypesEnum.createItem

  const onSubmit = handleSubmit((data) => {
    const saleType = translateSaleTypeHebToEng(data.saleType.value)

    if (mutationType === MutationTypesEnum.updateItem) {
      const prismaData = Object.entries(data).reduce((acc, [key, val]) => {
        const value = key === 'saleType' ? saleType : val
        return { ...acc, [key]: { set: value } }
      }, {} as Prisma.ItemUpdateInput)
      const where = { id: data.id }
      delete prismaData.id
      send({
        type: EventsEnum.SUBMIT,
        mutation: { args: { where, data: prismaData }, type: mutationType },
      })
    }
    if (mutationType === MutationTypesEnum.createItem) {
      const prismaData = Object.entries(data).reduce((acc, [key, val]) => {
        const value = key === 'saleType' ? saleType : val
        return { ...acc, [key]: value }
      }, {} as Prisma.ItemCreateInput)
      send({
        type: EventsEnum.SUBMIT,
        mutation: { type: mutationType, data: prismaData },
      })
    }
  })

  return (
    <FormProvider {...methods}>
      <Card as="form" onSubmit={onSubmit}>
        <Flex mb={2}>
          <Heading sx={{ flexGrow: 1 }}>פריט חדש</Heading>
          <Button sx={{ width: '5rem' }}>{updateItem ? 'עדכן' : 'צור'}</Button>
        </Flex>
        <Grid>
          {updateItem && (
            <input style={{ display: 'none' }} ref={register} name="id" />
          )}
          <InputWithError label={'שם'} name="name" />
          <InputWithError label={'תיאור'} name={'description'} />
          <InputWithError label={'קטגוריה'} name={'category'} />
          <InputWithError
            label={`מק"ט`}
            name={'snWebSite'}
            disableRequire={true}
          />
          <InputWithError
            label={`מק"ט הרצליה`}
            name={'snHerzelia'}
            disableRequire={true}
          />
          <Grid columns={2}>
            <Text>צורת מכירה</Text>
            <Select
              name="saleType"
              options={Object.values(saleTypeTranslate).map((s) => ({
                label: s ?? '',
                value: s ?? '',
              }))}
              placeholder="צורת מכירה"
            />
          </Grid>
        </Grid>
      </Card>
    </FormProvider>
  )
}
