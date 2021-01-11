import React from 'react'
import { ErrorMessage } from '@hookform/error-message'
import { Text } from 'theme-ui'
import { Errors } from '../type'

interface IFromErrorProps {
  name: string
  errors: Errors
}

function getNumberBetweenBrackets(str: string) {
  const regEx = /^.*?\([^\d]*(\d+)[^\d]*\).*$/
  const result = regEx.exec(str)
  return result?.length ? result[0] : ''
}

const FormError: React.FC<IFromErrorProps> = ({ errors, name }) => {
  if (!errors) return null
  if (!Object.keys(errors).length) return null

  return (
    <Text
      color={'error'}
      sx={{ gridColumn: '1 / span 2', fontSize: 1, fontWeight: 'bold' }}
    >
      {errors[name]?.type == 'validate' ? (
        'שדה חובה'
      ) : (
        <ErrorMessage {...{ errors, name }} />
      )}
    </Text>
  )
}

export default FormError
