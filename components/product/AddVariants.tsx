'use client'
import React, { useEffect } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default function AddVariants({attributes}:{attributes:any}) {
    const { control } = useForm<any>()
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
                  const newComb = [...comb, finalElement]; // Create a new combination using spread operator
                  newResults.push(newComb);
                }
              }
              results.length = 0; // Clear existing combinations to create new ones with each sub-array
              results.push(...newResults); // Efficiently add all new combinations
            }
            return results;
        }
        const sortedAttributes = (attributes?.productAttributes?.sort((a:any, b:any) => a.attributeValues
        .length - b.attributeValues
        .length))
        const combinations = findCombinationsIterative(sortedAttributes)
        combinations.forEach((val:any)=>{
            const titles = val?.map((v:any)=>v.varientName)
            const id = val?.map((v:any)=>v.attributeValue).join('')
            append({
                titles:titles,
                id: id
            })
        })
    }, [])

    return (
        <div className="card">
            <Button className='mb-4' label='Save Varients'/>
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
                                                <InputNumber {...field} placeholder='Price' />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-auto'>
                                        <Controller
                                            name={`varients.${index}.specialPrice`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber {...field} placeholder='Special Price' />
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
                                                <InputNumber {...field} placeholder='Total Stock' />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-auto'>
                                        <Controller
                                            name={`varients.${index}.stockStatus`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber {...field} placeholder='Stock Status' />
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-wrap gap-3 mt-4'>
                                    <div className='flex-auto'>
                                        <Controller
                                            name={`varients.${index}.wight`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber {...field} placeholder='Weight' />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-auto'>
                                        <Controller
                                            name={`varients.${index}.height`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber {...field} placeholder='Height' />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-auto'>
                                        <Controller
                                            name={`varients.${index}.breadth`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber {...field} placeholder='Breadth' />
                                            )}
                                        />
                                    </div>
                                    <div className='flex-auto'>
                                        <Controller
                                            name={`varients.${index}.length`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputNumber {...field} placeholder='Length' />
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
