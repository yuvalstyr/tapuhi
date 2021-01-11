import { saleType } from '@prisma/client'
import React from 'react'
import { ArrayField, useFormContext } from 'react-hook-form'
import { MdDelete } from 'react-icons/md'
import { Grid, IconButton, Input } from 'theme-ui'
import { Ioptions, Remove } from '../type'
import FormError from './FormError'
import Icon from './Icon'
import { Select } from './Select'

interface IItem {
  name: { value: string; label: string }
  price: number
  quantity: number
  saleType: saleType
}

export type ItemField = Partial<ArrayField<IItem, 'id'>>

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
  const { control, register, errors, getValues } = useFormContext()
  return (
    <Grid
      columns={4}
      sx={{
        justifyContent: 'space-between',
        gridTemplateColumns: '3fr 1fr 1fr 1fr',
      }}
    >
      <Select
        options={items}
        name={`items[${index}].name`}
        control={control}
        errors={errors}
        getValues={getValues}
        defaultValue={field?.name?.value}
        attachToBodyTrue={true}
      />

      <Input
        ref={register({
          required: { message: 'שדה חובה', value: true },
          pattern: {
            message: 'חייב להיות מספר',
            value: /^[+-]?((\d+(\.\d{1,2})?))$/,
          },
        })}
        name={`items[${index}].quantity`}
        defaultValue={field.quantity}
      />
      <Input
        ref={register({
          required: { message: 'שדה חובה', value: true },
          pattern: {
            message: 'חייב להיות מספר',
            value: /^[+-]?((\d+(\.\d{1,2})?))$/,
          },
        })}
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
  )
}
