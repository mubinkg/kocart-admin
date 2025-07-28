'use client';
import { ADMIN_CITY_LIST, CREATE_CITY } from '@/graphql/city';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';

export default function Page() {
  const [createCity] = useMutation(CREATE_CITY);
  const [getCities, { data, loading }] = useLazyQuery(ADMIN_CITY_LIST, {
    fetchPolicy: 'no-cache',
  });

  const [visible, setVisible] = useState(false);
  const [name, setName] = useState<string>('');
  const [pageData, setPageData] = useState<any>(null);

  async function createCityHandler() {
    try {
      await createCity({
        variables: {
          createCityInput: {
            city_name: name,
          },
        },
      });
      await getCities({
        variables: {
          limit: 5,
          offset: 0,
          query: '',
        },
      });
      setName('');
      setVisible(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (pageData) {
      pageChangeHandler(pageData?.rows, pageData?.first);
    }
  }, [pageData]);

  useEffect(() => {
    pageChangeHandler(5, 0);
  }, []);

  async function pageChangeHandler(limit: any, offset: any) {
    await getCities({
      variables: {
        limit: limit,
        offset: offset,
        query: '',
      },
    });
  }

  return (
    <Card className="m-4">
      <Button
        label="Add New"
        onClick={() => setVisible(true)}
        className="mb-4"
      />
      <DataTable
        value={data?.adminCityList?.cities ? data?.adminCityList?.cities : []}
        totalRecords={
          data?.adminCityList?.count ? data?.adminCityList?.count : 0
        }
        lazy
        paginator
        rows={pageData?.rows || 5}
        first={pageData?.first || 1}
        rowsPerPageOptions={[5, 10, 20, 50]}
        onPage={value => setPageData(value)}
        loading={loading}
      >
        <Column field="_id" header="ID" />
        <Column field="city_name" header="Name" />
      </DataTable>

      <Dialog
        header="Create New City"
        visible={visible}
        onHide={() => setVisible(false)}
        className="w-6"
      >
        <div className="flex-column flex">
          <p className="mb-2 font-semibold">City Name</p>
          <InputText
            value={name}
            onChange={e => setName(e.target.value)}
            className="block w-full"
            id="cityname"
            placeholder="Enter city name"
          />
        </div>
        <Button
          disabled={loading}
          label={loading ? 'Loading...' : 'Submit'}
          className="mt-4"
          onClick={createCityHandler}
        />
      </Dialog>
    </Card>
  );
}
