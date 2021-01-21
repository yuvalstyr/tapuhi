import gql from 'graphql-tag'

export const CREATE_ORDER = gql`
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
export const CREATE_ITEM = gql`
  mutation createItem($variables: ItemCreateInput!) {
    createOneItem(data: $variables) {
      id
    }
  }
`

export const UPDATE_ITEM = gql`
  mutation updateItem($where: ItemWhereUniqueInput!, $data: ItemUpdateInput!) {
    updateOneItem(where: $where, data: $data) {
      id
    }
  }
`
