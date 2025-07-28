'use client';

import FileDng from '@/components/file/FileDng';
import { CREATE_BULK_PRODUCT } from '@/graphql/product';
import { useMutation } from '@apollo/client';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';

export default function Page() {
  const fileRef = useRef<any>(null);
  const [clear, setClear] = useState(false);
  const items = [{ label: 'Product' }, { label: 'Bulk Upload' }];
  const [createBulkProduct, { loading }] = useMutation(CREATE_BULK_PRODUCT, {
    fetchPolicy: 'no-cache',
  });
  async function createBulkProductHandler() {
    try {
      if (fileRef?.current?.getFiles()?.length) {
        const file = fileRef.current.getFiles()[0];
        await createBulkProduct({
          variables: {
            bulkProductInput: {
              productFile: file,
            },
          },
        });
        Swal.fire({
          title: 'Bulk Upload',
          text: 'Successfully bulk uploaded products',
          icon: 'success',
        }).then(() => {
          setClear(true);
          window.location.reload();
        });
      }
    } catch (err) {
      Swal.fire({
        title: 'Bulk Upload',
        text: 'Error on bulk upload',
        icon: 'error',
      });
    }
  }
  return (
    <div>
      <BreadCrumb model={items} className="m-4" />
      <Card className="m-4">
        <div
          style={{
            backgroundColor: '#17a2b8',
            color: 'white',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <ul>
            {[
              'Read and follow instructions carefully while preparing data',
              'Download and save the sample file to reduce errors',
              'For adding bulk products file should be .csv format',
              'You can copy image path from media section',
              'Make sure you entered valid data as per instructions before proceed',
            ].map(d => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="">
            <h4>File</h4>
            <FileDng fileUploadRef={fileRef} clear={clear} />
          </div>
        </div>
        <Button
          label="Submit"
          className="mt-3"
          onClick={createBulkProductHandler}
        />
      </Card>
    </div>
  );
}
