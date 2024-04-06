'use client'
import { GET_CATEGORIES } from "@/graphql/category/query";
import { useQuery } from "@apollo/client";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Image } from "primereact/image";

export default function Category() {
    const { data, error, loading, refetch } = useQuery(GET_CATEGORIES, { variables: { getCategoriesInput: { limit: 100, offset: 0 } } })

    const categoryImageRenderer = (url:any)=> <Image alt="Category Image" width="100" src={url}/>

    const items = [
        { label: 'Category' },
        { label: 'Category List' }
    ];
    return (
        <div>
            <BreadCrumb model={items} className="m-4" />
            <Card className="m-4">
                <Button label="Add New" className="mb-3"/>
                <DataTable lazy totalRecords={data?.getAdminCategories?.count ? data?.getAdminCategories?.count : 0} onPage={(value) => console.log(value)} value={data?.getAdminCategories?.categories ? data?.getAdminCategories?.categories : []} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
                    <Column field="_id" header="ID"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="order" header="Order"></Column>
                    <Column body={(item)=>categoryImageRenderer(item?.image)} header="Image"></Column>
                    <Column body={(item)=>categoryImageRenderer(item?.banner)} header="Banner"></Column>
                    <Column field="status" header="Status"></Column>
                </DataTable>
            </Card>
        </div>
    )
}