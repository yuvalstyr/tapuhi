import { User } from '@prisma/client'
import { NextPage } from 'next'
import React from 'react'
import ReceptionForm from '../components/ReceptionForm'

interface sessionProps {
  user: User
  initailSessionStatus: string
}

const index: NextPage = () => {
  return (
    <React.Fragment>
      <ReceptionForm />
    </React.Fragment>
  )
}

export default index
