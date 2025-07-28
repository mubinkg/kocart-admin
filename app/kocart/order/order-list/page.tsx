'use client';

import { GET_ORDER_LIST } from '@/graphql/order';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

export default function OrderList() {
  const navigation = useRouter();
  const toast = useRef<any>(null);
  const [pageData, setPageData] = useState<any>({ rows: 5, first: 0 });
  const showError = (message: string) => {
    toast.current.show({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 3000,
    });
  };
  const [getOrders, { data, error, loading }] = useLazyQuery(GET_ORDER_LIST, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (error) {
      showError('Error on fetching order list.');
    }
  }, [error]);

  useEffect(() => {
    getOrders({
      variables: {
        adminOrderListInput: {
          end_date: null,
          payment_method: null,
          product_type: null,
          start_date: null,
          status: null,
          limit: pageData.rows,
          offset: pageData.first,
        },
      },
    });
  }, [, pageData]);

  const items = [{ label: 'Order' }, { label: 'Order List' }];

  const orderAction = (item: any) => (
    <div className="flex-column flex">
      <i
        className="pi pi-eye mb-3"
        style={{ cursor: 'pointer' }}
        onClick={() => navigation.push(`/kocart/order/${item._id}`)}
      />
      <i
        className="pi pi-trash mb-3"
        style={{ cursor: 'pointer' }}
        onClick={() =>
          Swal.fire({
            title: 'Delete Order',
            text: 'Are you sure to delete this order',
            showCancelButton: true,
            cancelButtonColor: 'green',
            confirmButtonColor: 'red',
            confirmButtonText: 'Delete',
          }).then(res => {
            console.log(res);
          })
        }
      />
      <i className="pi pi-file mb-3" style={{ cursor: 'pointer' }} />
      <i className="pi pi-map-marker" style={{ cursor: 'pointer' }} />
    </div>
  );

  return (
    <div>
      <BreadCrumb model={items} className="m-4" />
      <Toast ref={toast} />
      <Card className="m-4">
        <DataTable
          lazy
          loading={loading}
          rows={pageData?.rows || 5}
          first={pageData?.first || 1}
          totalRecords={
            data?.getAdminOrderList?.count ? data?.getAdminOrderList?.count : 0
          }
          value={
            data?.getAdminOrderList?.orders
              ? data?.getAdminOrderList?.orders
              : []
          }
          onPage={value => setPageData(value)}
          paginator
          rowsPerPageOptions={[5, 10, 20, 50]}
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
          <Column body={item => orderAction(item)} header="Action" />
        </DataTable>
      </Card>
    </div>
  );
}
