'use client'

import { BreadCrumb } from "primereact/breadcrumb";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useForm } from "react-hook-form";
import Select from 'react-select'


export default function AddProduct() {
    const { register } = useForm()
    const items = [
        { label: 'Product' },
        { label: 'Add Product' }
    ];
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
    return (
        <div>
            <BreadCrumb className="m-4" model={items} />
            <Card className="m-4">
                <div className="flex flex-column">
                    <p className="mb-2 font-semibold">Product Name<span className="text-red-500">*</span></p>
                    <InputText {...register('name')} className="w-full block" id="username" placeholder="Attribute Name" />
                </div>
                <div className="flex justfy-content-between gap-4">
                    <div className="flex flex-column w-6">
                        <p className="mb-2 font-semibold">Seller<span className="text-red-500">*</span></p>
                        <Select options={options} />
                    </div>
                    <div className="flex flex-column w-6">
                        <p className="mb-2 font-semibold">Product Type<span className="text-red-500">*</span></p>
                        <Select options={options} />
                    </div>
                </div>
                <div className="flex flex-column">
                    <p className="mb-2 font-semibold">Product Name<span className="text-red-500">*</span></p>
                    <InputTextarea rows={3} cols={4} {...register('name')} className="w-full block" id="username" placeholder="Attribute Name" />
                </div>
                <div className="flex flex-column">
                        <p className="mb-2 font-semibold">Tags  <span className="text-sm">(These tags help you in search result)</span></p>
                        <Select  isMulti/>
                </div>
                <div>
                <div className="flex justfy-content-between gap-4">
                    <div className="flex flex-column w-3">
                        <p className="mb-2 font-semibold">Made In</p>
                        <Select options={options} />
                    </div>
                    <div className="flex flex-column w-3">
                        <p className="mb-2 font-semibold">Brand</p>
                        <Select options={options} />
                    </div>
                    <div className="flex flex-column w-3">
                        <p className="mb-2 font-semibold">Select Category<span className="text-red-500">*</span></p>
                        <Select options={options} />
                    </div>
                </div>
                </div>
            </Card>
        </div>
    )
}