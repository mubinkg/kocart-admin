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