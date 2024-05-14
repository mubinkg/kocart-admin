'use client'
import { GET_STOCK_LIST } from "@/graphql/stock-management";
import { useQuery } from "@apollo/client";
import { BreadCrumb } from "primereact/breadcrumb";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export default function Brand() {

    const {data, loading} = useQuery(GET_STOCK_LIST)
    console.log(data)

    const items = [
        { label: 'Home' },
        { label: 'Product Stock' }
    ];

    return (
        <div>
            <BreadCrumb model={items} className="m-4" />
            <Card className="m-4">
                <DataTable>
                    <Column header="Variant ID" field="_id"/>
                    <Column header="Name" field="_id"/>
                    <Column header="Image" field="_id"/>
                    <Column header="Vaiants - Stock" field="_id"/>
                </DataTable>
            </Card>
        </div>
    )
}