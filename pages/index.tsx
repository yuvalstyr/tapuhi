import { NextPage } from 'next'
import React from 'react'
import { NavLink } from 'theme-ui'

const index: NextPage = () => {
  return (
    <React.Fragment>
      <NavLink href="/admin" p={2}>
        הזמנה חדשה
      </NavLink>
    </React.Fragment>
  )
}

export default index
