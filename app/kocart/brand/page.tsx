'use client'
import { CREATE_BRAND, GET_BRANDS } from "@/graphql/brand/query";
import { useMutation, useQuery } from "@apollo/client";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";

export default function Brand() {
    const { data, loading, error , refetch} = useQuery(GET_BRANDS, { variables: { limit: 100, offset: 0 } })
    const [createBrand, {loading:brandLoading, error:brandError}] = useMutation(CREATE_BRAND)
    const [visible, setVisible] = useState(false)
    const fileUploadRef = useRef<FileUpload>(null);
    const [name, setName] = useState('')

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
            await refetch()
            setVisible(false)
        }catch(err){
    
        }
    }

    const items = [
        { label: 'Brand' },
        { label: 'Brand List' }
    ];

    const brandImageRenderer = (item: any) => <Image src={item?.image} alt="Brand Image" width="200"/>

    return (
        <div>
            <BreadCrumb model={items} className="m-4" />
            <Card className="m-4">
                <Button label="Add New" className="mb-4" onClick={() => setVisible(true)} />
                <DataTable lazy totalRecords={data ? data?.brands?.total : 0} onPage={(value) => console.log(value)} value={data?.brands?.brands ? data?.brands?.brands : []} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
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