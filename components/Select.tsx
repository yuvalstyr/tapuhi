import React, { CSSProperties } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import ReactSelect from 'react-select'
import { Grid, Label } from 'theme-ui'
import { Control, Errors, GetValues, Ioptions } from '../type'
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
  options: Ioptions[]
  label?: string
  name: string
  errors: Errors
  getValues: GetValues
  control: Control
  defaultValue?: number | string
}

export const Select: React.FC<ISelectProps> = ({
  options,
  label,
  name,
  errors,
  getValues,
  control,
  defaultValue,
}) => {
  const gridTemplateColumns = label ? '1fr 3fr' : '1fr'
  const defaultOption = defaultValue
    ? { value: defaultValue, label: defaultValue }
    : { value: '', label: '' }
  return (
    <Grid columns={2} sx={{ gridTemplateColumns, alignItems: 'center' }}>
      {label && <Label>{label}</Label>}
      <Controller
        inputId="react-select"
        as={ReactSelect}
        options={options}
        name={name}
        defaultValue={defaultOption}
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
