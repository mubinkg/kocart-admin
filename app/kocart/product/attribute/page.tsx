'use client'

import Attribute from "@/components/product/Attribute";
import { ADD_ATTRIBUTE, ADD_ATTRIBUTE_SET, GET_PORODUCT_ATTRIBUTE_LIST, GET_PRODUCT_ATTRIBUTE_SET_LIST } from "@/graphql/product";
import { getIsAdmin } from "@/util/storageUtils";
import { useMutation, useQuery } from "@apollo/client";
import { AutoComplete } from "primereact/autocomplete";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

export default function ProductAttributeSet() {
    const {data:productAttributeList} = useQuery(GET_PORODUCT_ATTRIBUTE_LIST, {variables: {query: "", limit: 100, offset: 0}})
    const [addAttribute] = useMutation(ADD_ATTRIBUTE)
    const [addAttributeSet, { loading: addAttributeSetLoading }] = useMutation(ADD_ATTRIBUTE_SET)
    const { data: productAttributeSetResponse, refetch: refetchProductAttributeSet } = useQuery(GET_PRODUCT_ATTRIBUTE_SET_LIST, { variables: { limit: 10, offset: 0, query: "" }, fetchPolicy: 'no-cache' })
    const [visible, setVisible] = useState(false)
    const [visibleAttributeSet, setVisibleAttributeSet] = useState(false)
    const [visibleAttributeSetList, setVisisbleAttributeSetList] = useState(false)
    const [name, setName] = useState('')
    const [attributeSet, setAttributeSet] = useState('')
    const [attributeSetName, setAttributeSetName] = useState('')
    const toast = useRef<any>(null)

    const showError = (msg: string) => {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: msg, life: 3000 });
    }

    const showSuccess = (msg: string) => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: msg, life: 3000 });
    }

    const searchAttribute = async (e: any) => {
        await refetchProductAttributeSet({
            limit: 10,
            offset: 0,
            query: e.query
        })
    }

    const handleAddAttributeSet = async () => {
        try {
            if (!attributeSetName) {
                throw new Error
            }
            await addAttributeSet({
                variables: {
                    "createProductAttributeInput": {
                        "attributeSetName": attributeSetName
                    }
                }
            })
            await refetchProductAttributeSet()
            setAttributeSetName('')
            setVisibleAttributeSet(false)
            showSuccess('Attribute created successfully')
        } catch (err) {
            showError('Error on add attribute set')
        }
    }

    const handleAddAttribute = async (value:any, reset:any)=>{
        try{
            const id = productAttributeSetResponse?.getProductAttributeSetList?.productAttributeSetList?.length ? productAttributeSetResponse?.getProductAttributeSetList?.productAttributeSetList.find((d:any)=> d?.attributeSetName === attributeSet) : ""
            const attributeSetId = (id?._id)
            await addAttribute({
                variables: {
                    "createProductAttributeInput": {
                    "attributeSet": attributeSetId,
                    "name": name,
                    "values": value
                    }
                }
            })
            setVisible(false)
            reset()
            showSuccess('Attribute creted success')
        }catch(err){
            showError('Attribute create error.')
        }
    }

    const items = [
        { label: 'Product' },
        { label: 'Product Attribute Set List' }
    ];

    return (
        <>
            <Toast ref={toast} />
            <BreadCrumb model={items} className="m-4" />
            <Card className="m-4">
                {
                    getIsAdmin() ? (<Button label="Create New" onClick={() => setVisible(true)} className="mb-4"/>): ""
                }
                <DataTable 
                    title="Attributes" 
                    lazy 
                    paginator 
                    rows={5} 
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    totalRecords={productAttributeList?.productAttributes?.count ? productAttributeList?.productAttributes?.count : 0}
                    value={productAttributeList?.productAttributes?.attributeList || []}
                >
                    <Column field="_id" header="ID"/>
                    <Column field="name" header="Name"/>
                </DataTable>
            </Card>
            <Dialog header="Create New Product Attribute" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <div className="flex flex-column">
                    <p className="mb-2 font-semibold">Attribute Name</p>
                    <InputText value={name} onChange={(e) => setName(e.target.value)} className="w-full block" id="username" placeholder="Attribute Name" />
                </div>
                <div className="flex flex-column">
                    <p className="mb-2 font-semibold">Select Attribute Set</p>
                    <div className="flex w-full">
                        <AutoComplete value={attributeSet} suggestions={productAttributeSetResponse?.getProductAttributeSetList?.productAttributeSetList?.length ? productAttributeSetResponse.getProductAttributeSetList.productAttributeSetList.map((d: any) => d.attributeSetName) : []} onChange={(e) => setAttributeSet(e.target.value)} completeMethod={searchAttribute} dropdown id="username" placeholder="Search and Select Attribute Set" className="w-11 mr-1" />
                        <Button label="+" className="mr-1" onClick={() => setVisibleAttributeSet(true)} />
                        <Button icon="pi pi-list" onClick={async () => {
                            await refetchProductAttributeSet({ limit: 10, offset: 0, query: "" })
                            setVisisbleAttributeSetList(true)
                        }} />
                    </div>
                </div>
                <Attribute handleAddAttribute={handleAddAttribute}/>
                <Button label="Submit" className="my-3" />
            </Dialog>
            <Dialog position="top" header="Create Product Attribute Set" visible={visibleAttributeSet} style={{ width: '50vw' }} onHide={() => setVisibleAttributeSet(false)}>
                <div className="flex flex-column">
                    <p className="mb-2 font-semibold">Attribute Set Name <span className="text-red-500">*</span></p>
                    <InputText value={attributeSetName} onChange={(e) => setAttributeSetName(e.target.value)} className="w-full block" id="username" placeholder="Attribute Name" />
                </div>
                <Button label={addAttributeSetLoading ? 'Loading...' : "Add Now"} className="my-3" onClick={handleAddAttributeSet} hidden={addAttributeSetLoading} />
            </Dialog>
            <Dialog position="top" header="Product Attribute List" visible={visibleAttributeSetList} style={{ width: '50vw' }} onHide={() => setVisisbleAttributeSetList(false)}>
                <Card title="Attributes">
                    <DataTable lazy totalRecords={productAttributeSetResponse ? productAttributeSetResponse?.getProductAttributeSetList?.count : 0} onPage={(value) => console.log(value)} value={productAttributeSetResponse?.getProductAttributeSetList?.productAttributeSetList ? productAttributeSetResponse?.getProductAttributeSetList?.productAttributeSetList : []} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
                        <Column field="_id" header="ID"></Column>
                        <Column field="attributeSetName" header="Name"></Column>
                        <Column field="status" header="Status"></Column>
                    </DataTable>
                </Card>
            </Dialog>
        </>
    )
}