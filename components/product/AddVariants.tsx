'use client'
import React, { useEffect } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default function AddVariants() {
    const { control } = useForm()
    const { fields, append,remove } = useFieldArray({
        control,
        name: 'varients'
    })

    useEffect(() => {
        append({})
    }, [])

    return (
        <div className="card">
            <Accordion>
                {
                    fields.map((item, index) => (
                        <AccordionTab header={() => (<div className='flex justify-content-between'>
                            <p>Item</p>
                            <Button label='Delete' onClick={()=>remove(index)} severity="danger" outlined/>
                        </div>)}>
                            <div>
                                <div className='flex flex-wrap gap-3'>
                                    <div className='flex-auto'>
                                        <Controller
                                            name={`varients`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber {...field} placeholder='Price' />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-auto'>
                                        <Controller
                                            name={`varients`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber {...field} placeholder='Special Price' />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-auto'>
                                        <Controller
                                            name={`varients`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputText {...field} placeholder='Sku' />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-auto'>
                                        <Controller
                                            name={`varients`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber {...field} placeholder='Total Stock' />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-auto'>
                                        <Controller
                                            name={`varients`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber {...field} placeholder='Stock Status' />
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-wrap gap-3'>
                                    <div className='flex-auto'>
                                        <Controller
                                            name={`varients`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber {...field} placeholder='Price' />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-auto'>
                                        <Controller
                                            name={`varients`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber {...field} placeholder='Special Price' />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-auto'>
                                        <Controller
                                            name={`varients`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber {...field} placeholder='Total Stock' />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-auto'>
                                        <Controller
                                            name={`varients`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber {...field} placeholder='Stock Status' />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </AccordionTab>
                    ))
                }
            </Accordion>
        </div>
    )
}
