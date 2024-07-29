'use client'

import useGetOrder from "@/hooks/order/useGetOrder";
import { BreadCrumb } from "primereact/breadcrumb";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";

export default function Page({params}:any){
    const {order} = useGetOrder(params.orderId)
    const items = [
        { label: 'Order' },
        { label: 'Order Details' }
    ];

    return (
        <div>
            <BreadCrumb model={items} className="m-4" />
            <Card className="m-4">
                <Divider/>
                <div className="flex mx-2">
                    <h4 style={{width: "120px"}}>ID</h4>
                    <h4>{params.orderId}</h4>
                </div>
                <Divider/>
                <div className="flex mx-2">
                    <h4 style={{width: "120px"}}>Name</h4>
                    <h4>{order?.user?.name}</h4>
                </div>
                <Divider/>
                <div className="flex mx-2">
                    <h4 style={{width: "120px"}}>Email</h4>
                    <h4>{order?.email}</h4>
                </div>
                <Divider/>
                <div className="flex mx-2">
                    <h4 style={{width: "120px"}}>Contact</h4>
                    <h4>{order?.mobile}</h4>
                </div>
                <Divider/>
                <div className="flex mx-2">
                    <h4 style={{width: "120px"}}>Items</h4>
                    <h4>Test</h4>
                </div>
                <Divider/>
                <div className="flex mx-2">
                    <h4 style={{width: "120px"}}>Total($)</h4>
                    <h4>{order?.total}</h4>
                </div>
                <Divider/>
                <div className="flex mx-2 align-items-center content-center">
                    <h4 style={{width: "120px"}}>Delivery Charge($)</h4>
                    <h4>{order?.delivery_charge}</h4>
                </div>
                <Divider/>
                <div className="flex mx-2 align-items-center content-center">
                    <h4 style={{width: "120px"}}>Promo Code Discount ($)</h4>
                    <h4>{order?.promo_discount}</h4>
                </div>
                <Divider/>
                <div className="flex mx-2 align-items-center content-center">
                    <h4 style={{width: "120px"}}>Payment Method</h4>
                    <h4>{order?.payment_method}</h4>
                </div>
                <Divider/>
                <div className="flex mx-2 align-items-center content-center">
                    <h4 style={{width: "120px"}}>Address</h4>
                    <h4>{order?.address}</h4>
                </div>
                <Divider/>
                <div className="flex mx-2 align-items-center content-center">
                    <h4 style={{width: "120px"}}>Delivery Date & Time</h4>
                    <h4>Anytime</h4>
                </div>
                <Divider/>
                <div className="flex mx-2 align-items-center content-center">
                    <h4 style={{width: "120px"}}>Order Date</h4>
                    <h4>{order?.created_at}</h4>
                </div>
                <Divider/>
            </Card>
        </div>
    )
}