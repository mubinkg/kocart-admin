'use client'

import OutlineItem from "@/components/dashboard/OutlineItem";
import PieChart from "@/components/dashboard/PieChart";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import { useEffect, useState } from "react";
import OrderList from "../order/order-list/page";
import { useQuery } from "@apollo/client";
import { DASHBOARD_TOP_CONTENT } from "@/graphql/dashboard";

export default function Dashboard() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const {data} = useQuery(DASHBOARD_TOP_CONTENT)

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Dataset 1',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    yAxisID: 'y',
                    tension: 0.4,
                    data: [65, 59, 80, 81, 56, 55, 50, 60, 70, 40, 50, 90, 0]
                },
            ]
        };
        const options = {
            stacked: false,
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        drawOnChartArea: false,
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="m-4">
            <div className="grid grid-gutter">
                <div className="col-3">
                    <Card>
                        <h3 className="text-right">Orders</h3>
                        <h2 className="text-right">{data?.dashboardTopContent?.totalOrder}</h2>
                    </Card>
                </div>
                <div className="col-3">
                    <Card>
                        <h3 className="text-right">Products</h3>
                        <h2 className="text-right">{data?.dashboardTopContent?.totalProduct}</h2>
                    </Card>
                </div>
                <div className="col-3">
                    <Card>
                        <h3 className="text-right">Rating</h3>
                        <h2 className="text-right">{data?.dashboardTopContent?.totalRating/data?.dashboardTopContent?.rating}/{data?.dashboardTopContent?.rating}</h2>
                    </Card>
                </div>
                <div className="col-3">
                    <Card>
                        <h3 className="text-right">Balance ($)</h3>
                        <h2 className="text-right">{data?.dashboardTopContent?.totalBalance}</h2>
                    </Card>
                </div>
            </div>
            <div className="grid grid-gutter mt-5">
                <div className="col-6">
                    <Card title='Product Sales'>
                        <Chart type="line" data={chartData} options={chartOptions} />
                    </Card>
                </div>
                <div className="col-6">
                    <PieChart />
                </div>
            </div>
            <h3>Order Outline</h3>
            <div className="grid grid-gutter">
                <OutlineItem count={1103} title="Received" icon={""}/>
                <OutlineItem count={1103} title="Received" icon={""}/>
                <OutlineItem count={1103} title="Received" icon={""}/>
                <OutlineItem count={1103} title="Received" icon={""}/>
                <OutlineItem count={1103} title="Received" icon={""}/>
                <OutlineItem count={1103} title="Received" icon={""}/>
            </div>
            <OrderList/>
        </div>
    )
}