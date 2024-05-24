import { gql } from "@apollo/client";

export const DASHBOARD_TOP_CONTENT = gql`query DashboardTopContent {
    dashboardTopContent {
      totalProduct
      rating
      totalRating
      totalBalance
      totalOrder
    }
  }`