import { gql } from "@apollo/client";

export const GET_STOCK_LIST = gql`query ProductVariants($limit: Float!, $offset: Float!, $query: String) {
  productVariants(limit: $limit, offset: $offset, query: $query) {
    count
    productVariants {
      _id
      attributeReference
      attributeValues
      attributes {
        color
        id
        image
        status
        type
        valueName
      }
      breadth
      height
      length
      price
      product {
        _id
        pro_input_name
        pro_input_image
      }
      sku
      specialPrice
      stockStatus
      totalStock
      weight
    }
  }
}`