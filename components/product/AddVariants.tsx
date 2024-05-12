'use client'
import React, { useEffect } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Select from 'react-select'


const stockOptions = [
    {
        label: 'In Stock',
        value: 1
    },
    {
        label: 'Out of Stock',
        value: 2
    }
]

export default function AddVariants({attributes, createProductVariantInput, setCreateProductVariantInput}:{attributes:any, createProductVariantInput:any,
    setCreateProductVariantInput:any
}) {
    const { control, handleSubmit, setValue } = useForm<any>({defaultValues: {}})
    const { fields, append,remove } = useFieldArray<any>({
        control,
        name: 'varients'
    })

    useEffect(() => {
        function findCombinationsIterative(arrays:any) {
            const results = [[]];
            for (const arr of arrays) {
              const newResults:any = [];
              for (const comb of results) {
                for (const element of arr.attributeValues) {
                    const finalElement = {
                        attribute: arr.attribute.value,
                        attributeValue: element.value,
                        varientName: element.label
                    }
                  const newComb = [...comb, finalElement];
                  newResults.push(newComb);
                }
              }
              results.length = 0;
              results.push(...newResults);
            }
            return results;
        }
        const sortedAttributes = (attributes?.productAttributes?.sort((a:any, b:any) => a.attributeValues
        .length - b.attributeValues
        .length)) || []
        const combinations = findCombinationsIterative(sortedAttributes)
        combinations.forEach((val:any)=>{
            const titles = val?.map((v:any)=>v.varientName)
            const id = val?.map((v:any)=>v.attributeValue).join('')
            append({
                titles:titles,
                id: id,
                price: null,
                specialPrice:null,
                weight: null,
                height: null,
                breadth: null,
                length: null,
                stockStatus: stockOptions[0]
            })
        })
    }, [])

    function submitHandler(values:any){
        setCreateProductVariantInput(values)
    }

    return (
        <div className="card">
            <Button 
                className='mb-4' 
                label='Save Varients'
                onClick={handleSubmit(submitHandler)}
            />
            <Accordion>
                {
                    fields.map((item:any, index:any) => (
                        <AccordionTab key={item.id} header={() => (<div className='flex justify-content-between'>
                            {
                                item['titles'].map((title:string)=>(
                                    <InputText value={title} disabled/>
                                ))
                            }
                            <Button label='Delete' onClick={()=>remove(index)} severity="danger" outlined/>
                        </div>)}>
                            <div>
                                <div className='flex flex-wrap gap-3'>
                                    <div className='flex-auto'>
                                        <Controller
                                            name={`varients.${index}.price`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber 
                                                    value={field.value} 
                                                    onValueChange={(e)=>setValue(`varients.${index}.price`, e.value)} 
                                                    placeholder='Price' 
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-auto'>
                                        <Controller
                                            name={`varients.${index}.specialPrice`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber    
                                                    value={field.value}
                                                    onValueChange={(e)=>setValue(`varients.${index}.specialPrice`, e.value)}
                                                    placeholder='Special Price' 
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-auto'>
                                        <Controller
                                            name={`varients.${index}.sku`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputText {...field} placeholder='Sku' />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-auto'>
                                        <Controller
                                            name={`varients.${index}.totalStock`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber 
                                                    value={field.value} 
                                                    placeholder='Total Stock'
                                                    onValueChange={(e)=>setValue(`varients.${index}.totalStock`, e.value)}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-auto'>
                                        <Controller
                                            name={`varients.${index}.stockStatus`}
                                            control={control}
                                            render={({ field }) => (
                                                <Select {...field} options={stockOptions} />
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-wrap gap-3 mt-4'>
                                    <div className='flex-auto'>
                                        <Controller
                                            name={`varients.${index}.weight`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber 
                                                    value={field.value} 
                                                    onValueChange={(e)=>setValue(`varients.${index}.weight`,e.value)}
                                                    placeholder='Weight' 
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-auto'>
                                        <Controller
                                            name={`varients.${index}.height`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber 
                                                    value={field.value}
                                                    onValueChange={(e)=>setValue(`varients.${index}.height`,e.value)}
                                                    placeholder='Height' 
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-auto'>
                                        <Controller
                                            name={`varients.${index}.breadth`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber
                                                    value = {field.value} 
                                                    onValueChange={(e)=>setValue(`varients.${index}.breadth`,e.value)}
                                                    placeholder='Breadth' 
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-auto'>
                                        <Controller
                                            name={`varients.${index}.length`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber 
                                                    value={field.value} 
                                                    onValueChange={(e)=>setValue(`varients.${index}.length`,e.value)}
                                                    placeholder='Length' 
                                                />
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
