import prisma from '../lib/prisma'
import { NextPage } from 'next'
import React from 'react'
import { Item, Supplier } from '@prisma/client'
import Admin from '../components/Admin'

export interface AdminProps {
  items: Item[]
  suppliers: Supplier[]
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

const admin: NextPage<AdminProps> = ({ items, suppliers }) => {
  return <Admin items={items} suppliers={suppliers} />
}

export default admin
