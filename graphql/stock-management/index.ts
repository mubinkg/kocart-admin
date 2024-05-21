import { gql } from "@apollo/client";

export const GET_STOCK_LIST = gql`query GetAdminStockList($limit: Float!, $offset: Float!) {
  getAdminStockList(limit: $limit, offset: $offset) {
    count
    stock {
      product {
        _id
        pro_input_name
        pro_input_image
      }
      values {
        _id
        attributeValues {
          valueName
        }
        productType
        stockType
        attributes {
          _id
        }
        breadth
        height
        length
        price
        sku
        specialPrice
        stockStatus
        totalStock
        weight
      }
      productType
      stockType
    }
  }
}`