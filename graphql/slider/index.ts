import { gql } from "@apollo/client";

export const SLIDER_TYPE = gql`query SliderType {
    sliderType {
      _id
      type_id
      type
    }
  }`

export const SLIDER_PRODUCT = gql`query SliderProduct($query: String!) {
  sliderProduct(query: $query) {
    _id
    pro_input_name
  }
}`

export const SLIDER_CATEGORY = gql`query SliderCategory($query: String!) {
  sliderCategory(query: $query) {
    _id
    name
  }
}`

export const CREATE_SLIDER = gql`mutation CreateSlider($createSliderInput: CreateSliderInput!) {
  createSlider(createSliderInput: $createSliderInput) {
    _id
  }
}`

export const GET_SLIDER_LIST = gql`query AdminSliderList($limit: Float!, $offset: Float!, $type: String) {
  adminSliderList(limit: $limit, offset: $offset, type: $type) {
    count
    sliders {
      _id
      slider_type {
        _id
        type
        type_id
      }
      type
      image
      link
      category
      product
    }
  }
}`