import { Button } from "primereact/button"
import { useFieldArray, useForm, Controller } from "react-hook-form"
import Select from 'react-select'

export default function AddAttibute({ isSaveSettings }: { isSaveSettings: boolean }) {
    const { control } = useForm()
    const { append, remove, fields } = useFieldArray({
        control,
        name: 'productAttributes'
    })

    return (
        <div>
            <div className="flex justify-content-end">
                <Button label="Add Attribute" onClick={()=>append({attribute:"",attributeValues:[]})} outlined />
            </div>
            <div>
                {
                    fields.map((item , index) => (
                        <>
                            <div className="flex mt-4 align-items-center">
                                <div className="w-5 mr-2">
                                    <Controller
                                        name={`productAttributes.${index}.attribute`}
                                        control={control}
                                        render={({ field }) => (
                                            <Select {...field} placeholder='Type to search and select attributes' />
                                        )}
                                    />
                                </div>
                                <div className="w-5 ml-2">
                                    <Controller
                                        name={`productAttributes.${index}.attributeValues`}
                                        control={control}
                                        render={({ field }) => (
                                            <Select {...field} placeholder='Type to search and select attributes values' />
                                        )}
                                    />
                                </div>
                                <div className="w-2 ml-2">
                                    <Button severity="danger" outlined style={{height: "40px"}} label="Remove" onClick={()=>remove(index)}/>
                                </div>
                            </div>
                        </>
                    ))
                }
            </div>
        </div>
    )
}