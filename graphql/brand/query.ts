import { gql } from '@apollo/client';

export const GET_BRANDS = gql`
  query AdminBrandList($limit: Float!, $offset: Float!) {
    adminBrandList(limit: $limit, offset: $offset) {
      brands {
        _id
        image
        name
      }
      total
    }
  }
`;

export const CREATE_BRAND = gql`
  mutation CreateBrand($createBrandInput: CreateBrandInput!) {
    createBrand(createBrandInput: $createBrandInput) {
      _id
      image
      name
    }
  }
`;
