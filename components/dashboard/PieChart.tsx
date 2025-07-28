'use client';
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';
import { useLazyQuery } from '@apollo/client';
import { SELLER_CATEGORY_WISE_PRODUCT } from '@/graphql/dashboard';

export default function PieChart() {
  const [getdata, { data }] = useLazyQuery(SELLER_CATEGORY_WISE_PRODUCT, {
    fetchPolicy: 'no-cache',
  });
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  async function createPiChart() {
    try {
      const res = await getdata();
      const categoryCountData = res?.data?.sellerCategoryWiseProduct || [];
      const documentStyle = getComputedStyle(document.documentElement);
      const data = {
        labels:
          categoryCountData?.map((category: any) => category.category.name) ||
          [],
        datasets: [
          {
            data:
              categoryCountData?.map((category: any) => category.count) || [],
            backgroundColor: [
              documentStyle.getPropertyValue('--blue-500'),
              documentStyle.getPropertyValue('--yellow-500'),
              documentStyle.getPropertyValue('--green-500'),
              documentStyle.getPropertyValue('--gray-500'),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--blue-400'),
              documentStyle.getPropertyValue('--yellow-400'),
              documentStyle.getPropertyValue('--green-400'),
              documentStyle.getPropertyValue('--gray-400'),
            ],
          },
        ],
      };
      const options = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
            },
          },
        },
      };

      setChartData(data);
      setChartOptions(options);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    createPiChart();
  }, []);

  return (
    <Card
      title="Category Wise Product's Count"
      className="card justify-content-center flex p-2"
    >
      <Chart
        type="pie"
        data={chartData}
        options={chartOptions}
        className="md:w-30rem w-full"
      />
    </Card>
  );
}
