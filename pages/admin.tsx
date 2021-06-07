import { Item, Supplier } from '@prisma/client'
import { Spinner } from '@theme-ui/components'
import { request } from 'graphql-request'
import { NextPage } from 'next'
import React from 'react'
import useSWR from 'swr'
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

const admin: NextPage<AdminProps> = () => {
  const { data: itemsData } = useSWR<{ ['findManyItem']: Item[] }, any>(
    ITEMS,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  )
  const { data: suppliersData } = useSWR<
    { ['findManySupplier']: Supplier[] },
    any
  >(SUPLLIERS, fetcher, {
    revalidateOnFocus: false,
  })
  const items = itemsData?.findManyItem
  const suppliers = suppliersData?.findManySupplier
  if (!items || !suppliers)
    return <Spinner size={96} strokeWidth={6} sx={{ alignSelf: 'center' }} />
  return <Admin items={items} suppliers={suppliers} />
}

export default admin
