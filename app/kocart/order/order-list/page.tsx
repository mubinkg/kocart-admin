import { BreadCrumb } from "primereact/breadcrumb";
import { Card } from "primereact/card";

export default function OrderList(){
    const items = [
        { label: 'Order' },
        { label: 'Order List' }
    ];
    return (
        <div>
            <BreadCrumb model={items} className="m-4"/>
            <Card className="m-4"></Card>
        </div>
    )
}