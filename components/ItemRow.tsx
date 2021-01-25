import { Item, saleType } from '@prisma/client'
import React from 'react'
import { ArrayField, useFormContext } from 'react-hook-form'
import { MdDelete } from 'react-icons/md'
import { Grid, IconButton, Input, Text } from 'theme-ui'
import { Ioptions, Remove } from '../type'
import FormError from './FormError'
import Icon from './Icon'
import { Select } from './Select'
import { getSaleType } from '../lib/utils'

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
  itemsArray: Item[]
}

export const ItemRow: React.FC<IItemProps> = ({
  field,
  index,
  remove,
  items,
  itemsArray,
}) => {
  const { register, errors, watch } = useFormContext()
  const watchName = watch(`items[${index}].name`)
  const saleType = watchName?.value ? getSaleType(itemsArray, watchName) : ''
  return (
    <Grid
      columns={'3fr 1fr 1fr 1fr 1fr'}
      sx={{
        justifyContent: 'space-between',
      }}
    >
      <Select
        options={items}
        name={`items[${index}].name`}
        defaultValue={field?.name?.value}
        attachToBodyTrue={true}
        placeholder={'מוצר'}
      />
      <Grid columns={1} sx={{ alignContent: 'baseline' }}>
        <Input
          ref={register({
            required: { message: 'שדה חובה', value: true },
            pattern: {
              message: 'חייב להיות מספר',
              value: /^[+-]?((\d+(\.\d{1,2})?))$/,
            },
          })}
          placeholder={'כמות'}
          name={`items[${index}].quantity`}
          defaultValue={field.quantity}
        />
        <FormError errors={errors} name={`items[${index}].quantity`} />
      </Grid>
      <Text
        color="primary"
        sx={{
          alignContent: 'baseline',
          justifySelf: 'center',
          fontWeight: 'bold',
          fontSize: 3,
        }}
      >
        {saleType}
      </Text>
      <Grid columns={1} sx={{ alignContent: 'baseline' }}>
        <Input
          ref={register({
            required: { message: 'שדה חובה', value: true },
            pattern: {
              message: 'חייב להיות מספר',
              value: /^[+-]?((\d+(\.\d{1,2})?))$/,
            },
          })}
          placeholder={'מחיר'}
          name={`items[${index}].price`}
          defaultValue={field.price}
        />
        <FormError errors={errors} name={`items[${index}].price`} />
      </Grid>
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
