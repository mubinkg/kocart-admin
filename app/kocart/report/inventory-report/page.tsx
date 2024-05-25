'use client'
import { SALES_REPORT } from "@/graphql/report";
import { useQuery } from "@apollo/client";
import { BreadCrumb } from "primereact/breadcrumb";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Image } from "primereact/image";

export default function Page() {
    const { data, loading, error , refetch} = useQuery(SALES_REPORT, {fetchPolicy:"no-cache", variables:{
        "limit": 100,
        "offset": 0
      }})
    
    console.log(data)

    const items = [
        { label: 'Report' },
        { label: 'Sales Report' }
    ];

    const productNameRenderer = (item:any) => <p>{item?.product_variants?.map((data:any)=>data?.product?.pro_input_name).join(',') ||""}</p>

    return (
        <div>
            <BreadCrumb model={items} className="m-4" />
            <Card className="m-4">
                <DataTable lazy totalRecords={data?.salesReport?.count ? data?.salesReport?.count : 0} onPage={(value) => console.log(value)} value={data?.salesReport?.orders ? data?.salesReport?.orders : []} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
                    <Column field="_id" header="ID"></Column>
                    <Column body={productNameRenderer} header="Product Name"></Column>
                    <Column field="final_total" header="Final Total"></Column>
                    <Column field="payment_method" header="Payment Method"></Column>
                    <Column field="created_at" header="Order Date"></Column>
                </DataTable>
            </Card>
        </div>
    )
}