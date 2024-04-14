'use client'

import { BreadCrumb } from "primereact/breadcrumb";
import { Card } from "primereact/card";
import { FileUpload } from "primereact/fileupload";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { TabPanel, TabView } from "primereact/tabview";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import Select from 'react-select'
import { Editor } from 'primereact/editor';
import { countries, items, productType, videoTypeOptions } from "@/data/product/items";
import { OptionType, ProductInputType } from "@/data/product/types";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PRODUCT, GET_SELLER } from "@/graphql/product";
import { Button } from "primereact/button";
import { Chips } from 'primereact/chips';
import { GET_BRANDS } from "@/graphql/brand/query";
import { GET_CATEGORIES } from "@/graphql/category/query";
import { useCreateProduct } from "@/hooks/product/useCreateProduct";


export default function AddProduct() {
    const {data:sellerList} = useQuery(GET_SELLER, {variables: {limit: 1000, offset:0,status: "active"}, fetchPolicy: "no-cache"})
    const {data:brandList} = useQuery(GET_BRANDS, {variables: {limit: 1000, offset: 0}, fetchPolicy: "no-cache"})
    const {data:categoryList} = useQuery(GET_CATEGORIES, {variables: {
        "getCategoriesInput": {
          "limit": 1000,
          "offset": 0
        }
      }, fetchPolicy: "no-cache"})
    const [createProduct, {loading:createProductLoading}] = useMutation(CREATE_PRODUCT)
    const { register, setValue, watch , handleSubmit} = useForm<ProductInputType>()
    const mainImageRef = useRef<any>()
    const otherImageRef = useRef<any>()
    const videoRef = useRef<any>()

    const countryOptions = countries.map(c=>({label:c.name, value: c.code}))

    const submitHandler = async (values:ProductInputType)=>{
        console.log(mainImageRef.current.getFiles()[0])
        values['pro_input_image'] = mainImageRef.current.getFiles()[0]
        useCreateProduct(values, createProduct)
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
                    <div className="flex flex-column w-6">
                        <p className="mb-2 font-semibold">Seller<span className="text-red-500">*</span></p>
                        <Select 
                            options={
                                sellerList?.sellers?.sellers?.length ? sellerList.sellers.sellers.map((s:any)=>({label: s.account_name,  value: s._id})):""
                            } 
                            onChange={(option:OptionType)=>{setValue('seller_id', option.value)}}
                            isClearable
                        />
                    </div>
                    <div className="flex flex-column w-6">
                        <p className="mb-2 font-semibold">Product Type<span className="text-red-500">*</span></p>
                        <Select 
                            options={productType}
                            onChange={(option:OptionType)=>setValue('product_type', option.value)}
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
                    <Chips className="w-full" value={watch('tags')} onChange={(e) => setValue('tags',e.value)} />
                </div>
                <div>
                    <div className="flex justfy-content-between gap-4">
                        <div className="flex flex-column w-3">
                            <p className="mb-2 font-semibold">Made In</p>
                            <Select options={countryOptions} onChange={(value:OptionType)=>setValue('made_in', value.value)} />
                        </div>
                        <div className="flex flex-column w-3">
                            <p className="mb-2 font-semibold">Brand</p>
                            <Select options={brandList?.brands?.brands?.length?brandList?.brands?.brands.map((d:any)=>({label:d.name, value: d._id})):[]} onChange={(option:OptionType)=>setValue('brand', option.value)} />
                        </div>
                        <div className="flex flex-column w-3">
                            <p className="mb-2 font-semibold">Select Category<span className="text-red-500">*</span></p>
                            <Select options={categoryList?.getAdminCategories?.categories?.length?categoryList?.getAdminCategories?.categories.map((d:any)=>({label: d.name, value: d._id})) :[]} onChange={(option:OptionType)=>setValue('category_id', option.value)} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-column">
                    <p className="my-3 font-semibold">Main Image</p>
                    <FileUpload className="w-full" ref={mainImageRef} />
                </div>
                <div className="flex flex-column">
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
                                <p className="mb-2 font-semibold">Price<span className="text-red-500">*</span></p>
                                <InputNumber className="w-full block" value={watch('simple_price')} onChange={(e)=>setValue('simple_price',e.value)} />
                            </div>
                            <div className="flex flex-column">
                                <p className="mb-2 font-semibold">Special Price</p>
                                <InputNumber value={watch('simple_special_price')} className="w-full block" onChange={(e)=>setValue('simple_special_price', e.value)}/>
                            </div>
                        </TabPanel>
                        <TabPanel header="Attributes"></TabPanel>
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
                <Button className="mt-4" onClick={handleSubmit(submitHandler)}>Submit</Button>
            </Card>
        </div>
    )
}