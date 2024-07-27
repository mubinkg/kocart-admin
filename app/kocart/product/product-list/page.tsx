'use client'

import { GET_ADMIN_PRODUCT_LIST } from "@/graphql/product";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { BreadCrumb } from "primereact/breadcrumb";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
import { Rating } from 'primereact/rating';
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


export default function ProductList() {
    const [visible, setVisible] = useState(false)
    const [product, setProduct] = useState<any>({})
    const [pageData, setPageData] = useState<any>({rows:5,first:0})
    const navigation = useRouter()
    
    const [getProducts,{ data ,loading}] = useLazyQuery(GET_ADMIN_PRODUCT_LIST, { fetchPolicy: "no-cache"})

    useEffect(()=>{
        getProducts({variables:{
            "adminProductListDto": {
                "category": null,
                "seller": null,
                "status": null,
                "limit": pageData.rows,
                "offset": pageData.first
            }
        }})
    },[,pageData])

    const productImageRenderer = (url: any) => <Image alt="Category Image" width="100" src={url} />

    const items = [
        { label: 'Product' },
        { label: 'Product List' }
    ];

    const productAction = (item: any) => (
        <div style={{display:"flex", flexDirection:"column"}}>
            <i
                className="pi pi-eye cursor-pointer"
                onClick={() => {
                    console.log(item);
                    setProduct(item);
                    setVisible(true)
                }}
            >
            </i>
            <i
                className="pi pi-pen-to-square cursor-pointer mt-3"
                onClick={() => navigation.push(`/kocart/product/edit/${item._id}`)}
            >
            </i>
            <i
                className="pi pi-trash cursor-pointer mt-3"
                onClick={() =>
                    Swal.fire({
                        title: "Delete Product",
                        text: "Are you sure to delete this product",
                        showCancelButton: true,
                        cancelButtonColor:"green",
                        confirmButtonColor: 'red',
                        confirmButtonText: "Delete"
                    }).then(res=>{
                        console.log(res)
                    })
                }
            >
            </i>
            <i
                className="pi pi-star cursor-pointer mt-3"
                onClick={() => navigation.push(`/kocart/product/ratings/${item._id}`)}
            >
            </i>
            <i
                className="pi pi-question-circle cursor-pointer mt-3"
                onClick={() => navigation.push(`/kocart/product/faq/${item._id}`)}
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
                    loading={loading}
                    rows={pageData?.rows || 5}
                    first={pageData?.first || 1} 
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    value={data?.getAdminProductList?.products || []}
                    totalRecords={data?.getAdminProductList?.count || 0}
                    onPage={(value) => setPageData(value)} 
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
                                {
                                    product?.variant === 'variable' ? 
                                    (
                                        <div>
                                            <h4 className="mt-4">Variants</h4>
                                            <DataTable
                                                value={product?.productvariants||[]}
                                            >
                                                <Column field="_id" header="ID"/>
                                                <Column field="price" header="Price"/>
                                            </DataTable>
                                        </div>
                                    )
                                    :""
                                }
                            </div>
                        </div>
                    </Card>
                </Dialog>
            </Card>
        </div>
    )
}