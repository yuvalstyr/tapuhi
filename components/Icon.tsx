import * as React from 'react'
import { IconContext } from 'react-icons/lib'

interface IIconProps {
  size: number
}

const Icon: React.FC<IIconProps> = ({ children, size }) => {
  return (
    <IconContext.Provider value={{ size: `${size}em` }}>
      {children}
    </IconContext.Provider>
  )
}

export default Icon
