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


    return (
        <div>
            <BreadCrumb model={items} className="m-4" />
            <Card className="m-4">
                <DataTable 
                    totalRecords={data?.productVariants?.count ? data?.productVariants.count:0}
                    lazy
                    value={data?.productVariants?.productVariants ? data?.productVariants?.productVariants:[]}
                >
                    <Column header="Variant ID" field="_id"/>
                    <Column header="Name" field="product.pro_input_name"/>
                    <Column header="Image" body={brandImageRenderer}/>
                    <Column header="Vaiants - Stock" field="_id"/>
                </DataTable>
            </Card>
        </div>
    )
}