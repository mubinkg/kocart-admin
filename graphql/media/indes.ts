import { gql } from "@apollo/client";

export const CREATE_MEDIA = gql`mutation CreateMedia($createMediaInput: CreateMediaInput!) {
    createMedia(createMediaInput: $createMediaInput) {
      _id
    }
  }`