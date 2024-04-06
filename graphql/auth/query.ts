import { gql } from "@apollo/client";

export const REGISTER_SELLER = gql`mutation CreateSeller($createSellerInput: CreateSellerInput!) {
  createSeller(createSellerInput: $createSellerInput) {
    _id
    account_name
    account_number
    address
    address_proof
    bank_code
    bank_name
    email
    business_license
    mobile
    name
    national_identity_card
    password
    status
  }
}`

export const SIGN_IN = gql`query SignIn($signinInput: SignInDto!) {
  signIn(signinInput: $signinInput) {
    access_token
    customer {
      _id
    }
  }
}`

export const SELLER_SIGNIN = gql`mutation SigninSeller($password: String!, $phone: String!) {
  signinSeller(password: $password, phone: $phone) {
    access_token
    seller {
      _id
      account_name
      account_number
      address
      address_proof
      bank_code
      bank_name
      business_license
      email
      isAdmin
      mobile
      name
      national_identity_card
      status
    }
  }
}`