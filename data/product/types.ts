export type ProductInputType = {
    pro_input_name?: string,
    seller_id?: Object
    product_type?: string
    short_description?: string
    tags:string[]
    made_in?:string
    brand?: string
    category?: string
    video_type?: string
    video?:string
    simple_price:number
    simple_special_price: number
    pro_input_description?:any
    extra_input_description?:any
    pro_input_image?: any,
    indicator?: string,
    total_allowed_quantity?:number,
    minimum_order_quantity?: number,
    quantity_step_size?: number,
    warranty_period?:string,
    guarantee_period?: string,
    is_returnable?:boolean,
    is_cancelable?: boolean
    download_allowed?:boolean
    type_of_product: string
}

export type OptionType = {
    label: string,
    value: string
}