'use client'

import { GET_TICKET_LIST } from "@/graphql/ticket";
import { useLazyQuery } from "@apollo/client";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Page(){

    const [getTickets, {loading, data}] = useLazyQuery(GET_TICKET_LIST, {fetchPolicy: "no-cache"})

    useEffect(()=>{
        getTickets({
            variables: {
                limit: 10,
                offset: 0
            }
        })
    }, [])

    function deleteTicketHandler(id:string){
        Swal.fire({
            title: "Are You Sure!",
            text: "You won't be able to revert this!",
            showCancelButton: true,
            cancelButtonColor:"red",
            confirmButtonColor: "blue",
            confirmButtonText:"Yes, delete it!"
        })
    }

    function ticketAction(item:any){
        return (
            <div>
                <i className="pi pi-pen-to-square mr-3 cursor-pointer"></i>
                <i onClick={()=>deleteTicketHandler(item._id)} className="pi pi-trash cursor-pointer"></i>
            </div>
        )
    }

    return (
        <div>
            <h1 className="ml-4 font-light">Ticket System</h1>
            <Card className="m-4">
                <DataTable
                    loading={loading}
                    value={data?.getAdminTickets?.tickets ? data?.getAdminTickets?.tickets : []}
                    totalRecords={data?.getAdminTickets?.count ? data?.getAdminTickets?.count : 0}
                >
                    <Column field="_id" header="ID"/>
                    <Column field="ticket_type.title" header="Ticket Type"/>
                    <Column field="user.user_name" header="User Name"/>
                    <Column field="subject" header="subject"/>
                    <Column field="email" header="email"/>
                    <Column field="description" header="description"/>
                    <Column field="status" header="Status"/>
                    <Column field="created_at" header="Date Created"/>
                    <Column body={ticketAction} header="Actions"/>
                </DataTable>
            </Card>
        </div>
    )
}