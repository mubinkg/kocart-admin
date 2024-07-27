'use client'

import { SLIDER_PRODUCT } from "@/graphql/slider";
import { useLazyQuery } from "@apollo/client";
import { Card } from "primereact/card";
import { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ADMIN_PRODUCT_FAQ_LIST } from "@/graphql/faq";
import { BreadCrumb } from "primereact/breadcrumb";


export default function Page({params}:any) {
    const [getFaqList,{ data: faqList }] = useLazyQuery(ADMIN_PRODUCT_FAQ_LIST, { fetchPolicy:"no-cache" })
    const [pageData, setPageData] = useState<any>({rows:5,first:0})

    useEffect(()=>{
        getFaqList({variables: { limit: pageData.rows, offset: pageData.first, productId: params.productId }})
    },[,pageData])

    const items = [
        { label: 'Product' },
        { label: 'Product Faq List' }
    ];

    return (
        <div>
            <BreadCrumb model={items} className='m-4' />
            <Card className="m-4 p-2">
                <DataTable 
                    lazy 
                    totalRecords={faqList?.adminFaqList?.count ? faqList?.adminFaqList?.count : 0} 
                    onPage={(value) => setPageData(value)} 
                    value={faqList?.adminFaqList?.faqs ? faqList?.adminFaqList?.faqs : []} 
                    paginator 
                    rows={pageData?.rows || 5}
                    first={pageData?.first || 1} 
                    rowsPerPageOptions={[5, 10, 25, 50]}
                >
                    <Column field="_id" header="ID"></Column>
                    <Column field="question" header="Question"></Column>
                    <Column field="ans" header="Answr"></Column>
                    <Column field="user.account_name" header="User"></Column>
                </DataTable>
            </Card>
        </div>
    )
}