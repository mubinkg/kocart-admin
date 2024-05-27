export enum SectionStyle{
    DEFAULT = 'default',
    'STYLE_ONE' = 'style 1',
    'STYLE_TWO' = 'style 2',
    'STYLE_THREE' = 'style 3'
}

export enum ProductTypes{
    DIGITAL_PRODUCT = 'DIGITAL_PRODUCT',
    CUSTOM_PRODUCT = 'CUSTOM_PRODUCT'
}

export type SelectType = {
    label: string,
    value: string
}

export type FeaturedSectionType = {
    title:string
    description:string
    categories?:string[]
    style:SelectType
    productType:SelectType
    products:string[]
}