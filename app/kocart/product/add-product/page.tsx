'use client'

import { BreadCrumb } from "primereact/breadcrumb";
import { Card } from "primereact/card";
import { FileUpload } from "primereact/fileupload";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { TabPanel, TabView } from "primereact/tabview";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Select from 'react-select'
import { Editor } from 'primereact/editor';
import { countries, indicatorOptions, items, productType, stockStatusOptions, stockTypeOptions, typeOfDgitalProductOptions, typeOfProductOptions, videoTypeOptions } from "@/data/product/items";
import { OptionType, ProductInputType } from "@/data/product/types";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PRODUCT, GET_SELLER } from "@/graphql/product";
import { Button } from "primereact/button";
import { Chips } from 'primereact/chips';
import { GET_BRANDS } from "@/graphql/brand/query";
import { GET_CATEGORIES } from "@/graphql/category/query";
import { useCreateProduct } from "@/hooks/product/useCreateProduct";
import { useRouter } from "next/navigation";
import { getIsAdmin } from "@/util/storageUtils";
import { InputSwitch } from 'primereact/inputswitch';
import { Checkbox } from "primereact/checkbox";
import AddAttibute from "@/components/product/AddAttribute";
import AddVariants from "@/components/product/AddVariants";



export default function AddProduct() {
    const isAdmin = getIsAdmin()
    const router = useRouter()
    const [attributes, setAttributes] = useState([])
    const [createProductVariantInput, setCreateProductVariantInput] = useState<any>([])
    const { data: sellerList } = useQuery(GET_SELLER, { variables: { limit: 1000, offset: 0, status: "active" }, fetchPolicy: "no-cache" })
    const { data: brandList } = useQuery(GET_BRANDS, { variables: { limit: 1000, offset: 0 }, fetchPolicy: "no-cache" })
    const { data: categoryList } = useQuery(GET_CATEGORIES, {
        variables: {
            "getCategoriesInput": {
                "limit": 1000,
                "offset": 0
            }
        }, fetchPolicy: "no-cache"
    })
    const [createProduct, { loading: createProductLoading }] = useMutation(CREATE_PRODUCT)
    const { register, setValue, watch, handleSubmit } = useForm<ProductInputType>({
        defaultValues: {
            product_type: "PHYSICAL_PRODUCT",
            type_of_product: 'none',
            stock_management: false,
            stockType: 'none',
            isSaveSettings: false
        }
    })
    const mainImageRef = useRef<any>()
    const otherImageRef = useRef<any>()
    const videoRef = useRef<any>()

    const countryOptions = countries.map(c => ({ label: c.name, value: c.code }))

    const submitHandler = async (values: ProductInputType) => {
        try {
            values['pro_input_image'] = mainImageRef.current.getFiles()[0]
            await useCreateProduct(values, createProduct)
            router.push('/kocart/product/product-list')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <BreadCrumb className="m-4" model={items} />
            <Card className="m-4">
                <div className="flex flex-column">
                    <p className="mb-2 font-semibold">Product Name<span className="text-red-500">*</span></p>
                    <InputText {...register('pro_input_name')} className="w-full block" id="username" placeholder="Attribute Name" />
                </div>
                <div className="flex justfy-content-between gap-4">
                    {
                        isAdmin ? (<div className="flex flex-column w-6">
                            <p className="mb-2 font-semibold">Seller<span className="text-red-500">*</span></p>
                            <Select
                                options={
                                    sellerList?.sellers?.sellers?.length ? sellerList.sellers.sellers.map((s: any) => ({ label: s.account_name, value: s._id })) : ""
                                }
                                onChange={(option: any) => { setValue('seller_id', option?.value) }}
                                isClearable
                            />
                        </div>) : ""
                    }
                    <div className="flex flex-column w-6">
                        <p className="mb-2 font-semibold">Product Type<span className="text-red-500">*</span></p>
                        <Select
                            options={productType}
                            onChange={(option: any) => {
                                setValue('product_type', option.value)
                                option.value === 'DIGITAL_PRODUCT' ? setValue('type_of_product', 'digital') : setValue('type_of_product', 'simple')
                            }}
                            defaultValue={productType[1]}
                            isClearable
                        />
                    </div>
                </div>
                <div className="flex flex-column">
                    <p className="mb-2 font-semibold">Short Description<span className="text-red-500">*</span></p>
                    <InputTextarea rows={3} cols={4} {...register('short_description')} className="w-full block" id="username" placeholder="Attribute Name" />
                </div>
                <div className="flex flex-column">
                    <p className="mb-2 font-semibold">Tags  <span className="text-sm">(These tags help you in search result)</span></p>
                    <Chips className="w-full" value={watch('tags')} onChange={(e) => setValue('tags', e?.value || [])} />
                </div>
                <div>
                    <div className="flex flex-wrap justfy-content-between">
                        {
                            watch('product_type') === 'PHYSICAL_PRODUCT' ? (<div className="pr-3 flex flex-column w-3">
                                <p className="mb-2 font-semibold">Indicator</p>
                                <Select options={indicatorOptions} onChange={(value: any) => setValue('indicator', value.value)} />
                            </div>) : ""
                        }
                        <div className="pr-3 flex flex-column w-3">
                            <p className="mb-2 font-semibold">Made In</p>
                            <Select options={countryOptions} onChange={(value: any) => setValue('made_in', value.value)} />
                        </div>
                        <div className="flex flex-column w-3 pr-3">
                            <p className="mb-2 font-semibold">Brand</p>
                            <Select options={brandList?.brands?.brands?.length ? brandList?.brands?.brands.map((d: any) => ({ label: d.name, value: d._id })) : []} onChange={(option: any) => setValue('brand', option.value)} />
                        </div>
                        {
                            watch('product_type') === 'PHYSICAL_PRODUCT' ?
                                (<div className="flex flex-column w-3 pr-3">
                                    <p className="mb-2 font-semibold">Total Allowed Quantity</p>
                                    <InputNumber placeholder="Total Allowed Quantity" style={{ height: "37px" }} value={watch('total_allowed_quantity')} onChange={(e) => setValue('total_allowed_quantity', e?.value || 0)} />
                                </div>) : ""
                        }
                        {
                            watch('product_type') === 'PHYSICAL_PRODUCT' ?
                                (<div className="flex flex-column w-3 pr-3">
                                    <p className="mb-2 font-semibold">Minimum Order Quantity</p>
                                    <InputNumber placeholder="Minimum Order Quantity" style={{ height: "37px" }} value={watch('minimum_order_quantity')} onChange={(e) => setValue('minimum_order_quantity', e?.value || 0)} />
                                </div>) : ""
                        }
                        {
                            watch('product_type') === 'PHYSICAL_PRODUCT' ?
                                (<div className="flex flex-column w-3 pr-3">
                                    <p className="mb-2 font-semibold">Quantity Step Size</p>
                                    <InputNumber placeholder="Quantity Step Size" style={{ height: "37px" }} value={watch('quantity_step_size')} onChange={(e) => setValue('quantity_step_size', e?.value || 0)} />
                                </div>) : ""
                        }
                        {
                            watch('product_type') === 'PHYSICAL_PRODUCT' ?
                                (<div className="flex flex-column w-3 pr-3">
                                    <p className="mb-2 font-semibold">Warranty Period</p>
                                    <InputText placeholder="Warranty period" style={{ height: "37px" }} value={watch('warranty_period')} onChange={(e) => setValue('warranty_period', e.target.value || "")} />
                                </div>) : ""
                        }
                        {
                            watch('product_type') === 'PHYSICAL_PRODUCT' ?
                                (<div className="flex flex-column w-3 pr-3">
                                    <p className="mb-2 font-semibold">Guarantee Period</p>
                                    <InputText placeholder="Warranty period" style={{ height: "37px" }} value={watch('guarantee_period')} onChange={(e) => setValue('guarantee_period', e.target.value || "")} />
                                </div>) : ""
                        }
                        {
                            watch('product_type') === 'PHYSICAL_PRODUCT' ?
                                (<div className="flex flex-column w-3 pr-3">
                                    <p className="mb-2 font-semibold">Is Returnable</p>
                                    <InputSwitch checked={watch('is_returnable') ? true : false} placeholder="Warranty period" onChange={(e) => setValue('is_returnable', e.value)} />
                                </div>) : ""
                        }
                        {
                            watch('product_type') === 'PHYSICAL_PRODUCT' ?
                                (<div className="flex flex-column w-3 pr-3">
                                    <p className="mb-2 font-semibold">Is Cancelable</p>
                                    <InputSwitch checked={watch('is_cancelable') ? true : false} placeholder="Warranty period" onChange={(e) => setValue('is_cancelable', e.value)} />
                                </div>) : ""
                        }
                        <div className="flex flex-column w-3 pr-3">
                            <p className="mb-2 font-semibold">Select Category<span className="text-red-500">*</span></p>
                            <Select options={categoryList?.getAdminCategories?.categories?.length ? categoryList?.getAdminCategories?.categories.map((d: any) => ({ label: d.name, value: d._id })) : []} onChange={(option: any) => setValue('category', option.value)} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-column pr-3">
                    <p className="my-3 font-semibold">Main Image</p>
                    <FileUpload className="w-full" ref={mainImageRef} />
                </div>
                <div className="flex flex-column pr-3">
                    <p className="my-3 font-semibold">Other Image</p>
                    <FileUpload className="w-full" ref={otherImageRef} />
                </div>
                <div className="flex gap-5">
                    <div className="flex flex-column w-6">
                        <p className="my-3 font-semibold">Video Type</p>
                        <Select options={videoTypeOptions} onChange={(value: any) => setValue('video_type', value?.value)} />
                    </div>
                    <div className="w-6">
                        {
                            watch('video_type') === 'SELF_HOSTED' ? (<div className="flex flex-column">
                                <p className="my-3 font-semibold">Video <span className="text-red-500">*</span></p>
                                <FileUpload className="w-full" ref={videoRef} />
                            </div>) : ""
                        }
                        {
                            watch('video_type') === 'YOUTUBE' || watch('video_type') === 'VIMEO' ? (<div className="flex flex-column">
                                <p className="mb-2 font-semibold">Video Link <span className="text-red-500">*</span></p>
                                <InputText {...register('video')} className="w-full block" id="username" placeholder="Paste Youtube or Vimeo video link or url here" />
                            </div>) : ""
                        }
                    </div>
                </div>
                <div className="flex flex-column">
                    <p className="my-3 font-semibold">Additional Info</p>
                    <TabView>
                        <TabPanel header="General">
                            <div className="flex flex-column">
                                <p className="mb-2 font-semibold">Type Of Product :<span className="text-red-500">*</span></p>
                                <Select
                                    options={
                                        watch('product_type') === 'DIGITAL_PRODUCT' ? typeOfDgitalProductOptions : typeOfProductOptions
                                    }
                                    defaultValue={
                                        watch('product_type') === 'DIGITAL_PRODUCT' ? typeOfDgitalProductOptions[0] : typeOfProductOptions[0]
                                    }
                                    onChange={(option: any) => setValue('type_of_product', option?.value)}
                                    isClearable
                                />
                            </div>
                            {
                                watch('type_of_product') === 'simple' ||  watch('type_of_product') === 'digital' ? (<><div className="flex flex-column">
                                    <p className="mb-2 font-semibold">Price<span className="text-red-500">*</span></p>
                                    <InputNumber className="w-full" value={watch('simple_price')} onChange={(e) => setValue('simple_price', e?.value || 0)} />
                                </div>
                                    <div className="flex flex-column">
                                        <p className="mb-2 font-semibold">Special Price</p>
                                        <InputNumber value={watch('simple_special_price')} className="w-full" onChange={(e) => setValue('simple_special_price', e?.value || 0)} />
                                    </div></>) : ""
                            }
                            {
                                watch('product_type') === 'DIGITAL_PRODUCT' ? (<div className="flex flex-column w-3 pr-3">
                                    <p className="mb-2 font-semibold">Is Download allowed?</p>
                                    <InputSwitch checked={watch('download_allowed') ? true : false} placeholder="Warranty period" onChange={(e) => setValue('download_allowed', e.value)} />
                                </div>) : ""
                            }
                            {
                                watch('product_type') === 'PHYSICAL_PRODUCT' && watch('type_of_product') === 'simple' ? (<div className="grid grid-gutter">
                                    <div className="col-3">
                                        <p className="mb-2 font-semibold">Weight (kg)<span className="text-red-500">*</span></p>
                                        <InputNumber placeholder="Weight" className="w-full" value={watch('simple_price')} onChange={(e) => setValue('simple_price', e?.value || 0)} />
                                    </div>
                                    <div className="col-3">
                                        <p className="mb-2 font-semibold">Height (cms)<span className="text-red-500">*</span></p>
                                        <InputNumber placeholder="Height" className="w-full" value={watch('simple_price')} onChange={(e) => setValue('simple_price', e?.value || 0)} />
                                    </div>
                                    <div className="col-3">
                                        <p className="mb-2 font-semibold">Breadth (cms)<span className="text-red-500">*</span></p>
                                        <InputNumber placeholder="Breadth" className="w-full" value={watch('simple_price')} onChange={(e) => setValue('simple_price', e?.value || 0)} />
                                    </div>
                                    <div className="col-3">
                                        <p className="mb-2 font-semibold">Length (kg)<span className="text-red-500">*</span></p>
                                        <InputNumber placeholder="Length" className="w-full" value={watch('simple_price')} onChange={(e) => setValue('simple_price', e?.value || 0)} />
                                    </div>

                                </div>) : ""
                            }
                            {
                                watch('product_type') === 'PHYSICAL_PRODUCT' ? (
                                    <div className="flex align-items-center gap-3 mt-3">
                                        <Checkbox checked={watch('stock_management')} onChange={(e) => setValue('stock_management', e.checked ? true : false)} />
                                        <p>Enable Stock Management</p>
                                    </div>
                                ) : ""
                            }
                            {
                                watch('stock_management') ? (
                                    <div>
                                        <h2>Choose Stock Management</h2>
                                        <div className="flex flex-column">
                                            <p className="mb-2 font-semibold">Type:</p>
                                            <Select
                                                options={
                                                    stockTypeOptions
                                                }
                                                defaultValue={stockTypeOptions[0]}
                                                onChange={(option: any) => setValue('stockType', option.value)}
                                                isClearable
                                            />
                                        </div>
                                        {
                                            watch('stockType') === 'product' ? (<><div className="flex flex-column">
                                                <p className="mb-2 font-semibold">Sku</p>
                                                <InputText value={watch('sku')} className="w-full" onChange={(e) => setValue('sku', e?.target?.value || '')} />
                                            </div>
                                                <div className="flex flex-column">
                                                    <p className="mb-2 font-semibold">Total Stock</p>
                                                    <InputNumber value={watch('totalStock')} className="w-full" onChange={(e) => setValue('totalStock', e?.value || 0)} />
                                                </div>
                                                <div className="flex flex-column">
                                                    <p className="mb-2 font-semibold">Stock Status</p>
                                                    <Select
                                                        options={
                                                            stockStatusOptions
                                                        }
                                                        onChange={(option: any) => setValue('type_of_product', option.value)}
                                                        isClearable
                                                    />
                                                </div></>) : ""
                                        }
                                    </div>
                                ) : ""
                            }
                            <Button onClick={()=>setValue('isSaveSettings', true)} label="Save Settings" className="mt-4" />
                        </TabPanel>
                        <TabPanel header="Attributes" disabled={!watch('isSaveSettings')}>
                            <AddAttibute attributes={attributes} isSaveSettings={watch('isSaveSettings')} setAttributes = {setAttributes}/>
                        </TabPanel>
                        <TabPanel header="Variants" disabled={!watch('isSaveSettings')}>
                            <AddVariants attributes={attributes} createProductVariantInput={createProductVariantInput} setCreateProductVariantInput={setCreateProductVariantInput}/>
                        </TabPanel>
                    </TabView>
                </div>
                <div className="flex flex-column">
                    <p className="my-3 font-semibold">Description</p>
                    <Editor value={watch('pro_input_description')} onTextChange={(e) => setValue('pro_input_description', e.htmlValue)} style={{ height: '320px' }} />
                </div>
                <div className="flex flex-column">
                    <p className="my-3 font-semibold">Extra Description</p>
                    <Editor value={watch('extra_input_description')} onTextChange={(e) => setValue('pro_input_description', e.htmlValue)} style={{ height: '320px' }} />
                </div>
                <Button hidden={createProductLoading} className="mt-4" onClick={handleSubmit(submitHandler)}>
                    {
                        createProductLoading ? "Loading..." : "Submit"
                    }
                </Button>
            </Card>
        </div>
    )
}