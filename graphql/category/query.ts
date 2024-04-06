import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`query Categories($getCategoriesInput: GetCategoryDto!) {
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
  }`