import { gql } from '@apollo/client';

export const SALES_REPORT = gql`
  query SalesReport($limit: Float!, $offset: Float!) {
    salesReport(limit: $limit, offset: $offset) {
      orders {
        _id
        product_variants {
          _id
          product {
            _id
            pro_input_name
            seller {
              _id
              name
            }
          }
        }
        created_at
        final_total
        payment_method
      }
      count
    }
  }
`;
