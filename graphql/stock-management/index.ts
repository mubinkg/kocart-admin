import { gql } from "@apollo/client";

export const GET_STOCK_LIST = gql`query ProductVariants {
    productVariants {
      _id
      attributeReference
      attributeValues
      attributes {
        color
        id
        image
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
      }
      sku
      specialPrice
      stockStatus
      totalStock
      weight
    }
  }`