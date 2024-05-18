import { ProductInputType } from "@/data/product/types";

export async function useCreateProduct(values: ProductInputType, addtionalInfo: any, attribute: any,createProductVariantInput:any, callback: any) {
  console.log(values)
  try {
    const typeOfProduct = addtionalInfo?.type_of_product
    const data:any = {
      "createProductInput": {
        "pro_input_name": values?.pro_input_name,
        "product_type": "SIMPLE_PRODUCT",
        "short_description": values?.short_description,
        "tags": values?.tags?.join(','),
        "indicator": values?.indicator,
        "brand": values?.brand,
        "made_in": values?.made_in,
        "total_allowed_quantity": values?.total_allowed_quantity,
        "minimum_order_quantity": values?.minimum_order_quantity,
        "quantity_step_size": values?.quantity_step_size,
        "warranty_period": values?.warranty_period,
        "guarantee_period": values?.guarantee_period,
        "is_returnable": values?.is_returnable ? 1 : 0,
        "is_cancelable": values?.is_cancelable ? 1 : 0,
        "seller": values?.seller_id,
        "category": values?.category,
        "video_type": values?.video_type,
        "video": values?.video,
        "other_images": values?.other_images || [],
        "download_allowed": addtionalInfo?.download_allowed ? 1 : 0,
        "download_link": addtionalInfo?.download_link,
        "download_link_type": addtionalInfo?.download_link_type,
        "extra_input_description": values?.extra_input_description,
        "pro_input_description": values?.pro_input_description,
        "pro_input_image": values.pro_input_image,
        "pro_input_video": values?.pro_input_video,
        "pro_input_zip": addtionalInfo?.pro_input_zip,
        "variant_stock_level_type": null,
        attribute_values: attribute?.productAttributes?.map((d:any)=>d?.attribute?.value).join(','),
        createProductVariantInput: []
      },
    }

    if(typeOfProduct === 'digital' || typeOfProduct === 'simple'){
      data.createProductInput.createProductVariantInput = [
        {
          "height": addtionalInfo?.height,
          "attributeReference": attribute?.productAttributes?.map((d: any) => d?.attribute?.value) || null,
          "breadth": addtionalInfo?.breadth,
          "length": addtionalInfo?.length,
          "price": addtionalInfo?.simple_price,
          "productId": null,
          "sku": addtionalInfo?.sku,
          "specialPrice": addtionalInfo.simple_special_price,
          "stockStatus": null,
          "totalStock": null,
          "weight": addtionalInfo?.weight,
          "attributeValues": null,
        }
      ]
    }
    if(typeOfProduct === 'variable'){
      console.log(createProductVariantInput)
      data.createProductInput.createProductVariantInput = createProductVariantInput?.varients?.map((d:any)=>(
        {
          "height": d?.height,
          "attributeReference": attribute?.productAttributes?.map((d: any) => d?.attribute?.value)|| null,
          "attributeValues": d?.id,
          "breadth": d?.breadth,
          "length": d?.length,
          "price": d?.price,
          "sku": d?.sku,
          "specialPrice": d.specialPrice,
          "stockStatus": d.stockStatus?.value,
          "totalStock": d?.totalStock,
          "weight": d?.weight
        }
      ))
    }
    await callback({ variables: data })
  } catch (err) {
    console.log(err)
  }
}