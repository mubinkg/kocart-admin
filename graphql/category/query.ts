import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query Categories($getCategoriesInput: GetCategoryDto!) {
    getAdminCategories(getCategoriesInput: $getCategoriesInput) {
      categories {
        _id
        banner
        image
        name
        order
        parent
        status
      }
      count
    }
  }
`;

export const CREATE_CATEGROY = gql`
  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      _id
      banner
      image
      name
      order
      parent
      status
    }
  }
`;
