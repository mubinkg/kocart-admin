import { gql } from '@apollo/client';

export const DASHBOARD_TOP_CONTENT = gql`
  query DashboardTopContent {
    dashboardTopContent {
      totalProduct
      rating
      totalRating
      totalBalance
      totalOrder
    }
  }
`;

export const SELLER_CATEGORY_WISE_PRODUCT = gql`
  query Category {
    sellerCategoryWiseProduct {
      category {
        _id
        name
      }
      count
    }
  }
`;

export const ORDER_OUTLINE = gql`
  query StatusWiseOrderCount {
    statusWiseOrderCount {
      _id
      statusCount
    }
  }
`;
