'use client'

import { ADD_ATTRIBUTE_SET } from "@/graphql/product";
import { useMutation } from "@apollo/client";
import { AutoComplete } from "primereact/autocomplete";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

export default function ProductAttribute() {
    const [addAttributeSet, {loading:addAttributeSetLoading}] = useMutation(ADD_ATTRIBUTE_SET)
    const [visible, setVisible] = useState(false)
    const [visibleAttributeSet, setVisibleAttributeSet] = useState(false)
    const [name, setName] = useState('')
    const [attributeSetItems, setAttributeSetItems] = useState(['one'])
    const [attributeSet, setAttributeSet] = useState('')
    const [attributeSetName, setAttributeSetName] = useState('')
    const toast = useRef<any>(null)

    const showError = (msg:string) => {
        toast.current?.show({severity:'error', summary: 'Error', detail: msg, life: 3000});
    }

    const showSuccess = (msg:string) => {
        toast.current.show({severity:'success', summary: 'Success', detail:msg, life: 3000});
    }

    const searchAttribute = (e: any) => {
        console.log(e.query)
    }

    const handleAddAttributeSet = async ()=>{
        try{
            if(!attributeSetName){
                throw new Error
            }
            await addAttributeSet({
                variables: {
                    "createProductAttributeInput": {
                      "attributeSetName": attributeSetName
                    }
                  }
            })
            setAttributeSetName('')
            setVisibleAttributeSet(false)
        }catch(err){
            showError('Error on add attribute set')
        }
    }

    const items = [
        { label: 'Product Attribute' },
        { label: 'Product Attribute List' }
    ];

    return (
        <>
            <Toast ref={toast} />
            <BreadCrumb model={items} className="m-4" />
            <Card className="m-4">
                <Button label="Create New" onClick={() => setVisible(true)} />

            </Card>
            <Dialog header="Create New Product Attribute" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <div className="flex flex-column">
                    <p className="mb-2 font-semibold">Attribute Name</p>
                    <InputText value={name} onChange={(e) => setName(e.target.value)} className="w-full block" id="username" placeholder="Attribute Name" />
                </div>
                <div className="flex flex-column">
                    <p className="mb-2 font-semibold">Select Attribute Set</p>
                    <div className="flex w-full">
                        <AutoComplete value={attributeSet} suggestions={attributeSetItems} onChange={(e) => setAttributeSet(e.target.value)} completeMethod={searchAttribute} dropdown id="username" placeholder="Select Attribute Set" loadingIcon={() => ""} className="w-11 mr-1" />
                        <Button label="+" className="mr-1" onClick={()=>setVisibleAttributeSet(true)}/>
                        <Button icon="pi pi-list" />
                    </div>
                </div>
                <Button label="Submit" className="my-3" />
            </Dialog>
            <Dialog position="top" header="Create Product Attribute Set" visible={visibleAttributeSet} style={{ width: '50vw' }} onHide={() => setVisibleAttributeSet(false)}>
                <div className="flex flex-column">
                    <p className="mb-2 font-semibold">Attribute Set Name <span className="text-red-500">*</span></p>
                    <InputText value={attributeSetName} onChange={(e) => setAttributeSetName(e.target.value)} className="w-full block" id="username" placeholder="Attribute Name" />
                </div>
                <Button label={addAttributeSetLoading? 'Loading...': "Add Now"} className="my-3" onClick={handleAddAttributeSet} hidden={addAttributeSetLoading}/>
            </Dialog>
        </>
    )
}