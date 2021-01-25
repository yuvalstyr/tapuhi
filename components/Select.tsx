import React, { CSSProperties } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import ReactSelect from 'react-select'
import { Grid, Label } from 'theme-ui'
<<<<<<< HEAD
import { isSSR } from '../lib/isSSR'
import { Ioptions, Errors, GetValues } from '../type'
=======
import { Ioptions } from '../type'
>>>>>>> paljs
import FormError from './FormError'

interface ISelectProps {
  options: Ioptions[]
  label?: string
  name: string
  defaultValue?: number | string
  attachToBodyTrue?: boolean
  placeholder: string
}

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
  menu: () => {
    return { zindex: '999', position: 'absolute' }
  },
}

<<<<<<< HEAD
interface ISelectProps {
  control: Control
  items: Ioptions[]
  label?: string
  name: string
  errors: Errors
  getValues: GetValues
  defaultValue: string
}

=======
>>>>>>> paljs
export const Select: React.FC<ISelectProps> = ({
  options,
  label,
  name,
<<<<<<< HEAD
  errors,
  getValues,
  defaultValue,
}) => {
  const gridTemplateColumns = label ? '1fr 3fr' : '1fr'

  return (
    <Grid columns={2} sx={{ gridTemplateColumns, alignItems: 'center' }}>
=======
  defaultValue,
  attachToBodyTrue,
  placeholder,
}) => {
  const { errors, getValues, control } = useFormContext()
  const gridTemplateColumns = label ? '1fr 3fr' : '1fr'
  const defaultOption = defaultValue
    ? { value: defaultValue, label: defaultValue }
    : { value: '', label: '' }

  return (
    <Grid columns={2} sx={{ gridTemplateColumns, alignContent: 'baseline' }}>
>>>>>>> paljs
      {label && <Label>{label}</Label>}

      <Controller
        inputId="react-select"
        as={<ReactSelect />}
        options={options}
        name={name}
<<<<<<< HEAD
        control={control}
        isClearable={label ? true : false}
        defaultValue={{ value: defaultValue, label: defaultValue }}
        menuPlacement={'auto'}
        menuPosition="absolute"
        menuPortalTarget={document.body}
=======
        menuPlacement={'auto'}
        menuPosition="absolute"
        defaultValue={defaultOption}
        menuPortalTarget={attachToBodyTrue ? document.body : ''}
        isClearable
        control={control}
        placeholder={placeholder}
>>>>>>> paljs
        rules={{
          validate: () => (getValues(name)?.value ? true : false),
        }}
      />

      <FormError errors={errors} name={name} />
    </Grid>
  )
}
