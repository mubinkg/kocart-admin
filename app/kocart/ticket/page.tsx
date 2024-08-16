'use client'

import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export default function Page(){

    function ticketAction(item:any){
        return (
            <div>
                <i className="pi pi-pen-to-square mr-3 cursor-pointer"></i>
                <i className="pi pi-trash cursor-pointer"></i>
            </div>
        )
    }

    return (
        <div>
            <h1 className="ml-4 font-light">Ticket System</h1>
            <Card className="m-4">
                <DataTable>
                    <Column field="_id" header="ID"/>
                    <Column field="_id" header="Ticket Type"/>
                    <Column field="_id" header="User Name"/>
                    <Column field="_id" header="subject"/>
                    <Column field="_id" header="email"/>
                    <Column field="_id" header="description"/>
                    <Column field="_id" header="Status"/>
                    <Column field="_id" header="Date Created"/>
                    <Column body={ticketAction} header="Actions"/>
                </DataTable>
            </Card>
        </div>
    )
}