import { he } from 'date-fns/locale'
import React from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { Controller, useFormContext } from 'react-hook-form'
import { Box, Grid, Heading, Input, Label } from 'theme-ui'
import { isSSR } from '../lib/isSSR'
import { Ioptions } from '../type'
import FormError from './FormError'
import { Select } from './Select'

interface IProps {
  items: Ioptions[]
}

export const OrderDetails: React.FC<IProps> = ({ items }) => {
  const { control, errors, register, getValues } = useFormContext()
  registerLocale('he', he)
  return (
    <Grid columns={[1, 2]} sx={{ gridGap: [1, 4] }}>
      <Heading>פרטי הזמנה</Heading>

      <Select
        {...{ items, control, errors, getValues }}
        name="supplier"
        label="ספק"
        defaultValue=""
      />

      <Grid sx={{ gridTemplateColumns: '1fr 3fr', alignItems: 'center' }}>
        <Label>תאריך</Label>
        <Box
          sx={{
            '.react-datepicker-wrapper': {
              width: '100%',
              backgroundColor: 'white',
            },
          }}
        >
          <Controller
            control={control}
            name="date"
            rules={{ required: 'שדה חובה' }}
            render={({ value, onChange }) => (
              <DatePicker
                selected={value}
                dateFormat="dd-MM-yy"
                locale="he"
                onChange={onChange}
                placeholderText="Select date"
                customInput={<Input />}
              />
            )}
          />
          <FormError errors={errors} name="date" />
        </Box>
      </Grid>
      <Grid
        columns={2}
        sx={{ gridTemplateColumns: '1fr 3fr', alignItems: 'center' }}
      >
        <Label>מספר תעודה</Label>
        <Input
          ref={register({ required: { value: true, message: 'שדה חובה' } })}
          name="orderNumber"
          placeholder="מספר תעודה"
        />
        <FormError errors={errors} name="orderNumber" />
      </Grid>
    </Grid>
  )
}
