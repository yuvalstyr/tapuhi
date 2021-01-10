import { saleType } from '@prisma/client'
import React from 'react'
import { ArrayField, useFormContext } from 'react-hook-form'
import { MdDelete } from 'react-icons/md'
import { Grid, IconButton, Input } from 'theme-ui'
import { Ioptions, Remove } from '../type'
import Icon from './Icon'
import { Select } from './Select'

interface IField {
  name: string
  price: number
  quantity: number
  saleType: saleType
}

export type ItemField = Partial<ArrayField<IField, 'id'>>

interface IItemProps {
  field: ItemField
  index: number
  remove: Remove
  items: Ioptions[]
}

export const ItemRow: React.FC<IItemProps> = ({
  field,
  index,
  remove,
  items,
}) => {
  const { register, control, errors, getValues } = useFormContext()

  return (
    <React.Fragment>
      <Grid
        columns={4}
        sx={{
          justifyContent: 'space-between',
          gridTemplateColumns: '3fr 1fr 1fr 1fr',
        }}
      >
        <Select
          {...{ items, control, errors, getValues }}
          name={`items[${index}].name`}
          defaultValue={field.name ?? 'd'}
        />

        <Input
          ref={register()}
          name={`items[${index}].quantity`}
          defaultValue={field.quantity}
        />

        <Input
          ref={register()}
          name={`items[${index}].price`}
          defaultValue={field.price}
        />
        <IconButton
          sx={{ color: 'red', alignSelf: 'center', justifySelf: 'center' }}
          onClick={() => remove(index)}
        >
          <Icon size={2}>
            <MdDelete />
          </Icon>
        </IconButton>
      </Grid>
    </React.Fragment>
  )
}
