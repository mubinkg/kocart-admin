import { gql } from "@apollo/client";

export const GET_ALL_CATEGORY = gql`query GetAllCategory {
    getAllCategory {
      _id
      name
    }
  }`