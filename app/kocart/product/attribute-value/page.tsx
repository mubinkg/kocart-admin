'use client'

import { GET_PRODUCT_ATTRIBUTES_VALUE } from "@/graphql/product";
import { useQuery } from "@apollo/client";
import { BreadCrumb } from "primereact/breadcrumb";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";


export default function ProductAttributeSet() {
    const { data: attributesRes, refetch: refetchProductAttributeSet } = useQuery(GET_PRODUCT_ATTRIBUTES_VALUE, { variables: { limit: 1000, offset: 0, query: "" }, fetchPolicy: 'no-cache' })

    const items = [
        { label: 'Product' },
        { label: 'Attribute Values' }
    ];

    const statusBody = (status:string)=>(<span className={`${status === 'ACTIVE' ? 'bg-green-500':'bg-red-500'} px-2 py-1 text-white-alpha-90 border-round-sm`}>{status?.toLocaleLowerCase()}</span>)

    return (
        <div className="m-4">
            <BreadCrumb model={items} className="mb-4"/>
            <Card title="Attribute Values">
                <DataTable lazy totalRecords={attributesRes?.productAttributes?.count ? attributesRes?.productAttributes?.count : 0} onPage={(value) => console.log(value)} value={attributesRes?.productAttributes?.attributeList ? attributesRes?.productAttributes?.attributeList : []} paginator rows={5} rowsPerPageOptions={[1000, 2500, 5000]}>
                    <Column field="_id" header="ID"></Column>
                    <Column field="name" header="Attribute Name"></Column>
                    <Column field="values.valueName" header="Name"></Column>
                    <Column body={(item)=>statusBody(item?.status||"")} header="Status"></Column>
                </DataTable>
            </Card>
        </div>
    )
}