'use client'

import { useLazyQuery, useQuery } from "@apollo/client";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BreadCrumb } from "primereact/breadcrumb";
import { ADMIN_CUSTOMER_LIST } from "@/graphql/customres";
import { useEffect, useState } from "react";


export default function Page() {
    const [getCustomers, {data: customerData,loading} ] = useLazyQuery(ADMIN_CUSTOMER_LIST, {fetchPolicy: "no-cache"})
    const [pageData, setPageData] = useState<any>({rows:5,first:0})

    const items = [
        { label: 'Customer' },
        { label: 'Address List' }
    ];

    useEffect(()=>{
        getCustomers({variables:{ limit: pageData.rows, offset: pageData.first, query: "" }})
    }, [])

    useEffect(()=>{
        getCustomers({variables:{ limit: pageData.rows, offset: pageData.first, query: "" }})
    }, [pageData])

    return (
        <div>
            <BreadCrumb model={items} className='m-4' />
            <Card className="m-4 p-2">
                <DataTable 
                    lazy 
                    loading={loading}
                    rows={pageData?.rows || 5}
                    first={pageData?.first || 1} 
                    totalRecords={customerData?.customerAdminList?.count ? customerData?.customerAdminList?.count : 0}
                    onPage={(value) => setPageData(value)} 
                    value={customerData?.customerAdminList?.customers ? customerData?.customerAdminList?.customers : []} 
                    paginator 
                    rowsPerPageOptions={[5,10,20,50]}
                >
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