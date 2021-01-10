import { User } from '@prisma/client'
import { NextPage } from 'next'
import React from 'react'
import ReceptionForm from '../components/ReceptionForm'
import dynamic from 'next/dynamic'
const NoSSRComponent = dynamic(() => import('../components/ReceptionForm'), {
  ssr: false,
})

interface sessionProps {
  user: User
  initailSessionStatus: string
}

const index: NextPage = () => {
  return (
    <React.Fragment>
      <NoSSRComponent />
    </React.Fragment>
  )
}

export default index
