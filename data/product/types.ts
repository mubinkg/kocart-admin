export type ProductInputType = {
    pro_input_name?: string,
    seller_id?: Object
    product_type?: string
    short_description?: string
    tags?:string
    made_in?:string
    brand?: string
    category_id?: string
    video_type?: string
    video?:string
    simple_price:number
    simple_special_price: number
    pro_input_description?:any
    extra_input_description?:any
}

export type OptionType = {
    label: string,
    value: string
}