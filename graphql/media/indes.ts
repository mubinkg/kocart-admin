import { gql } from "@apollo/client";

export const CREATE_MEDIA = gql`mutation CreateMedia($createMediaInput: CreateMediaInput!) {
    createMedia(createMediaInput: $createMediaInput) {
      _id
    }
  }`

export const GET_MEDIA = gql`query AdminMedia($limit: Float!, $offset: Float!, $query: String) {
  adminMedia(limit: $limit, offset: $offset, query: $query) {
    count
    media {
      _id
      name
      extension
      file
      size
      subDirectory
      type
    }
  }
}`

export const DELETE_MEDIA = gql`mutation RemoveMedia($removeMediaId: String!) {
  removeMedia(id: $removeMediaId) {
    _id
  }
}`