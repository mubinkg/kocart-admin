'use client'
import { GET_STOCK_LIST } from "@/graphql/stock-management";
import { useLazyQuery, useQuery } from "@apollo/client";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import Select from 'react-select'

const stockUpdateOptions = [
    {
        label:"Add",
        value: "add"
    },
    {
        label: "Subtract",
        value: 'subtract'
    }
]

export default function Brand() {
    const [pageData, setPageData] = useState<any>({rows:5,first:0})
    const [getStocks, {data, loading}] = useLazyQuery(GET_STOCK_LIST, {
        fetchPolicy:"no-cache"
    })
    const [visible, setVisible] = useState(false);
    const [item, setItem] = useState<any>({})

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

    const attributeActionRenderer =  
    (item:any)=>(
        <i 
            onClick={()=>{
                setVisible(true);
                setItem(item)
                console.log(item)
            }} 
            className="pi pi-pen-to-square cursor-pointer"
        />
    )

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
            <Dialog position="top" header="Manage Stock" visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
                <p className="my-3 font-semibold">Product</p>
                <InputText 
                    className="w-12" 
                    value={item?.productType === 'variable' ? item?.attributeValues?.map((d:any)=>d?.valueName)?.join('-'):item?.productType} 
                    disabled
                />
                <div className="flex w-12 flex-column">
                    <p className="my-3 font-semibold">Current Stock</p>
                    <InputNumber className="w-12" value={item?.totalStock}/>
                    <p className="my-3 font-semibold">Quantity <span style={{ color: "red" }}>*</span></p>
                    <InputNumber className="w-12"/>
                    <p className="my-3 font-semibold">Type</p>
                    <Select className="w-12" options={stockUpdateOptions} defaultValue={stockUpdateOptions[0]}/>
                </div>
                <Button className="w-12 mt-4" label="Submit"/>
            </Dialog>
        </div>
    )
}