'use client'

import { BreadCrumb } from "primereact/breadcrumb";
import { Card } from "primereact/card";

export default function Page({params}:any){
    const items = [
        { label: 'Order' },
        { label: 'Order Details' }
    ];

    return (
        <div>
            <BreadCrumb model={items} className="m-4" />
            <Card className="m-4">
                <table>
                    <tr>
                        <td>
                            ID
                        </td>
                        <td>
                            {params.orderId}
                        </td>
                    </tr>
                </table>
            </Card>
        </div>
    )
}