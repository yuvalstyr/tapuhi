import { NextPage } from 'next'
import React from 'react'
import { Link, NavLink } from 'theme-ui'
import prisma from '../lib/prisma'

const index: NextPage = () => {
  return (
    <React.Fragment>
      <NavLink href="/order" p={2}>
        הזמנה חדשה
      </NavLink>
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
