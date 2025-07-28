import { gql } from '@apollo/client';

export const ADMIN_CUSTOMER_LIST = gql`
  query CustomerAdminList($query: String!, $limit: Float!, $offset: Float!) {
    customerAdminList(query: $query, limit: $limit, offset: $offset) {
      count
      customers {
        _id
        address
        area
        city
        country_code
        dob
        currency
        email
        favourite_k_pop_group
        flavor
        height
        friends_code
        language
        mobile_no
        name
        shoe_size
        status
        username
        weight
      }
    }
  }
`;
