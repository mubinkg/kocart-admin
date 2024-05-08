'use client'

import { Button } from 'primereact/button'
import { ColorPicker } from 'primereact/colorpicker';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import React from 'react'
import { useFieldArray, useForm, Controller } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid';

const Attribute = ({ handleAddAttribute }: any) => {
    const { control, register, handleSubmit, watch, setValue, reset } = useForm()
    const { fields, append, remove } = useFieldArray<any>({
        control,
        name: 'attribute'
    })

    const cities = ['DEFAULT', 'COLOR', 'IMAGE'];

    const submitHandler = (value: any) => {
        let values = []
        if (value?.data) {
            values = value.data.map((v: any) => ({
                valueName: v?.attributeName || "",
                image: v?.image || null,
                color: v?.color || null,
                type: v?.attributeType || 'DEFAULT'
            }))
            handleAddAttribute(values, reset)
        } else {

        }
    }

    return (
        <div className="flex flex-column gap-4">
            <div className="flex mt-4 gap-4">
                <p className="mb-2 font-semibold">Attribute Values<span style={{ color: 'red' }}>*</span></p>
                <Button label="Attribute Value" onClick={()=>append({attributeName:"",attributeType:cities[0],image: "",color:""})} />
            </div>
            <div className='flex flex-column gap-5'>
                {fields.map((field, index) => (
                    <div key={uuidv4()} className='flex gap-5'>
                        <div className='flex flex-column w-5'>
                            <label className='mb-2'>Attribute Name</label>
                            <Controller
                                name={`attribute.${index}.attributeName`}
                                control={control}
                                render={({ field }) => (
                                    <InputText
                                        {...field}
                                    />
                                )}
                            />
                        </div>
                        <div className='flex flex-column w-5'>
                            <label className='mb-2'>Attribute Type</label>
                            <Controller
                                control={control}
                                name={`attribute.${index}.attributeType`}
                                render={({ field }) => (
                                    <Dropdown
                                        {...field}
                                        defaultValue={cities[0]}
                                        options={cities}
                                    />
                                )}
                            />
                            {
                                watch(`attribute.${index}.attributeType`) === 'IMAGE' ?
                                    <Controller
                                        name={`attribute.${index}.image`}
                                        control={control}
                                        render={({field})=>(
                                            <FileUpload {...field}/>
                                        )}
                                    />
                                    : ""
                            }
                            {
                                (watch(`attribute.${index}.attributeType`)) === 'COLOR' ?
                                    <Controller
                                        control={control}
                                        name={`attribute.${index}.color`}
                                        render={({ field }) => (
                                            <ColorPicker
                                                className='mt-2'
                                                format='hex'
                                                {...field}
                                            />
                                        )}
                                    />

                                    : ""
                            }
                        </div>
                        <Button onClick={() => remove(index)} icon='pi pi-times' className='mt-4' style={{ height: "50px" }} />
                    </div>
                ))}
            </div>
            <Button onClick={handleSubmit(submitHandler)} label='Submit' />
        </div>
    )
}

export default Attribute