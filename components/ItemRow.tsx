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

interface AddItemProps {
  items: Ioptions[]
  append: Append
}

const defaultValues = {
  name: { value: '', label: '' },
  price: '',
  quantity: '',
}

export const AddItem: React.FC<AddItemProps> = ({ items, append }) => {
  const {
    register,
    getValues,
    control,
    trigger,
    errors,
    reset,
    setValue,
    formState,
  } = useForm({
    mode: 'onTouched',
    defaultValues,
  })

  async function onSubmit() {
    const isValid = await trigger(['quantity', 'price', 'name'])
    if (isValid) {
      const data = getValues()
      append({ ...data, name: data.name.value })
      setValue('name', '')
      await reset(defaultValues)
    }
  }

  return (
    <Grid columns={[1, 2]} sx={{ gridGap: [1, 4] }}>
      <Heading>הוספת מוצר </Heading>
      <Select
        {...{ items, control, errors, getValues }}
        name="name"
        label="פריט"
      />
      <Grid
        columns={2}
        sx={{ gridTemplateColumns: '1fr 3fr', alignItems: 'center' }}
      >
        <Label>כמות</Label>
        <Input
          name="quantity"
          placeholder="כמות"
          ref={register({
            required: { message: 'שדה חובה', value: true },
            pattern: {
              message: 'חייב להיות מספר',
              value: /^[+-]?((\d+(\.\d{1,2})?))$/,
            },
          })}
        />
        <FormError name="quantity" errors={errors} />
      </Grid>
      <Grid
        columns={2}
        sx={{ gridTemplateColumns: '1fr 3fr', alignItems: 'center' }}
      >
        <Label sx={{ fontSize: 2 }}>מחיר</Label>
        <Input
          name="price"
          defaultValue=""
          ref={register({
            required: { message: 'שדה חובה', value: true },
            pattern: {
              message: 'חייב להיות מספר',
              value: /^[+-]?((\d+(\.\d{1,2})?))$/,
            },
          })}
        />
        <FormError name="price" errors={errors} />
      </Grid>
      <Button
        type="button"
        sx={{ justifySelf: 'center' }}
        onClick={() => onSubmit()}
      >
        הוסף
      </Button>
    </Grid>
  )
}
