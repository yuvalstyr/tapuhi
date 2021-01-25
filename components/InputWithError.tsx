import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Grid, Input, Text } from 'theme-ui'
import FormError from './FormError'

interface IInputProps {
  name: string
  label: string
  disableRequire?: boolean
}
export const InputWithError: React.FC<IInputProps> = ({
  name,
  label,
  disableRequire,
}) => {
  const { register, errors } = useFormContext()
  const isRequire = disableRequire ? false : true
  return (
    <Grid columns={2}>
      <Text>{label}</Text>
      <Input
        name={name}
        ref={register({
          required: { message: 'שדה חובה', value: isRequire },
        })}
      />
      <FormError errors={errors} name={name} />
    </Grid>
  )
}
