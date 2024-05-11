import { gql } from "@apollo/client";

export const LOAD_ATTRIBUTE = gql`query ProductAttributes($limit: Float!, $offset: Float!, $query: String) {
    productAttributes(limit: $limit, offset: $offset, query: $query) {
      attributeList {
        _id
        name
        values {
          color
          id
          image
          type
          valueName
        }
      }
      count
    }
  }`