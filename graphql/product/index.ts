import { gql } from "@apollo/client";

export const ADD_ATTRIBUTE_SET = gql`mutation CreateProductAttributeSet($createProductAttributeInput: CreateProductAttributeSetInput!) {
    createProductAttributeSet(createProductAttributeInput: $createProductAttributeInput) {
      _id
      attributeSetName
      status
    }
  }`

export const GET_PRODUCT_ATTRIBUTE_LIST = gql`query GetProductAttributeSetList($limit: Float!, $offset: Float!, $query: String!) {
  getProductAttributeSetList(limit: $limit, offset: $offset, query: $query) {
    count
    productAttributeSetList {
      _id
      attributeSetName
      status
    }
  }
}`