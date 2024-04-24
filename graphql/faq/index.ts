import { gql } from "@apollo/client";

export const CREATE_ADMIN_FAQ = gql`mutation CreateAdminFaq($faqAdminInput: FaqAdminInput!) {
    createAdminFaq(faqAdminInput: $faqAdminInput) {
      _id
    }
  }`

export const ADMIN_FAQ_LIST = gql`query AdminFaqList($limit: Float!, $offset: Float!) {
    adminFaqList(limit: $limit, offset: $offset) {
      count
      faqs {
        ans
        product {
          _id
        }
        question
        user {
          _id
          account_name
        }
        _id
      }
    }
  }`