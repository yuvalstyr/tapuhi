import { NextPage } from 'next'
import React from 'react'
<<<<<<< HEAD
import ReceptionForm from '../components/ReceptionForm'
import dynamic from 'next/dynamic'
const NoSSRComponent = dynamic(() => import('../components/ReceptionForm'), {
  ssr: false,
})

interface sessionProps {
  user: User
  initailSessionStatus: string
}
=======
import { NavLink } from 'theme-ui'
import prisma from '../lib/prisma'
>>>>>>> paljs

const index: NextPage = () => {
  return (
    <React.Fragment>
<<<<<<< HEAD
      <NoSSRComponent />
=======
      <NavLink href="/admin" p={2}>
        הזמנה חדשה
      </NavLink>
>>>>>>> paljs
    </React.Fragment>
  )
}

export async function getServerSideProps() {
  const results = await Promise.all([
    prisma.item.findMany(),
    prisma.supplier.findMany(),
  ])
  prisma.$disconnect()
  return {
    props: {
      items: results[0],
      suppliers: results[1],
    },
  }
}

export default index
