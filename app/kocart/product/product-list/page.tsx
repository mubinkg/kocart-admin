'use client'

import { GET_ADMIN_PRODUCT_LIST } from "@/graphql/product";
import { useQuery } from "@apollo/client";
import { BreadCrumb } from "primereact/breadcrumb";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Image } from "primereact/image";

export default function ProductList() {
    const {data} = useQuery(GET_ADMIN_PRODUCT_LIST, {variables: {
        "adminProductListDto": {
          "category": null,
          "seller": null,
          "status": null,
          "limit": 1000,
          "offset": 0
        }
      }, fetchPolicy: "no-cache"})

    const productImageRenderer = (url:any)=> <Image alt="Category Image" width="100" src={url}/>

    const items = [
        { label: 'Product' },
        { label: 'Product List' }
    ];

    return (
        <div>
            <BreadCrumb model={items} className="m-4"/>
            <Card className="m-4">
                <DataTable
                    lazy
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    value={data?.getAdminProductList?.products || []}
                    totalRecords={data?.getAdminProductList?.count || 0}
                >
                    <Column body={(item:any)=>productImageRenderer(item?.pro_input_image)} header="Image"/>
                    <Column field="pro_input_name" header="Name"/>
                    <Column field="brand" header="Brand"/>
                    <Column field="category_name" header="Category Name"/>
                    <Column field="rating" header="Rating"/>
                    <Column field="action" header="Action"/>
                </DataTable>
            </Card>
        </div>
    )
}