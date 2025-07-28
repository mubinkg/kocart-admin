import { gql } from '@apollo/client';

export const CREATE_CITY = gql`
  mutation CreateCity($createCityInput: CreateCityInput!) {
    createCity(createCityInput: $createCityInput) {
      _id
    }
  }
`;

export const ADMIN_CITY_LIST = gql`
  query AdminCityList($limit: Float!, $offset: Float!, $query: String!) {
    adminCityList(limit: $limit, offset: $offset, query: $query) {
      cities {
        _id
        city_name
      }
      count
    }
  }
`;
