'use client'

import { GET_ORDER_LIST } from "@/graphql/order";
import { useQuery } from "@apollo/client";
import { BreadCrumb } from "primereact/breadcrumb";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";

export default function OrderList() {
    const toast = useRef<any>(null)

    const showError = (message: string) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
    }
    const { data, error } = useQuery(GET_ORDER_LIST, {
        variables: {
            "adminOrderListInput": {
                "end_date": null,
                "payment_method": null,
                "product_type": null,
                "start_date": null,
                "status": null
            }
        }
    })
    useEffect(() => {
        if (error) {
            showError('Error on fetching order list.')
        }
    }, [error])
    const items = [
        { label: 'Order' },
        { label: 'Order List' }
    ];

    const orderAction = () => (
        <div className="flex flex-column">
            <i className="pi pi-eye mb-3" />
            <i className="pi pi-trash mb-3"/>
            <i className="pi pi-file mb-3"/>
            <i className="pi pi-phone mb-3"/>
            <i className="pi pi-map-marker"/>
        </div>
    )

    return (
        <div>
            <BreadCrumb model={items} className="m-4" />
            <Toast ref={toast} />
            <Card className="m-4">
                <DataTable
                    lazy
                    totalRecords={data?.getAdminOrderList?.count ? data?.getAdminOrderList?.count : 0}
                    value={data?.getAdminOrderList?.orders ? data?.getAdminOrderList?.orders : []}
                >
                    <Column field="_id" header="Order ID"></Column>
                    <Column field="user.name" header="User Name"></Column>
                    <Column field="order" header="Sellers"></Column>
                    <Column field="order_note" header="O. Notes"></Column>
                    <Column field="total" header="Total" />
                    <Column field="delivery_charge" header="D.Charge" />
                    <Column field="wallet_balance_used" header="Wallet Used($)" />
                    <Column field="promo_discount" header="Promo disc.($)" />
                    <Column field="final_total" header="Final Total($)" />
                    <Column field="payment_method" header="Payment Method" />
                    <Column field="created_at" header="Order Date" />
                    <Column body={() => orderAction()} header="Action" />
                </DataTable>
            </Card>
        </div>
    )
}