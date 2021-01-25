import { Prisma, Supplier } from '@prisma/client'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Button, Card, Flex, Grid, Heading } from 'theme-ui'
import {
  EventsEnum,
  MutationTypesEnum,
  SubmitEvent,
} from '../machine/FormMachine.types'
import { InputWithError } from './InputWithError'

export interface IProps {
  updateSupplier?: Supplier
  // eslint-disable-next-line no-unused-vars
  send: (event: SubmitEvent) => void
}

type FormData = {
  id: number
  name: string
}

export const SupplierForm: React.FC<IProps> = ({ updateSupplier, send }) => {
  const methods = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: updateSupplier,
  })
  const { handleSubmit, reset, register } = methods

  React.useEffect(() => {
    reset({ ...updateSupplier })
  }, [updateSupplier])

  const mutationType = updateSupplier
    ? MutationTypesEnum.updateSupplier
    : MutationTypesEnum.createSupplier

  const onSubmit = handleSubmit((data) => {
    if (mutationType === MutationTypesEnum.updateSupplier) {
      const prismaData = Object.entries(data).reduce((acc, [key, val]) => {
        if (key == 'id') return { ...acc }
        return { ...acc, [key]: { set: val } }
      }, {} as Omit<Prisma.SupplierUpdateInput, 'id'>)
      const where = { id: +data.id }

      send({
        type: EventsEnum.SUBMIT,
        mutation: { args: { where, data: prismaData }, type: mutationType },
      })
    }
    if (mutationType === MutationTypesEnum.createSupplier) {
      const prismaData = Object.entries(data).reduce((acc, [key, val]) => {
        if (key == 'id') return { ...acc }
        return { ...acc, [key]: { set: val } }
      }, {} as Omit<Prisma.SupplierCreateInput, 'id'>)

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
          <Button sx={{ width: '5rem' }}>
            {updateSupplier ? 'עדכן' : 'צור'}
          </Button>
        </Flex>
        <Grid>
          {updateSupplier && (
            <input style={{ display: 'none' }} ref={register} name="id" />
          )}
          <InputWithError label={'שם'} name="name" />
        </Grid>
      </Card>
    </FormProvider>
  )
}
