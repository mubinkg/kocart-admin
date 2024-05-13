'use client'
import { BreadCrumb } from "primereact/breadcrumb";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export default function Brand() {

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