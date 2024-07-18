'use client'
import { GET_STOCK_LIST } from "@/graphql/stock-management";
import { useLazyQuery, useQuery } from "@apollo/client";
import { BreadCrumb } from "primereact/breadcrumb";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Image } from "primereact/image";
import { useEffect, useState } from "react";

export default function Brand() {
    const [pageData, setPageData] = useState<any>({rows:5,first:0})
    const [getStocks, {data, loading}] = useLazyQuery(GET_STOCK_LIST, {
        fetchPolicy:"no-cache"
    })

    useEffect(()=>{
        getStocks({variables: {
            "limit": pageData.rows,
            "offset": pageData.first,
            "query": ""
          }})
    }, [])

    useEffect(()=>{
        getStocks({variables: {
            "limit": pageData.rows,
            "offset": pageData.first,
            "query": ""
          }})
    }, [pageData])

    const items = [
        { label: 'Home' },
        { label: 'Product Stock' }
    ];

    const brandImageRenderer = (item: any) => <Image src={item?.product?.pro_input_image} alt="Brand Image" width="200"/>

    const renderAttributeValue = (item:any)=>(
        <p style={{fontWeight:'bold', fontSize:"18px"}}>
            {item?.attributeValues?.map((d:any)=>d?.valueName).join(',') || "Simple Product"}
        </p>
    )

    const attributeActionRenderer =  (item:any)=>(<i className="pi pi-pen-to-square cursor-pointer"/>)

    const stockVariantRenderer = (item:any)=>(
        <div>
            {
                (item?.productType === 'variable' && item.stockType === 'variable') ?
                (
                    <div>
                        <DataTable 
                            value={item.values}
                        >
                            <Column header="Name" body={renderAttributeValue}/>
                            <Column header="Stock Qty" field="totalStock"/>
                            <Column header="Action" body={attributeActionRenderer}/>
                        </DataTable>
                    </div>
                ):
                (
                    <div>
                        <DataTable
                            value={item.values}
                            rowGroupMode="rowspan" 
                            groupRowsBy="totalStock"
                        >
                            <Column header="Name" body={renderAttributeValue}/>
                            <Column header="Stock Qty" field="totalStock"/>
                            <Column header="Action" body={attributeActionRenderer} field="totalStock"/>
                        </DataTable>
                    </div>
                )
            }
        </div>
    )

    return (
        <div>
            <BreadCrumb model={items} className="m-4" />
            <Card className="m-4">
                <DataTable 
                    totalRecords={data?.getAdminStockList?.count ? data?.getAdminStockList.count:0}
                    lazy
                    rows={pageData?.rows || 5}
                    first={pageData?.first || 1} 
                    loading={loading}
                    value={data?.getAdminStockList?.stock ? data?.getAdminStockList?.stock:[]}
                    onPage={(value) => setPageData(value)}
                    paginator 
                    rowsPerPageOptions={[5,10,20,50]} 
                >
                    <Column header="Name" field="product.pro_input_name"/>
                    <Column header="Image" body={brandImageRenderer}/>
                    <Column header="Vaiants - Stock" body={stockVariantRenderer}/>
                </DataTable>
            </Card>
        </div>
    )
}