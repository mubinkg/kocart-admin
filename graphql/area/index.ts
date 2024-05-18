import { gql } from "@apollo/client";

export const CREATE_AREA = gql`mutation CreateArea($createAreaInput: CreateAreaInput!) {
    createArea(createAreaInput: $createAreaInput) {
      _id
      area_name
      city_id
      delivery_charges
      minimum_free_delivery_order_amount
    }
  }`

export const GET_ADMIN_AREA_LIST = gql`query GetAdminArea($limit: Float!, $offset: Float!, $query: String!) {
  getAdminArea(limit: $limit, offset: $offset, query: $query) {
    areas {
      _id
      area_name
      city_id
      delivery_charges
      minimum_free_delivery_order_amount
    }
    count
  }
}`