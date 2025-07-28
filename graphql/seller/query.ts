import { gql } from '@apollo/client';

export const GET_SELLET = gql`
  query Sellers($limit: Float!, $offset: Float!) {
    sellers(limit: $limit, offset: $offset) {
      sellers {
        _id
        account_name
        account_number
        address
        address_proof
        bank_code
        bank_name
        business_license
        email
        isAdmin
        mobile
        name
        national_identity_card
        status
      }
      total
    }
  }
`;

export const UPDATE_SELLER = gql`
  mutation UpdateSeller($updateSellerInput: UpdateSellerInput!) {
    updateSeller(updateSellerInput: $updateSellerInput) {
      _id
      status
    }
  }
`;
