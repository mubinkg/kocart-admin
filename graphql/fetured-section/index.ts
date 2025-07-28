import { gql } from '@apollo/client';

export const GET_ALL_CATEGORY = gql`
  query GetAllCategory {
    getAllCategory {
      _id
      name
    }
  }
`;

export const GET_PRODUCT_FOR_FEATURED_SECTION = gql`
  query GetProductsForFeaturedSections(
    $adminFeaturedSectionProductFilterInput: AdminFeaturedSectionProductFilterInput!
  ) {
    getProductsForFeaturedSections(
      adminFeaturedSectionProductFilterInput: $adminFeaturedSectionProductFilterInput
    ) {
      _id
      pro_input_name
    }
  }
`;

export const CREATE_FEATURED_SECTION = gql`
  mutation CreateSection($createSectionInput: CreateSectionInput!) {
    createSection(createSectionInput: $createSectionInput) {
      _id
    }
  }
`;

export const GET_ADMIN_SECTIONS = gql`
  query GetAdminSetions($limit: Float!, $offset: Float!, $query: String!) {
    getAdminSetions(limit: $limit, offset: $offset, query: $query) {
      count
      sections {
        _id
        categories
        createdAt
        description
        order
        productType
        products {
          _id
        }
        style
        title
      }
    }
  }
`;
