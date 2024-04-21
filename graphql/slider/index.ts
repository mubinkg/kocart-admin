import { gql } from "@apollo/client";

export const SLIDER_TYPE = gql`query SliderType {
    sliderType {
      _id
      type_id
      type
    }
  }`