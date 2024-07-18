'use client'
import { GET_SELLET, UPDATE_SELLER } from '@/graphql/seller/query';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Seller() {
    const [getSellers,{data, loading,refetch}] = useLazyQuery(GET_SELLET, {fetchPolicy:"no-cache"})
    const [updateSeller] = useMutation(UPDATE_SELLER)
    const [pageData, setPageData] = useState<any>({rows:5,first:0})

    useEffect(()=>{
        getSellers({variables: {limit: pageData.rows, offset:pageData.first}})
    },[])

    useEffect(()=>{
        getSellers({variables: {limit: pageData.rows, offset:pageData.first}})
    },[pageData])

    const updateStatus = async (id:string, status: string)=>{
        try{
            await updateSeller({
                variables: {
                    "updateSellerInput": {
                    "id": id,
                    "status": status
                    }
                }
            })
            refetch()
            Swal.fire({
                title:'Seller Update',
                icon: 'success',
                text: 'Update seller success'
            })
        }catch(err){
            Swal.fire({
                title:'Seller Update',
                icon: 'error',
                text: 'Error on update seller'
            })
        }
    }

    const actionBody = (data:any)=>(
        <Button onClick={()=>updateStatus(data._id, data.status==='active' ? 'INACTIVE':"ACTIVE")} label={data.status === 'active'? 'Inactive': 'Active'} style={{background:data.status==='active'?'red':''}}/>
    )

    const items = [
        { label: 'Seller' },
        { label: 'Seller List' }
    ];

    return (
        <div>
            <BreadCrumb model={items} className='m-4'/>
            <Card className='m-4' >
                <DataTable 
                    lazy
                    loading={loading}
                    rows={pageData?.rows || 5}
                    first={pageData?.first || 1} 
                    totalRecords={data ? data?.sellers?.total: 0} 
                    onPage={(value)=>setPageData(value)} 
                    value={data ? data.sellers.sellers : []} 
                    paginator 
                    rowsPerPageOptions={[5, 10, 25, 50]}
                >
                    <Column field="_id" header="ID"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="mobile" header="Mobile"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field='address' header="Address"/>
                    <Column field="account_name" header="Account Name"></Column>
                    <Column field='account_number' header="Account Number"/>
                    <Column field='bank_code' header="Bank Code"/>
                    <Column field='bank_name' header="Bank Name"/>
                    <Column field='status' header="Status"/>
                    <Column body={actionBody} header="Action"/>
                </DataTable>
            </Card>
        </div>
    )
}