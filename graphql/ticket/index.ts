import { gql } from "@apollo/client";

export const GET_TICKET_TYPES = gql`query GetAdminTicketTypes($limit: Float!, $offset: Float!) {
    getAdminTicketTypes(limit: $limit, offset: $offset) {
      count
      ticketTypes {
        _id
        title
      }
    }
  }`

export const CREATE_TICKET_TYPE = gql`mutation CreateTicketType($createTicketTypeInput: CereateTicketTypeInput!) {
    createTicketType(createTicketTypeInput: $createTicketTypeInput) {
      _id
      title
    }
  }`

export const DELETE_TICKET_TYPE = gql`mutation DeleteTicketType($deleteTicketTypeId: String!) {
  deleteTicketType(id: $deleteTicketTypeId) {
    _id
    title
  }
}`

export const UPDATE_TICKET_TYPE = gql`mutation UpdateTicketType($updateTicketTypeInput: UpdateTicketType!) {
  updateTicketType(updateTicketTypeInput: $updateTicketTypeInput) {
    _id
  }
}`