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
