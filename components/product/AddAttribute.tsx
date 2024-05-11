'use client'

import { LOAD_ATTRIBUTE } from "@/graphql/attribute"
import { useLazyQuery } from "@apollo/client"
import { Button } from "primereact/button"
import { useEffect, useState } from "react"
import { useFieldArray, useForm, Controller } from "react-hook-form"
import AsyncSelect from 'react-select/async'
import Select from 'react-select'

export default function AddAttibute({attributes, isSaveSettings, setAttributes }: { isSaveSettings: boolean, setAttributes: any, attributes:any }) {
    const [getAttribute, {data}] = useLazyQuery(LOAD_ATTRIBUTE)
    const [isSave, setIsSave] = useState(false)
    const [attributeValues, setAttributeValues] = useState([])
    const { control, handleSubmit,setValue } = useForm()
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

    const loadAttributeOprions: any = async (val: string, callback: any) => {
        const res = await getAttribute({ variables: { query: val, limit: 10, offset: 0 } })
            callback(res.data?.productAttributes?.attributeList?.map((d: any) => ({ label: d?.name, value: d?._id })) || [])
    }

    function submitHandler(values: any) {
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
                                        <AsyncSelect 
                                            loadOptions={loadAttributeOprions}
                                            {...field}
                                            onChange={(val:any)=>{
                                                setValue(`productAttributes.${index}.attribute`,val);
                                                setAttributeValues(data?.productAttributes?.attributeList.find((el:any)=>el._id === val.value)?.values?.map((d:any)=>({label:d?.valueName, value:d?.id})||[]))
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