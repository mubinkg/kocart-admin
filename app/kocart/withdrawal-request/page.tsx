'use client';

import { useQuery } from '@apollo/client';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { BreadCrumb } from 'primereact/breadcrumb';
import { ADMIN_CUSTOMER_LIST } from '@/graphql/customres';
import { GET_TRANSACTIONS } from '@/graphql/transaction';
import { Button } from 'primereact/button';

export default function Page() {
  const { data: transactionData, refetch } = useQuery(GET_TRANSACTIONS, {
    variables: { limit: 1000, offset: 0 },
  });

  const items = [
    { label: 'Transaction' },
    { label: 'Withdrawal Request List' },
  ];

  return (
    <div>
      <BreadCrumb model={items} className="m-4" />
      <Card className="m-4 p-2">
        <Button
          label="Send Withdrawal Request"
          className="mb-4"
          outlined
        ></Button>
        <DataTable
          lazy
          totalRecords={
            transactionData?.transactions?.count
              ? transactionData?.transactions?.count
              : 0
          }
          onPage={value => console.log(value)}
          value={
            transactionData?.transactions?.transactionList
              ? transactionData?.transactions?.transactionList
              : []
          }
          paginator
          rows={1000}
          rowsPerPageOptions={[1000, 2000, 2500, 5000]}
        >
          <Column field="_id" header="ID"></Column>
          <Column field="user.name" header="Username"></Column>
          <Column field="type" header="Type"></Column>
          <Column field="amount" header="Payment Address"></Column>
          <Column field="status" header="Amount Requested"></Column>
          <Column field="message" header="Remarks"></Column>
          <Column field="message" header="Status"></Column>
          <Column field="createdAt" header="Date"></Column>
        </DataTable>
      </Card>
    </div>
  );
}
