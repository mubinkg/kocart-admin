'use client'

import { ADD_ATTRIBUTE_SET, GET_PRODUCT_ATTRIBUTE_LIST } from "@/graphql/product";
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

export default function ProductAttribute() {
    const [addAttributeSet, { loading: addAttributeSetLoading }] = useMutation(ADD_ATTRIBUTE_SET)
    const {data:productAttributeSetResponse, refetch:refetchProductAttributeSet} = useQuery(GET_PRODUCT_ATTRIBUTE_LIST, {variables: {limit: 10, offset: 0, query: ""}})
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
        } catch (err) {
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
                        <AutoComplete value={attributeSet} suggestions={productAttributeSetResponse?.getProductAttributeSetList?.productAttributeSetList ? productAttributeSetResponse.getProductAttributeSetList.productAttributeSetList.map((d:any)=>d.attributeSetName):[]} onChange={(e) => setAttributeSet(e.target.value)} completeMethod={searchAttribute} dropdown id="username" placeholder="Select Attribute Set" className="w-11 mr-1" />
                        <Button label="+" className="mr-1" onClick={() => setVisibleAttributeSet(true)} />
                        <Button icon="pi pi-list" onClick={() => setVisisbleAttributeSetList(true)} />
                    </div>
                </div>
                <Button label="Submit" className="my-3" />
            </Dialog>
            <Dialog position="top" header="Create Product Attribute Set" visible={visibleAttributeSet} style={{ width: '50vw' }} onHide={() => setVisibleAttributeSet(false)}>
                <div className="flex flex-column">
                    <p className="mb-2 font-semibold">Attribute Set Name <span className="text-red-500">*</span></p>
                    <InputText value={attributeSetName} onChange={(e) => setAttributeSetName(e.target.value)} className="w-full block" id="username" placeholder="Attribute Name" />
                </div>
                <Button label={addAttributeSetLoading ? 'Loading...' : "Add Now"} className="my-3" onClick={handleAddAttributeSet} hidden={addAttributeSetLoading} />
            </Dialog>
            <Dialog position="top" header="Product Attribute Set List" visible={visibleAttributeSetList} style={{ width: '50vw' }} onHide={() => setVisisbleAttributeSetList(false)}>
                <Card title="Attribute Set">
                <DataTable lazy totalRecords={productAttributeSetResponse ? productAttributeSetResponse?.getProductAttributeSetList?.count : 0} onPage={(value) => console.log(value)} value={productAttributeSetResponse?.getProductAttributeSetList?.productAttributeSetList ? productAttributeSetResponse?.getProductAttributeSetList?.productAttributeSetList: []} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
                    <Column field="_id" header="ID"></Column>
                    <Column field="attributeSetName" header="Name"></Column>
                    <Column field="status" header="Status"></Column>
                </DataTable>
                </Card>
            </Dialog>
        </>
    )
}