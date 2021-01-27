import { Item, Supplier } from '@prisma/client'
import { request } from 'graphql-request'
import { NextPage } from 'next'
import React from 'react'
import Admin from '../components/Admin'
import { ITEMS, SUPLLIERS } from '../lib/gql'

export const fetcher = (query: string) => {
  if (process.env.API_URL) {
    return request(process.env.API_URL, query)
  }
  throw new Error('no api url provided')
}

export interface AdminProps {
  items: Item[]
  suppliers: Supplier[]
}

export async function getServerSideProps() {
  const { findManyItem: items } = await fetcher(ITEMS)
  const { findManySupplier: suppliers } = await fetcher(SUPLLIERS)
  return {
    props: {
      items,
      suppliers,
    },
  }
}

const admin: NextPage<AdminProps> = ({ items, suppliers }) => {
  return <Admin items={items} suppliers={suppliers} />
}

export default admin
