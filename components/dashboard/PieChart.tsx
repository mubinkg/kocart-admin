
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';

export default function PieChart({categoryCountData}:{categoryCountData:any}) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: categoryCountData?.map((category:any)=>category.category.name)||[],
            datasets: [
                {
                    data: categoryCountData?.map((category:any)=>category.count)||[],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'), 
                        documentStyle.getPropertyValue('--yellow-500'), 
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--yellow-400'), 
                    ]
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <Card title="Category Wise Product's Count" className="p-2 card flex justify-content-center">
            <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
        </Card>
    )
}
        