'use client'

import { useQuery } from "@apollo/client";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BreadCrumb } from "primereact/breadcrumb";
import { ADMIN_CUSTOMER_LIST } from "@/graphql/customres";


export default function Page() {
    const { data: customerData, refetch } = useQuery(ADMIN_CUSTOMER_LIST, { variables: { limit: 1000, offset: 0, query: "" } })

    const items = [
        { label: 'Customers' },
        { label: 'Customers List' }
    ];

    return (
        <div>
            <BreadCrumb model={items} className='m-4' />
            <Card className="m-4 p-2">
                <DataTable lazy totalRecords={customerData?.customerAdminList?.count ? customerData?.customerAdminList?.count : 0} onPage={(value) => console.log(value)} value={customerData?.customerAdminList?.customers ? customerData?.customerAdminList?.customers : []} paginator rows={1000} rowsPerPageOptions={[1000, 2000, 2500, 5000]}>
                    <Column field="_id" header="ID"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="mobile_no" header="Mobile No"></Column>
                    <Column field="balance" header="Balance"></Column>
                    <Column field="street" header="Street"></Column>
                    <Column field="area" header="Area"></Column>
                    <Column field="city" header="City"></Column>
                    <Column field="status" header="Status"></Column>
                </DataTable>
            </Card>
        </div>
    )
}