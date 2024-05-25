'use client'
import { CREATE_BRAND, GET_BRANDS } from "@/graphql/brand/query";
import { getIsAdmin } from "@/util/storageUtils";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

export default function Brand() {
    const [getBrands, {data,loading,error}] = useLazyQuery(GET_BRANDS, { fetchPolicy: "no-cache"})
    const [createBrand, {loading:brandLoading, error:brandError}] = useMutation(CREATE_BRAND)
    const [visible, setVisible] = useState(false)
    const fileUploadRef = useRef<FileUpload>(null);
    const [name, setName] = useState('')
    const [pageData, setPageData] = useState<any>({})
    const [isAdmin, setAdmin] = useState(false)

    const createBrandHandler = async ()=>{
        try{
            if(fileUploadRef.current){
                const file = fileUploadRef.current?.getFiles()
                const brandImage = file[0]
                await createBrand({
                    variables: {
                        "createBrandInput": {
                          "image": brandImage,
                          "name": name
                        }
                      }
                })
            }
            await getBrandList({limit:5, offset:0})
            setVisible(false)
        }catch(err){
    
        }
    }

    const getBrandList = async ({limit, offset}:{limit:number,offset:number})=>{
        try{
            await getBrands({
                variables: {
                    limit:limit,offset:offset
                }
            })
        }catch(err){
            Swal.fire({
                title: "Brand List",
                text: 'Error on fetching brand list.',
                icon: 'error'
            })
        }
    }

    useEffect(()=>{
        getBrandList({limit: 5, offset:0})
        setAdmin(getIsAdmin())
    }, [])

    useEffect(()=>{
        if(Object.entries(pageData).length){
            getBrandList({limit:pageData?.rows,offset:pageData?.first})
        }
    }, [pageData])

    const items = [
        { label: 'Brand' },
        { label: 'Brand List' }
    ];

    const brandImageRenderer = (item: any) => <Image src={item?.image} alt="Brand Image" width="200"/>

    return (
        <div>
            <BreadCrumb model={items} className="m-4" />
            <Card className="m-4">
                {isAdmin ? <Button label="Add New" className="mb-4" onClick={() => setVisible(true)} />:""}
                <DataTable 
                    lazy 
                    loading={loading}
                    rows={pageData?.rows || 5}
                    first={pageData?.first || 1} 
                    totalRecords={data?.adminBrandList?.total ? data?.adminBrandList?.total : 0} 
                    onPage={(values) => setPageData(values)} 
                    value={data?.adminBrandList?.brands ? data?.adminBrandList?.brands : []} 
                    paginator
                    rowsPerPageOptions={[5, 10, 25, 50]}
                >
                    <Column field="_id" header="ID"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column body={brandImageRenderer} header="Image"></Column>
                </DataTable>
            </Card>

            <Dialog header="Create New Brand" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <div className="flex flex-column">
                    <p className="mb-2 font-semibold">Brand Name</p>
                    <InputText value={name} onChange={(e)=>setName(e.target.value)} className="w-full block" id="username" placeholder="Enter brand name" />
                </div>
                <div className="flex flex-column">
                    <p className="my-3 font-semibold">Brand Image</p>
                    <FileUpload className="w-full" ref={fileUploadRef}/>
                </div>
                <Button label="Submit" className="my-3" onClick={createBrandHandler}/>
            </Dialog>
        </div>
    )
}