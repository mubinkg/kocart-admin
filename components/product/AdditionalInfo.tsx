'use client'
import { stockStatusOptions, stockTypeOptions, typeOfDgitalProductOptions, typeOfProductOptions } from '@/data/product/items'
import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { FileUpload } from 'primereact/fileupload'
import { InputNumber } from 'primereact/inputnumber'
import { InputSwitch } from 'primereact/inputswitch'
import { InputText } from 'primereact/inputtext'
import { useEffect, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'

const downloadLinkTypeOptions = [
    {
        label: 'None',
        value: "none"
    },
    {
        label: "Self Hosted",
        value: 'self_hosted'
    },
    {
        label: 'Add Link',
        value: 'add_link'
    }
]

export default function AdditionalInfo({ productType, additionalInfo, setAdditionalInfo, setSaveSettings }: { productType: any, additionalInfo: any, setAdditionalInfo: any, setSaveSettings: any }) {

    const uploadedProductRef = useRef<any>(null)
    const { setValue, watch, handleSubmit } = useForm()

    function submitHandler(values: any) {
        values['pro_input_zip'] = uploadedProductRef?.current?.getFiles() ? uploadedProductRef?.current?.getFiles()[0] : null
        setAdditionalInfo(values)
        setSaveSettings(false)
    }

    useEffect(() => {
        for (const [key, value] of Object.entries(additionalInfo)) {
            setValue(key, value)
        }
    }, [])

    return (
        <div>
            <div className="flex flex-column">
                <p className="mb-2 font-semibold">Type Of Product :<span className="text-red-500">*</span></p>
                <Select
                    options={
                        productType === 'DIGITAL_PRODUCT' ? typeOfDgitalProductOptions : typeOfProductOptions
                    }
                    defaultValue={
                        productType === 'DIGITAL_PRODUCT' ? typeOfDgitalProductOptions[0] : typeOfProductOptions[0]
                    }
                    onChange={(option: any) => setValue('type_of_product', option?.value)}
                    isClearable
                />
            </div>
            {
                watch('type_of_product') === 'simple' || watch('type_of_product') === 'digital' ? (<><div className="flex flex-column">
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
                watch('type_of_product') === 'simple' || watch('type_of_product') === 'digital' ? (<div className="flex flex-wrap">
                    <div className="w-3 pr-4">
                        <p className="mb-2 font-semibold">Weight (kg)<span className="text-red-500">*</span></p>
                        <InputNumber placeholder="Weight" className="w-full" value={watch('weight')} onChange={(e) => setValue('weight', e?.value || 0)} />
                    </div>
                    <div className="w-3 pr-4">
                        <p className="mb-2 font-semibold">Height (cms)<span className="text-red-500">*</span></p>
                        <InputNumber placeholder="Height" className="w-full" value={watch('height')} onChange={(e) => setValue('height', e?.value || 0)} />
                    </div>
                    <div className="w-3 pr-4">
                        <p className="mb-2 font-semibold">Breadth (cms)<span className="text-red-500">*</span></p>
                        <InputNumber placeholder="Breadth" className="w-full" value={watch('breadth')} onChange={(e) => setValue('breadth', e?.value || 0)} />
                    </div>
                    <div className="w-3">
                        <p className="mb-2 font-semibold">Length (kg)<span className="text-red-500">*</span></p>
                        <InputNumber placeholder="Length" className="w-full" value={watch('length')} onChange={(e) => setValue('length', e?.value || 0)} />
                    </div>
                </div>) : ""
            }
            {
                watch('type_of_product') === 'digital' ? (
                    <div className="flex align-items-start gap-4 mt-3">
                        <div>
                            <p>Is Download Allowed?</p>
                            <Checkbox checked={watch('download_allowed')} onChange={(e) => setValue('download_allowed', e.checked ? true : false)} />
                        </div>
                        {
                            watch('download_allowed') === true ?
                                (
                                    <div className='w-3'>
                                        <p>Download Link Type *</p>
                                        <Select
                                            name='download_link_type'
                                            options={downloadLinkTypeOptions}
                                            defaultValue={downloadLinkTypeOptions[0]}
                                            onChange={(e) => setValue('download_link_type', e?.value)}
                                        />

                                    </div>
                                )
                                : ""
                        }
                        {
                            watch('download_link_type') === 'self_hosted' ? (
                                <div>
                                    <p>File</p>
                                    <FileUpload ref={uploadedProductRef} />
                                </div>) : ""
                        }
                        {
                            watch('download_link_type') === 'add_link' ?
                                (
                                    <div>
                                        <p>Digital Product Link *</p>
                                        <InputText style={{ height: "40px" }} />
                                    </div>
                                ) : ""
                        }
                    </div>
                ) : ""
            }
            {
                productType === 'PHYSICAL_PRODUCT' ? (
                    <div className="flex align-items-center gap-3 mt-3">
                        <Checkbox checked={watch('stock_management')} onChange={(e) => setValue('stock_management', e.checked ? true : false)} />
                        <p>Enable Stock Management</p>
                    </div>
                ) : ""
            }
            {
                watch('stock_management') === true && watch('type_of_product') === 'variable' ? (
                    <div>
                        <h2>Choose Stock Management</h2>
                        <div className="flex flex-column">
                            <p className="mb-2 font-semibold">Type:</p>
                            <Select
                                options={stockTypeOptions}
                                defaultValue={stockTypeOptions[0]}
                                onChange={(option: any) => setValue('stockType', option.value)}
                                isClearable
                            />
                        </div>
                    </div>
                ) : ""
            }
            {
                watch('stockType') === 'product' || (watch('type_of_product') === 'simple' && watch('stock_management') === true) ? (<><div className="flex flex-column">
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
            <Button onClick={handleSubmit(submitHandler)} label="Save Settings" className="mt-4" />
        </div>
    )
}