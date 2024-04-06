import { gql } from "@apollo/client";

export const GET_BRANDS = gql`query Brands($limit: Float!, $offset: Float!) {
    brands(limit: $limit, offset: $offset) {
      brands {
        _id
      image
      name
      }
      total
    }
  }`

export const CREATE_BRAND = gql`mutation CreateBrand($createBrandInput: CreateBrandInput!) {
    createBrand(createBrandInput: $createBrandInput) {
      _id
      image
      name
    }
  }`