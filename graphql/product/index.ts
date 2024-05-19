import { gql } from "@apollo/client";

export const ADD_ATTRIBUTE_SET = gql`mutation CreateProductAttributeSet($createProductAttributeInput: CreateProductAttributeSetInput!) {
    createProductAttributeSet(createProductAttributeInput: $createProductAttributeInput) {
      _id
      attributeSetName
      status
    }
  }`

export const GET_PRODUCT_ATTRIBUTE_SET_LIST = gql`query GetProductAttributeSetList($limit: Float!, $offset: Float!, $query: String!) {
  getProductAttributeSetList(limit: $limit, offset: $offset, query: $query) {
    count
    productAttributeSetList {
      _id
      attributeSetName
      status
    }
  }
}`

export const ADD_ATTRIBUTE = gql`mutation CreateProductAttribute($createProductAttributeInput: CreateProductAttributeInput!) {
  createProductAttribute(createProductAttributeInput: $createProductAttributeInput) {
    _id
  }
}`

export const GET_PORODUCT_ATTRIBUTE_LIST = gql`query ProductAttributes($limit: Float!, $offset: Float!, $query: String) {
  productAttributes(limit: $limit, offset: $offset, query: $query) {
    count
    attributeList {
      _id
      name
      status
      attributeSet {
        attributeSetName
        _id
        status
      }
    }
  }
}`

export const GET_SELLER = gql`query Sellers($limit: Float!, $offset: Float!, $status: String) {
  sellers(limit: $limit, offset: $offset, status: $status) {
    sellers {
      _id
      account_name
    }
  }
}`

export const CREATE_PRODUCT = gql`mutation CreateProduct($createProductInput: CreateProductInput!) {
  createProduct(createProductInput: $createProductInput) {
    _id
  }
}`

export const GET_ADMIN_PRODUCT_LIST = gql`query GetAdminProductList($adminProductListDto: AdminProductListDto!) {
  getAdminProductList(adminProductListDto: $adminProductListDto) {
    count
    products {
      _id
      attributes {
        attribute {
          _id
        }
        values {
          _id
          color
          image
          status
          type
          valueName
        }
      }
      attribute_values
      brand {
        _id
        image
        name
      }
      cancelable_till
      category {
        _id
        banner
        image
        name
        order
        parent
        status
      }
      download_allowed
      download_link
      extra_input_description
      download_link_type
      globalOrderNo
      guarantee_period
      indicator
      is_cancelable
      is_returnable
      made_in
      minimum_order_quantity
      other_images
      pro_input_description
      pro_input_image
      pro_input_name
      pro_input_video
      pro_input_zip
      seller {
        mobile
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
        name
        password
        status
        national_identity_card
      }
      product_type
      quantity_step_size
      short_description
      status
      tags
      tax
      total_allowed_quantity
      video
      video_type
      warranty_period
      productvariants {
        _id
        attributeReference
        attributeValues {
          _id
        }
        attributes {
          _id
        }
        breadth
        height
        length
        price
        product {
          _id
        }
        sku
        specialPrice
        stockStatus
        totalStock
        weight
      }
    }
  }
}`


export const GET_PRODUCT_ATTRIBUTE_VALUE_LIST = gql`query AttributeValues($query: String, $offset: Float!, $limit: Float!) {
  attributeValues(query: $query, offset: $offset, limit: $limit) {
    count
    values {
      _id
      color
      image
      productAttribute {
        _id
        name
      }
      status
      type
      valueName
    }
  }
}`