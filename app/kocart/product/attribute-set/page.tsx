'use client'

import { GET_PRODUCT_ATTRIBUTE_SET_LIST } from "@/graphql/product";
import { useQuery } from "@apollo/client";
import { BreadCrumb } from "primereact/breadcrumb";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useRef, useState } from "react";

export default function ProductAttributeSet() {
    const { data: productAttributeSetResponse, refetch: refetchProductAttributeSet } = useQuery(GET_PRODUCT_ATTRIBUTE_SET_LIST, { variables: { limit: 1000, offset: 0, query: "" }, fetchPolicy: 'no-cache' })

    const items = [
        { label: 'Product' },
        { label: 'Product Attribute Set List' }
    ];

    const statusBody = (status:string)=>(<span className={`${status === 'ACTIVE' ? 'bg-green-500':'bg-red-500'} px-2 py-1 text-white-alpha-90 border-round-sm`}>{status?.toLocaleLowerCase()}</span>)

    return (
        <div className="m-4">
            <BreadCrumb model={items} className="mb-4"/>
            <Card title="Attribute Set">
                <DataTable lazy totalRecords={productAttributeSetResponse ? productAttributeSetResponse?.getProductAttributeSetList?.count : 0} onPage={(value) => console.log(value)} value={productAttributeSetResponse?.getProductAttributeSetList?.productAttributeSetList ? productAttributeSetResponse?.getProductAttributeSetList?.productAttributeSetList : []} paginator rows={5} rowsPerPageOptions={[1000, 2500, 5000]}>
                    <Column field="_id" header="ID"></Column>
                    <Column field="attributeSetName" header="Name"></Column>
                    <Column body={(item)=>statusBody(item?.status||"")} header="Status"></Column>
                </DataTable>
            </Card>
        </div>
    )
}