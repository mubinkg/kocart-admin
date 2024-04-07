import { gql } from "@apollo/client";

export const ADD_ATTRIBUTE_SET = gql`mutation CreateProductAttributeSet($createProductAttributeInput: CreateProductAttributeSetInput!) {
    createProductAttributeSet(createProductAttributeInput: $createProductAttributeInput) {
      _id
      attributeSetName
      status
    }
  }`