import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`query Transactions($limit: Float!, $offset: Float!) {
    transactions(limit: $limit, offset: $offset) {
      count
      transactionList {
        _id
        amount
        createdAt
        message
        status
        type
        updatedAt
        user {
          _id
          name
        }
      }
    }
  }`