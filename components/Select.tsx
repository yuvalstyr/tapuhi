import React, { CSSProperties } from 'react'
import { Control, Controller } from 'react-hook-form'
import ReactSelect from 'react-select'
import { Grid, Label } from 'theme-ui'
import { Ioptions, Errors, GetValues } from '../type'
import FormError from './FormError'

export const reactSelectStyles = {
  container: (provided: CSSProperties) => ({
    ...provided,
    height: '100%',
    flexGrow: 1,
  }),
  control: (provided: CSSProperties, state: any) => {
    return {
      ...provided,
      border: 'solid 1px #F5F5F5',
      height: '100%',
      boxShadow: state.menuIsOpen ? '0 0 0 3px #92C03E' : 0,
    }
  },
}

interface ISelectProps {
  control: Control
  items: Ioptions[]
  label: string
  name: string
  errors: Errors
  getValues: GetValues
}

export const Select: React.FC<ISelectProps> = ({
  control,
  items,
  label,
  name,
  errors,
  getValues,
}) => {
  return (
    <Grid
      columns={2}
      sx={{ gridTemplateColumns: '1fr 3fr', alignItems: 'center' }}
    >
      <Label>{label}</Label>
      <Controller
        inputId="react-select"
        as={ReactSelect}
        options={items}
        name={name}
        isClearable
        control={control}
        rules={{
          validate: () => (getValues(name)?.value ? true : false),
        }}
      />

      <FormError name={name} errors={errors} />
    </Grid>
  )
}
