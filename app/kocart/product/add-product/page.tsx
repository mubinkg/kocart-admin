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


export default function AddProduct() {
    const { register, setValue, watch } = useForm()
    const mainImageRef = useRef<any>()
    const otherImageRef = useRef<any>()
    const items = [
        { label: 'Product' },
        { label: 'Add Product' }
    ];
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    const videoTypeOptions = [
        {
            label: 'None', value: 'none'
        },
        {
            label: 'Self Hosted', value: 'self_hosted'
        },
        {
            label: 'Yoututbe', value: 'youtube'
        },
        {
            label: 'Vimeo', value: 'vimeo'
        }
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
                    <Select isMulti />
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
                        <Select options={videoTypeOptions} onChange={(value: any) => setValue('videoType', value?.value)} />
                    </div>
                    <div className="w-6">
                        {
                            watch('videoType') === 'self_hosted' ? (<div className="flex flex-column">
                                <p className="my-3 font-semibold">Video <span className="text-red-500">*</span></p>
                                <FileUpload className="w-full" ref={otherImageRef} />
                            </div>) : ""
                        }
                        {
                            watch('videoType') === 'youtube' || watch('videoType') === 'vimeo' ? (<div className="flex flex-column">
                                <p className="mb-2 font-semibold">Video Link <span className="text-red-500">*</span></p>
                                <InputText {...register('name')} className="w-full block" id="username" placeholder="Paste Youtube or Vimeo video link or url here" />
                            </div>) : ""
                        }
                    </div>
                </div>
                <div className="flex flex-column">
                    <p className="my-3 font-semibold">Additional Info</p>
                    <TabView>
                        <TabPanel header="General">
                            <div className="flex flex-column">
                                <p className="mb-2 font-semibold">Product Name<span className="text-red-500">*</span></p>
                                <InputNumber className="w-full block" />
                            </div>
                            <div className="flex flex-column">
                                <p className="mb-2 font-semibold">Product Name<span className="text-red-500">*</span></p>
                                <InputNumber className="w-full block" />
                            </div>
                        </TabPanel>
                        <TabPanel header="Attributes"></TabPanel>
                    </TabView>
                </div>
                <div className="flex flex-column">
                    <p className="my-3 font-semibold">Description</p>
                    <Editor value={watch('text')} onTextChange={(e) => setValue('text', e.htmlValue)} style={{ height: '320px' }} />
                </div>
                <div className="flex flex-column">
                    <p className="my-3 font-semibold">Extra Description</p>
                    <Editor value={watch('text')} onTextChange={(e) => setValue('text', e.htmlValue)} style={{ height: '320px' }} />
                </div>
            </Card>
        </div>
    )
}