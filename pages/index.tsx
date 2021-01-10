import prisma from '../lib/prisma'
import { NextPage } from 'next'
import React from 'react'
import ReceptionForm from '../components/ReceptionForm'
import { Item, Supplier } from '@prisma/client'

export interface FormProps {
  items: Item[]
  suppliers: Supplier[]
}

const index: NextPage<FormProps> = ({ items, suppliers }) => {
  return (
    <React.Fragment>
      <ReceptionForm items={items} suppliers={suppliers} />
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
