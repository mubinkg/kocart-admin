'use client';
import { CREATE_CATEGROY, GET_CATEGORIES } from '@/graphql/category/query';
import { getIsAdmin } from '@/util/storageUtils';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { Image } from 'primereact/image';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';

export default function Category() {
  const [getCategories, { data, error, loading, refetch }] = useLazyQuery(
    GET_CATEGORIES,
    { fetchPolicy: 'no-cache' },
  );
  const [
    createCategory,
    {
      data: createCategoryData,
      error: createCategoryError,
      loading: careateCategoryLoading,
    },
  ] = useMutation(CREATE_CATEGROY);
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false);
  const imageRef = useRef<any>(null);
  const bannerRef = useRef<any>(null);
  const toast = useRef<any>(null);
  const [isAdmin, setAdmin] = useState(false);
  const [pageData, setPageData] = useState<any>({ rows: 5, first: 0 });

  useEffect(() => {
    getCategories({
      variables: {
        getCategoriesInput: { limit: pageData.rows, offset: pageData.first },
      },
    });
  }, []);

  useEffect(() => {
    getCategories({
      variables: {
        getCategoriesInput: { limit: pageData.rows, offset: pageData.first },
      },
    });
  }, [pageData]);

  const showError = () => {
    toast.current?.show({
      severity: 'error',
      summary: 'Error',
      detail: 'Message Content',
      life: 3000,
    });
  };

  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
      life: 3000,
    });
  };

  const categoryImageRenderer = (url: any) => (
    <Image alt="Category Image" width="100" src={url} />
  );

  const items = [{ label: 'Category' }, { label: 'Category List' }];

  const createCategoryHandler = async () => {
    try {
      console.log(imageRef?.current?.getFiles());
      if (!name && !imageRef?.current?.getFiles()?.length) {
        throw new Error();
      }
      await createCategory({
        variables: {
          createCategoryInput: {
            banner: bannerRef?.current.getFiles()
              ? bannerRef?.current?.getFiles()[0]
              : null,
            image: imageRef?.current?.getFiles()[0],
            name: name,
            parent: null,
          },
        },
      });
      await refetch();
      showSuccess();
      setVisible(false);
      setName('');
    } catch (err) {
      showError();
    }
  };

  useEffect(() => {
    setAdmin(getIsAdmin());
  }, []);

  return (
    <div>
      <BreadCrumb model={items} className="m-4" />
      <Toast ref={toast} />
      <Card className="m-4">
        {isAdmin && (
          <Button
            label="Add New"
            className="mb-3"
            onClick={() => setVisible(true)}
          />
        )}
        <DataTable
          lazy
          loading={loading}
          rows={pageData?.rows || 5}
          first={pageData?.first || 1}
          totalRecords={
            data?.getAdminCategories?.count
              ? data?.getAdminCategories?.count
              : 0
          }
          onPage={value => setPageData(value)}
          value={
            data?.getAdminCategories?.categories
              ? data?.getAdminCategories?.categories
              : []
          }
          paginator
          rowsPerPageOptions={[5, 10, 25, 50]}
        >
          <Column field="_id" header="ID"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="order" header="Order"></Column>
          <Column
            body={item => categoryImageRenderer(item?.image)}
            header="Image"
          ></Column>
          <Column
            body={item => categoryImageRenderer(item?.banner)}
            header="Banner"
          ></Column>
          <Column field="status" header="Status"></Column>
        </DataTable>
      </Card>
      <Dialog
        header="Create New Category"
        visible={visible}
        style={{ width: '50vw' }}
        onHide={() => setVisible(false)}
      >
        <div className="flex-column flex">
          <p className="mb-2 font-semibold">Category Name</p>
          <InputText
            value={name}
            onChange={e => setName(e.target.value)}
            className="block w-full"
            id="username"
            placeholder="Enter brand name"
          />
        </div>
        <div className="flex-column flex">
          <p className="my-3 font-semibold">Category Image</p>
          <FileUpload className="w-full" ref={imageRef} />
        </div>
        <div className="flex-column flex">
          <p className="my-3 font-semibold">Category Banner</p>
          <FileUpload className="w-full" ref={bannerRef} />
        </div>
        <Button
          label={careateCategoryLoading ? 'Loading...' : 'Submit'}
          disabled={careateCategoryLoading}
          className="my-3"
          onClick={createCategoryHandler}
        />
      </Dialog>
    </div>
  );
}
