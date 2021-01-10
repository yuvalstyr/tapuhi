import React, { CSSProperties } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import ReactSelect from 'react-select'
import { Grid, Label } from 'theme-ui'
import { Ioptions } from '../type'
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
  items: Ioptions[]
  label: string
  name: string
}

export const Select: React.FC<ISelectProps> = ({ items, label, name }) => {
  const { errors, getValues, control } = useFormContext()
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
