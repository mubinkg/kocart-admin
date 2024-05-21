'use client'
import { GET_STOCK_LIST } from "@/graphql/stock-management";
import { useQuery } from "@apollo/client";
import { BreadCrumb } from "primereact/breadcrumb";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Image } from "primereact/image";

export default function Brand() {

    const {data, loading} = useQuery(GET_STOCK_LIST, {
        variables: {
            "limit": 1000,
            "offset": 0,
            "query": ""
          }
    })

    const items = [
        { label: 'Home' },
        { label: 'Product Stock' }
    ];

    const brandImageRenderer = (item: any) => <Image src={item?.product?.pro_input_image} alt="Brand Image" width="200"/>

    const renderAttributeValue = (item:any)=>(
        <p style={{fontWeight:'bold', fontSize:"18px"}}>
            {item?.attributeValues?.map((d:any)=>d?.valueName).join(',')}
        </p>
    )

    const attributeActionRenderer =  (item:any)=>(<i className="pi pi-pen-to-square cursor-pointer"/>)

    const stockVariantRenderer = (item:any)=>(
        <div>
            {
                (item?.productType === 'variable' && item.stockType === 'variable') ?
                (
                    <div>
                        <DataTable value={item.values}>
                            <Column header="Name" body={renderAttributeValue}/>
                            <Column header="Stock Qty" field="totalStock"/>
                            <Column header="Action" body={attributeActionRenderer}/>
                        </DataTable>
                    </div>
                ):
                (
                    <div>
                        Not Variable
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
                    value={data?.getAdminStockList?.stock ? data?.getAdminStockList?.stock:[]}
                >
                    <Column header="Name" field="product.pro_input_name"/>
                    <Column header="Image" body={brandImageRenderer}/>
                    <Column header="Vaiants - Stock" body={stockVariantRenderer}/>
                </DataTable>
            </Card>
        </div>
    )
}