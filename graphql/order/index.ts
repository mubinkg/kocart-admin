import { gql } from "@apollo/client";

export const GET_ORDER_LIST = gql`query GetAdminOrderList($adminOrderListInput: GetAdminOrderInput!) {
    getAdminOrderList(adminOrderListInput: $adminOrderListInput) {
      count
      orders {
        _id
        user {
          _id
          name
        }
        product_variants {
          product {
            seller {
              name
              _id
            }
            _id
          }
          _id
        }
        order_note
        total
        delivery_charge
        wallet_balance_used
        promo_discount
        promo_code
        final_total
        mobile
        is_wallet_used
        payment_method
        created_at
      }
    }
  }`

export const GET_ORDER_DETIALS = gql`query Order($orderId: String!) {
  order(orderId: $orderId) {
    _id
    user {
      _id
      name
    }
    total
    delivery_charge
    promo_discount
    payment_method
    address {
      address
      _id
    }
    created_at
    email
    mobile
  }
}`