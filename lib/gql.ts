export const CREATE_ORDER = /* GraphQL */ `
  mutation craeteOneVar(
    $date: DateTime!
    $supplierId: Int!
    $items: [OrderItemCreateWithoutOrderInput!]!
  ) {
    createOneOrder(
      data: {
        date: $date
        supplier: { connect: { id: $supplierId } }
        items: { create: $items }
      }
    ) {
      id
    }
  }
`
export const CREATE_ITEM = /* GraphQL */ `
  mutation createItem($variables: ItemCreateInput!) {
    createOneItem(data: $variables) {
      id
    }
  }
`

export const UPDATE_ITEM = /* GraphQL */ `
  mutation updateItem($where: ItemWhereUniqueInput!, $data: ItemUpdateInput!) {
    updateOneItem(where: $where, data: $data) {
      id
    }
  }
`

export const CREATE_SUPPLIER = /* GraphQL */ `
  mutation createItem($variables: SupplierCreateInput!) {
    createOneSupplier(data: $variables) {
      id
    }
  }
`

export const UPDATE_SUPPLIER = /* GraphQL */ `
  mutation updateSupplier(
    $where: SupplierWhereUniqueInput!
    $data: SupplierUpdateInput!
  ) {
    updateOneSupplier(where: $where, data: $data) {
      id
    }
  }
`

export const ITEMS = /* GraphQL */ `
  query items {
    findManyItem(orderBy: { id: asc }) {
      id
      name
      description
      category
      snWebSite
      snHerzelia
      saleType
    }
  }
`

export const SUPLLIERS = /* GraphQL */ `
  query suppliers {
    findManySupplier {
      id
      name
    }
  }
`
