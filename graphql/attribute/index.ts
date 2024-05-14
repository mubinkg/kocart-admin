import { gql } from "@apollo/client";

export const LOAD_ATTRIBUTE = gql`query GetAllProductAttribute {
  getAllProductAttribute {
    _id
    name
    values {
      _id
      valueName
    }
  }
}`