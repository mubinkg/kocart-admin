'use client'

import { Button } from 'primereact/button'
import { ColorPicker } from 'primereact/colorpicker';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid';


const Attribute = ({handleAddAttribute}:any) => {
    const { control, register, handleSubmit , watch, setValue, reset} = useForm()
    const { fields, append, remove } = useFieldArray<any>({
        control,
        name: 'attribute'
    })

    const cities = ['DEFAULT', 'COLOR', 'IMAGE'];

    const submitHandler = (value: any) => {
        let values = []
        if(value?.data){
            values = value.data.map((v:any)=>({
                valueName: v?.attributeName || "",
                image: v?.image || null,
                color: v?.color || null,
                type: v?.attributeType || 'DEFAULT'
            }))
            handleAddAttribute(values, reset)
        }else{

        }
    }

    return (
        <div className="flex flex-column gap-4">
            <div className="flex mt-4 gap-4">
                <p className="mb-2 font-semibold">Attribute Values<span style={{ color: 'red' }}>*</span></p>
                <Button label="Attribute Value" onClick={append} />
            </div>
            <div className='flex flex-column gap-5'>
                {fields.map((field, index) => (
                    <div key={uuidv4()} className='flex gap-5'>
                        <div className='flex flex-column w-5'>
                            <label className='mb-2'>Attribute Name</label>
                            <InputText
                                key={uuidv4()} // important to include key with field's id
                                {...register(`data.${index}.attributeName`)}
                            />
                        </div>
                        <div className='flex flex-column w-5'>
                            <label className='mb-2'>Attribute Type</label>
                            <Dropdown 
                                key={uuidv4()}
                                value={watch(`data.${index}.attributeType`) || "DEFAULT"}
                                onChange={(e)=>setValue(`data.${index}.attributeType`,e.target.value)}
                                options={cities}
                            />
                            {
                                watch(`data.${index}.attributeType`) === 'IMAGE'? 
                                <input
                                    className='mt-2' 
                                    type='file'
                                    {...register(`data.${index}.image`)}
                                />
                                : ""
                            }
                            {
                                (watch(`data.${index}.attributeType`)) === 'COLOR'? 
                                <ColorPicker 
                                    className='mt-2'
                                    format='hex' 
                                    value={watch(`data.${index}.color`)}
                                    onChange={(e)=>setValue(`data.${index}.color`, e.target.value)}
                                />
                                :""
                            }
                        </div>
                        <Button onClick={()=>remove()} icon='pi pi-times' className='mt-4' style={{height: "50px"}}/>
                    </div>
                ))}
            </div>
            <Button onClick={handleSubmit(submitHandler)} label='Submit' />
        </div>
    )
}

export default Attribute