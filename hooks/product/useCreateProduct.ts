import { ProductInputType } from "@/data/product/types";

export async function useCreateProduct(values:ProductInputType, callback:any){
    const data = {
        "createProductInput": {
          "pro_input_name": values.pro_input_name,
          "seller_id": values.seller_id,
          "short_description":values.short_description,
          "category_id": values.category_id,
          "product_type":values.product_type,
          "brand": values.brand,
          "tags": values.tags.join(','),
          "made_in": values.made_in,
          "video_type":values.video_type,
          "video": values.video,
          "createProductVariantInput": [
            {
              "height": null,
              "attributeReference": null,
              "breadth": null,
              "length": null,
              "price": values.simple_price,
              "productId": null,
              "sku": null,
              "specialPrice": values.simple_special_price,
              "stockStatus": null,
              "totalStock": null,
              "weight": null
            }
          ],
          "download_allowed": null,
          "download_link": null,
          "download_link_type": null,
          "extra_input_description": null,
          "guarantee_period": null,
          "indicator": "NONE",
          "is_cancelable": null,
          "is_returnable": null,
          "minimum_order_quantity": null,
          "other_imagesInput": null,
          "pro_input_description": null,
          "pro_input_image": null,
          "pro_input_video": null,
          "pro_input_zip": null,
          "status": null,
          "quantity_step_size": null,
          "total_allowed_quantity": null,
          "variant_stock_level_type": null,
          "warranty_period": null
        },
      }
    try{
        await callback({variables:data})
    }catch(err){
        console.log(err)
    }
}