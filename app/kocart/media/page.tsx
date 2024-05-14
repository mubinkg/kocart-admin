'use client'

import FileDng from "@/components/file/FileDng";
import { CREATE_MEDIA, DELETE_MEDIA, GET_MEDIA } from "@/graphql/media/indes";
import { useMutation, useQuery } from "@apollo/client";
import { extname } from "path";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Image } from "primereact/image";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";


const items = [
    { label: 'Media' },
    { label: 'Media List' }
];

export default function Page(){
    const {data:mediaList, refetch} = useQuery(GET_MEDIA)
    const [deleteMedia, {data:deleteMediaData}] = useMutation(DELETE_MEDIA)
    const fileRef = useRef<any>(null)
    const toast = useRef<any>(null)
    const [clear, setClear] = useState(false)
    const [createMedia, {data, loading, error}] = useMutation(CREATE_MEDIA)

    const show = ({message, label, icon}:{message:string, label: string, icon:string}) => {
        toast.current.show({ severity: icon, summary: label, detail: message });
    };

    useEffect(()=>{
        if(data){
            show({
                message: 'Media create successfull.',
                icon: 'info',
                label:"Info"
            })
            fileRef.current.value = null
            setClear((old)=>!old)
        }
        if(deleteMediaData){
            show({
                message: 'Media deleted successfully.',
                icon: 'info',
                label:"Info"
            })
            refetch()
        }
    }, [data, error, deleteMediaData])
    
    function createMediaHandler(){
        if(fileRef?.current?.getFiles()?.length){
            const file = fileRef.current.getFiles()[0]
            const fileName = file?.name
            const extension = extname(fileName).split('.')[1]
            const size = file?.size
            createMedia({
                variables: {
                    "createMediaInput": {
                      "file": file,
                      "extension":extension,
                      "name": fileName,
                      "size": size,
                      "subDirectory": "/"
                    }
                  }
            })
        }else{
            show({
                message: 'Please select a file.',
                icon: "danger",
                label: "Error"
            })
        }
    }

    function deleteMediaHandler(id:any){
        Swal.fire({
            title:'Media',
            text: 'Are you sure to delete this media content?',
            icon: "warning"
        }).then((res)=>{
            if(res.isConfirmed){
                deleteMedia({
                    variables: {
                        "removeMediaId": id
                    }
                })
            }
        }).catch(()=>{
            Swal.fire({
                title: "Media",
                text: 'Error on deleting media content',
                icon: "error"
            })
        })
    }

    const brandImageRenderer = (item: any) => <Image src={item?.file} alt="Brand Image" width="200"/>
    const mediaSizeRenderer = (item:any)=><p>{item.size/1000} kb</p>
    const mediaNameRenderer = (item:any)=><p style={{maxWidth: "150px", wordWrap: "break-word"}}>{item.name}</p>
    const mediaActionRenderer = (item:any)=>(
        <div>
            <i className="pi pi-trash cursor-pointer" onClick={()=>deleteMediaHandler(item?._id)}/>
        </div>
    )

    return(
        <div>
            <BreadCrumb model={items} className="m-4" />
            <Toast ref={toast} />
            <Card className="m-4">  
                <FileDng fileUploadRef={fileRef} clear={clear}/>
                <Button onClick={createMediaHandler} label={loading?"Loading...": "Upload"} className="mt-4"/>
                <DataTable 
                    totalRecords={mediaList?.adminMedia?.count?mediaList?.adminMedia?.count:0}
                    value={mediaList?.adminMedia?.media?mediaList?.adminMedia?.media:[]}
                    lazy
                    paginator 
                    rows={1000} 
                    rowsPerPageOptions={[1000, 2000, 30000]}
                    className="mt-4"
                >
                    <Column field="_id" header="ID"/>
                    <Column body={mediaNameRenderer} header="Name"/>
                    <Column body={brandImageRenderer} header="Image"/>
                    <Column field="extension" header="Extension"/>
                    <Column field="subDirectory" header="Subdirectory"/>
                    <Column body={mediaSizeRenderer} header="Size"/>
                    <Column body={mediaActionRenderer} header="Action"/>
                </DataTable>
            </Card>
        </div>
    )
}