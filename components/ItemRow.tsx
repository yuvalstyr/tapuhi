import { saleType } from '@prisma/client'
import React from 'react'
import { ArrayField } from 'react-hook-form'
import { MdDelete } from 'react-icons/md'
import { Grid, IconButton, Input } from 'theme-ui'
import Icon from './Icon'
import { Register, Remove } from '../type'

interface IItem {
  name: string
  price: number
  quantity: number
  saleType: saleType
}

export type ItemField = Partial<ArrayField<IItem, 'id'>>

interface IItemProps {
  field: ItemField
  index: number
  register: Register
  remove: Remove
}

export const ItemRow: React.FC<IItemProps> = ({
  field,
  index,
  register,
  remove,
}) => {
  return (
    <React.Fragment>
      <Grid
        columns={4}
        sx={{
          justifyContent: 'space-between',
          gridTemplateColumns: '3fr 1fr 1fr 1fr',
        }}
      >
        <Input
          ref={register()}
          name={`items[${index}].name`}
          defaultValue={field.name}
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
