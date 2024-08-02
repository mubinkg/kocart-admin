'use client'

import { LOAD_ATTRIBUTE } from "@/graphql/attribute"
import { useQuery } from "@apollo/client"
import { Button } from "primereact/button"
import { useEffect, useState } from "react"
import { useFieldArray, useForm, Controller } from "react-hook-form"
import Select from 'react-select'

export default function AddAttibute({attributes, isSaveSettings, setAttributes }: { isSaveSettings: boolean, setAttributes: any, attributes:any }) {
    const {data} = useQuery(LOAD_ATTRIBUTE)
    const [isSave, setIsSave] = useState(false)
    const [attributeValues, setAttributeValues] = useState([])
    const { control, handleSubmit,setValue, reset } = useForm()
    const { append, remove, fields } = useFieldArray({
        control,
        name: 'productAttributes'
    })

    useEffect(()=>{
        attributes?.productAttributes?.forEach((val:any)=>{
            append({
                attribute: val.attribute,
                attributeValues: val.attributeValues
            })
        })
    },[])

    function submitHandler(values: any) {
        console.log('Attribute value list: ', values)
        setAttributes(values)
        setIsSave(true)
    }

    return (
        <div>
            <div className="flex justify-content-end">
                {
                    fields.length ? (<Button className="mr-3" label="Save Attribute" onClick={handleSubmit(submitHandler)} outlined />) : ""
                }
                <Button label="Add Attribute" onClick={() => append({ attribute: "", attributeValues: [] })} outlined />
            </div>
            <div>
                {
                    fields.map((item, index) => (
                        <div key={item.id} className="flex mt-4 align-items-center">
                            <div className="w-5 mr-2">
                                <Controller
                                    name={`productAttributes.${index}.attribute`}
                                    control={control}
                                    render={({ field }) => (
                                        <Select 
                                            options={data?.getAllProductAttribute?.length ? data.getAllProductAttribute.map((d:any)=>({label:d.name, value: d._id})):[]}
                                            {...field}
                                            onChange={(val:any)=>{
                                                setValue(`productAttributes.${index}.attribute`,val);
                                                setAttributeValues(data?.getAllProductAttribute?.find((el:any)=>el._id === val.value)?.values?.map((d:any)=>({label:d?.valueName, value:d?._id})||[]))
                                            }}
                                            placeholder='Type to search and select attributes' 
                                        />
                                    )}
                                />
                            </div>
                            <div className="w-5 ml-2">
                                <Controller
                                    name={`productAttributes.${index}.attributeValues`}
                                    control={control}
                                    render={({ field }) => (
                                        <Select 
                                            options={attributeValues}
                                            isSearchable 
                                            isClearable 
                                            isMulti
                                            {...field}  
                                            placeholder='Type to search and select attributes values' 
                                        />
                                    )}
                                />
                            </div>
                            <div className="w-2 ml-2">
                                <Button severity="danger" outlined style={{ height: "40px" }} label="Remove" onClick={() => remove(index)} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}