'use client';

import { CREATE_CITY } from '@/graphql/city';
import {
  CREATE_TICKET_TYPE,
  DELETE_TICKET_TYPE,
  GET_TICKET_TYPES,
  UPDATE_TICKET_TYPE,
} from '@/graphql/ticket';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Page() {
  const [createTicket, { loading: loadingTicketType }] =
    useMutation(CREATE_TICKET_TYPE);
  const [updateTicketType, { loading: updateTicketTypeLoading }] =
    useMutation(UPDATE_TICKET_TYPE);
  const [getTickets, { data, loading }] = useLazyQuery(GET_TICKET_TYPES, {
    fetchPolicy: 'no-cache',
  });
  const [deleteTicketType, { loading: deleteTicketTypeLoading }] =
    useMutation(DELETE_TICKET_TYPE);

  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [pageData, setPageData] = useState<any>(null);
  const [updateTitle, setUpdateTitle] = useState<string>('');
  const [id, setId] = useState<string>('');

  async function createCityHandler() {
    try {
      await createTicket({
        variables: {
          createTicketTypeInput: {
            title: title,
          },
        },
      });
      await getTickets({
        variables: {
          limit: 5,
          offset: 0,
        },
      });
      setTitle('');
      setVisible(false);
    } catch (err) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Error on create a ticket type',
      });
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
    await getTickets({
      variables: {
        limit: limit,
        offset: offset,
      },
    });
  }

  function deleteTicketTypeHandler(id: string) {
    Swal.fire({
      title: 'Are You Sure!',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      cancelButtonColor: 'red',
      confirmButtonColor: 'blue',
      confirmButtonText: 'Yes, delete it!',
    }).then(async res => {
      if (res.isConfirmed) {
        deleteTicketType({
          variables: {
            deleteTicketTypeId: id,
          },
        });
        await getTickets({
          variables: {
            limit: 5,
            offset: 0,
          },
        });
      }
    });
  }

  async function updateTicketTypeHandler() {
    try {
      await updateTicketType({
        variables: {
          updateTicketTypeInput: {
            id: id,
            title: updateTitle,
          },
        },
      });
      setUpdateTitle('');
      setId('');
      setUpdateVisible(false);
      await getTickets({
        variables: {
          limit: 5,
          offset: 0,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  function ticketAction(item: any) {
    return (
      <div>
        <i
          onClick={() => {
            setUpdateTitle(item.title);
            setUpdateVisible(true);
            setId(item._id);
          }}
          className="pi pi-pen-to-square mr-3 cursor-pointer"
        ></i>
        <i
          onClick={() => deleteTicketTypeHandler(item._id)}
          className="pi pi-trash cursor-pointer"
        ></i>
      </div>
    );
  }

  return (
    <div>
      <h1 className="ml-4 font-light">Manage Ticket Types</h1>
      <Card className="m-4">
        <Button
          label="Add New"
          onClick={() => setVisible(true)}
          className="mb-4"
        />
        <DataTable
          value={
            data?.getAdminTicketTypes?.ticketTypes
              ? data?.getAdminTicketTypes?.ticketTypes
              : []
          }
          totalRecords={
            data?.getAdminTicketTypes?.count
              ? data?.getAdminTicketTypes?.count
              : 0
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
          <Column field="title" header="Title" />
          <Column body={ticketAction} header="Action" />
        </DataTable>

        <Dialog
          position="top"
          header="Ticket Types"
          visible={visible}
          onHide={() => setVisible(false)}
          className="w-6"
        >
          <div className="flex-column flex">
            <p className="mb-2 font-semibold">Title</p>
            <InputText
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="block w-full"
              id="cityname"
              placeholder="Enter ticket title"
            />
          </div>
          <Button
            disabled={loadingTicketType}
            label={loadingTicketType ? 'Loading...' : 'Submit'}
            className="mt-4"
            onClick={createCityHandler}
          />
        </Dialog>
        <Dialog
          position="top"
          header="Update Ticket Types"
          visible={updateVisible}
          onHide={() => setUpdateVisible(false)}
          className="w-6"
        >
          <div className="flex-column flex">
            <p className="mb-2 font-semibold">Title</p>
            <InputText
              value={updateTitle}
              onChange={e => setUpdateTitle(e.target.value)}
              className="block w-full"
              id="cityname"
              placeholder="Enter ticket title"
            />
          </div>
          <Button
            disabled={updateTicketTypeLoading}
            label={updateTicketTypeLoading ? 'Loading...' : 'Submit'}
            className="mt-4"
            onClick={updateTicketTypeHandler}
          />
        </Dialog>
      </Card>
    </div>
  );
}
