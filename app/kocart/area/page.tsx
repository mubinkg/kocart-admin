'use client';
import { CREATE_AREA, GET_ADMIN_AREA_LIST } from '@/graphql/area';
import { ADMIN_CITY_LIST } from '@/graphql/city';
import { useGetCities } from '@/hooks/area/useGetCities';
import { useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import * as yup from 'yup';

const schema = yup.object().shape({
  area_name: yup.string().required(),
  city_id: yup.object().required(),
  minimum_free_delivery_order_amount: yup.number().required(),
  delivery_charges: yup.number().required(),
});

export default function Page() {
  const {
    setValue,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<any>({
    resolver: yupResolver(schema),
  });

  const { getCities } = useGetCities();

  const loadCityOptions: any = async (val: string, callback: any) => {
    const res = await getCities({
      variables: {
        limit: 10,
        offset: 0,
        query: val,
      },
    });
    const cities = res?.data?.adminCityList?.cities || [];
    callback(cities.map((d: any) => ({ label: d.city_name, value: d._id })));
  };

  const [visible, setVisible] = useState(false);
  const [createCity] = useMutation(CREATE_AREA);

  const { data, refetch, loading } = useQuery(GET_ADMIN_AREA_LIST, {
    fetchPolicy: 'no-cache',
    variables: {
      limit: 1000,
      offset: 0,
      query: '',
    },
  });

  async function createAreaHandler(value: any) {
    try {
      await createCity({
        variables: {
          createAreaInput: {
            ...value,
          },
        },
      });
      await refetch({
        limit: 1000,
        offset: 0,
        query: '',
      });
      setVisible(false);
      reset();
    } catch (err) {
    }
  }

  function submitHandler(values: any) {
    values.city_id = values?.city_id?.value;
    createAreaHandler(values);
  }

  return (
    <Card className="m-4">
      <Button
        label="Add New"
        onClick={() => setVisible(true)}
        className="mb-4"
      />
      <DataTable
        value={data?.getAdminArea?.areas ? data?.getAdminArea?.areas : []}
        totalRecords={data?.getAdminArea?.count ? data?.getAdminArea?.count : 0}
        lazy
        paginator
        rows={1000}
        rowsPerPageOptions={[1000, 2000, 5000]}
      >
        <Column field="_id" header="ID" />
        <Column field="area_name" header="Name" />
        <Column field="delivery_charges" header="Delivery Charge" />
        <Column
          field="minimum_free_delivery_order_amount"
          header="Minumim Free Delivery Order Amount"
        />
      </DataTable>

      <Dialog
        header="Create New Area"
        visible={visible}
        onHide={() => setVisible(false)}
        className="w-6"
      >
        <div className="flex-column flex">
          <p className="mb-2 font-semibold">
            Area Name <span className="text-red-500">*</span>
          </p>
          <Controller
            name="area_name"
            control={control}
            render={({ field }) => (
              <InputText
                style={{ border: errors.area_name ? '1px solid red' : '' }}
                {...field}
                className="block w-full"
                id="cityname"
                placeholder="Enter area name"
              />
            )}
          />
        </div>
        <div className="flex-column flex">
          <p className="mb-2 font-semibold">
            City <span className="text-red-500">*</span>
          </p>
          <Controller
            name="city_id"
            control={control}
            render={({ field }) => (
              <AsyncSelect
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    border: errors.area_name ? '1px solid red' : '',
                  }),
                }}
                {...field}
                loadOptions={loadCityOptions}
              />
            )}
          />
        </div>
        <div className="flex-column flex">
          <p className="mb-2 font-semibold">
            Minimum Free Delivery Order Amount{' '}
            <span className="text-red-500">*</span>
          </p>
          <Controller
            name="minimum_free_delivery_order_amount"
            control={control}
            render={({ field }) => (
              <InputNumber
                style={{ border: errors.area_name ? '1px solid red' : '' }}
                {...field}
                value={field?.value || 0}
                onChange={e => {
                  setValue('minimum_free_delivery_order_amount', e.value);
                }}
              />
            )}
          />
        </div>
        <div className="flex-column flex">
          <p className="mb-2 font-semibold">
            Delivery Charges <span className="text-red-500">*</span>
          </p>
          <Controller
            name="delivery_charges"
            control={control}
            render={({ field }) => (
              <InputNumber
                style={{ border: errors.area_name ? '1px solid red' : '' }}
                {...field}
                value={field?.value}
                onChange={e => {
                  setValue('delivery_charges', e.value);
                }}
              />
            )}
          />
        </div>
        <Button
          onClick={handleSubmit(submitHandler)}
          disabled={loading}
          label={loading ? 'Loading...' : 'Submit'}
          className="mt-4"
        />
      </Dialog>
    </Card>
  );
}
