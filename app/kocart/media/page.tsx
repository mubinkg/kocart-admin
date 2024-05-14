'use client'

import FileDng from "@/components/file/FileDng";
import { CREATE_MEDIA } from "@/graphql/media/indes";
import { useMutation } from "@apollo/client";
import { extname } from "path";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";


const items = [
    { label: 'Media' },
    { label: 'Media List' }
];

export default function Page(){
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
    }, [data, error])
    
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

    return(
        <div>
            <BreadCrumb model={items} className="m-4" />
            <Toast ref={toast} />
            <Card className="m-4">  
                <FileDng fileUploadRef={fileRef} clear={clear}/>
                <Button onClick={createMediaHandler} label={loading?"Loading...": "Upload"} className="mt-4"/>
            </Card>
        </div>
    )
}