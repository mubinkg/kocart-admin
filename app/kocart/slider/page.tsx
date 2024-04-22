'use client'

import { SLIDER_CATEGORY, SLIDER_PRODUCT, SLIDER_TYPE } from "@/graphql/slider";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";
import AsyncSelect from 'react-select/async'
import Select from 'react-select'


export default function Page() {
    const {data: slitedTypeList} = useQuery(SLIDER_TYPE)
    const [getSliderProduct] = useLazyQuery(SLIDER_PRODUCT)
    const [getSliderCategory] = useLazyQuery(SLIDER_CATEGORY)
    const sliderImageRef = useRef(null)
    const [sliderType, setSliderType] = useState('')
    const [sliderId, setSliderId] = useState<any>('')
    const [visible, setVisible] = useState(false)
    const [url, setUrl] = useState('')
    const [category, setCategory] = useState('')
    const [product, setProduct] = useState('')

    const loadProductOptions:any = async (val:string, callback:any)=>{
        const data = await getSliderProduct({variables: {query: val}})
        callback(data?.data?.sliderProduct?.map((d:any)=>({label: d?.pro_input_name, value: d?._id})) || [])
    }

    const loadCategoryOptions:any = async (val:string, callback:any)=>{
        const data = await getSliderCategory({variables: {query:val}})
        callback(data?.data?.sliderCategory?.map((d:any)=>({label: d?.name, value: d?._id})) ||[])
    }

    const createCategoryHandler = ()=>{
        
    }

    return (
        <div>
            <h1 className="ml-4 font-light">Slider Image For Add-on Offers and other benefits</h1>
            <Card className="m-4 p-2">
                <Button label="Add New" onClick={()=>setVisible(true)}/>
            </Card>
            <Dialog header='Add new slider image' visible={visible} onHide={() => setVisible(false)}>
                <Card>
                    <div className="flex flex-column">
                        <p className="my-3 font-semibold">Slider Type <span style={{ color: "red" }}>*</span></p>
                        <Select 
                            options={slitedTypeList?.sliderType?.length ?slitedTypeList?.sliderType?.map((d:any)=>({label: d.type, value: d._id, type_id: d.type_id})):[] } 
                            onChange={(val: any) => {
                                setSliderId(val?.type_id)
                                setSliderType(val.value)
                            }} />
                    </div>
                    {
                        sliderId === 2 ? (
                            <div className="flex flex-column">
                                <p className="my-3 font-semibold">Url <span style={{ color: "red" }}>*</span></p>
                                <InputText value={url} onChange={(e)=>setUrl(e.target.value)} className="w-full" ref={sliderImageRef} />
                            </div>
                        ) : ""
                    }
                    {
                        sliderId === 4 ? (
                            <div className="flex flex-column">
                                <p className="my-3 font-semibold">Category <span style={{ color: "red" }}>*</span></p>
                                <AsyncSelect 
                                    className="w-full" 
                                    loadOptions={loadCategoryOptions}
                                    onChange={(value:any)=>setCategory(value.value)}
                                />
                            </div>
                        ) : ""
                    }
                    {
                        sliderId === 3 ? (
                            <div className="flex flex-column">
                                <p className="my-3 font-semibold">Product <span style={{ color: "red" }}>*</span></p>
                                <AsyncSelect 
                                    loadOptions={loadProductOptions}
                                    onChange={(value:any)=>setProduct(value.value)}
                                />
                            </div>
                        ) : ""
                    }
                    <div className="flex flex-column">
                        <p className="my-3 font-semibold">Slider Image <span style={{ color: "red" }}>*</span></p>
                        <FileUpload className="w-full" ref={sliderImageRef} />
                    </div>
                    <Button label="Submit" className="mt-3" onClick={createCategoryHandler}/>
                </Card>
            </Dialog>
        </div>
    )
}