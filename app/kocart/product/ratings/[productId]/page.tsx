'use client'

import { useLazyQuery } from "@apollo/client";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ADMIN_PRODUCT_FAQ_LIST } from "@/graphql/faq";
import { BreadCrumb } from "primereact/breadcrumb";


export default function Page({params}:any) {
    const [getFaqList,{ data: faqList, loading }] = useLazyQuery(ADMIN_PRODUCT_FAQ_LIST, { fetchPolicy:"no-cache" })
    const [pageData, setPageData] = useState<any>({rows:5,first:0})

    useEffect(()=>{
        getFaqList({variables: { limit: pageData.rows, offset: pageData.first, productId: params.productId }})
    },[,pageData])

    const items = [
        { label: 'Product' },
        { label: 'Product Rating List' }
    ];

    return (
        <div>
            <BreadCrumb model={items} className='m-4' />
            <Card className="m-4 p-2">
                <DataTable 
                    lazy 
                    loading={loading}
                    totalRecords={faqList?.getProductFaqList?.count ? faqList?.getProductFaqList?.count : 0} 
                    onPage={(value) => setPageData(value)} 
                    value={faqList?.getProductFaqList?.faqs ? faqList?.getProductFaqList?.faqs : []} 
                    paginator 
                    rows={pageData?.rows || 5}
                    first={pageData?.first || 1} 
                    rowsPerPageOptions={[5, 10, 25, 50]}
                >
                    <Column field="_id" header="ID"></Column>
                    <Column field="username" header="Username"></Column>
                    <Column field="rating" header="Rating"></Column>
                    <Column field="image" header="Image"></Column>
                    <Column field="createdAt" header="Date Added"></Column>
                </DataTable>
            </Card>
        </div>
    )
}