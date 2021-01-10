import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Grid, Heading, Input, Label } from 'theme-ui'
import { Append, Ioptions } from '../type'
import FormError from './FormError'
import { Select } from './Select'

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
    trigger,
    errors,
    reset,
    setValue,
    control,
  } = useForm({
    mode: 'onTouched',
    defaultValues,
  })

  async function onSubmit() {
    const isValid = await trigger(['quantity', 'price', 'name'])
    if (isValid) {
      const data = getValues()
      append({ ...data })
      setValue('name', '')
      await reset(defaultValues)
    }
  }

  return (
    <Grid columns={[1, 2]} sx={{ gridGap: [1, 4] }}>
      <Heading>הוספת מוצר </Heading>
      <Select
        options={items}
        name="name"
        label="פריט"
        control={control}
        errors={errors}
        getValues={getValues}
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
