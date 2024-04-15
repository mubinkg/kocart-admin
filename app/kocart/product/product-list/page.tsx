'use client'

import { GET_ADMIN_PRODUCT_LIST } from "@/graphql/product";
import { useQuery } from "@apollo/client";
import { BreadCrumb } from "primereact/breadcrumb";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
import { Rating } from 'primereact/rating';
import { useState } from "react";


export default function ProductList() {
    const [visible, setVisible] = useState(false)
    const [product, setProduct] = useState<any>({})
    const { data } = useQuery(GET_ADMIN_PRODUCT_LIST, {
        variables: {
            "adminProductListDto": {
                "category": null,
                "seller": null,
                "status": null,
                "limit": 1000,
                "offset": 0
            }
        }, fetchPolicy: "no-cache"
    })

    const productImageRenderer = (url: any) => <Image alt="Category Image" width="100" src={url} />

    const items = [
        { label: 'Product' },
        { label: 'Product List' }
    ];

    const productAction = (item: any) => (
        <div>
            <i
                className="pi pi-eye cursor-pointer"
                onClick={() => {
                    setProduct(item);
                    setVisible(true)
                }}
            >

            </i>
        </div>
    )

    return (
        <div>
            <BreadCrumb model={items} className="m-4" />
            <Card className="m-4">
                <DataTable
                    lazy
                    paginator
                    rows={1000}
                    rowsPerPageOptions={[1000, 2500, 5000]}
                    value={data?.getAdminProductList?.products || []}
                    totalRecords={data?.getAdminProductList?.count || 0}
                >
                    <Column body={(item: any) => productImageRenderer(item?.pro_input_image)} header="Image" />
                    <Column field="pro_input_name" header="Name" />
                    <Column field="brand.name" header="Brand" />
                    <Column field="category.name" header="Category Name" />
                    <Column body={() => <Rating value={0} cancel={false} />} header="Rating" />
                    <Column body={(item: any) => productAction(item)} header="Action" />
                </DataTable>
                <Dialog className="lg:w-8 sm:w-12" header="Product Details" visible={visible} onHide={() => setVisible(false)}>
                    <Card>
                        <div className="flex">
                            <Image className="w-6 mr-4" src={product?.pro_input_image || ""} alt="product image" width="500" />
                            <div className="w-6">
                                <h3>{product?.pro_input_name}</h3>
                                <p>{product?.product_type}</p>
                                <p>{product?.brand?.name}</p>
                                <hr/>
                                <h4>Category : {product?.category?.name}</h4>
                                <Rating value={0} cancel={false}/>
                            </div>
                        </div>
                    </Card>
                </Dialog>
            </Card>
        </div>
    )
}