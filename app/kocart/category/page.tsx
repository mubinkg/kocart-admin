'use client'
import { CREATE_CATEGROY, GET_CATEGORIES } from "@/graphql/category/query";
import { getIsAdmin } from "@/util/storageUtils";
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
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";

export default function Category() {
    const { data, error, loading, refetch } = useQuery(GET_CATEGORIES, { variables: { getCategoriesInput: { limit: 100, offset: 0 } } })
    const [createCategory,{data:createCategoryData, error:createCategoryError, loading:careateCategoryLoading}] = useMutation(CREATE_CATEGROY)
    const [name, setName] = useState('')
    const [visible, setVisible] = useState(false)
    const imageRef = useRef<any>(null)
    const bannerRef = useRef<any>(null)
    const toast = useRef<any>(null)
    const [isAdmin, setAdmin] = useState(false)

    const showError = () => {
        toast.current?.show({severity:'error', summary: 'Error', detail:'Message Content', life: 3000});
    }

    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
    }

    const categoryImageRenderer = (url:any)=> <Image alt="Category Image" width="100" src={url}/>

    const items = [
        { label: 'Category' },
        { label: 'Category List' }
    ];

    const createCategoryHandler = async ()=>{
        try{
            console.log(imageRef?.current?.getFiles())
            if(!name && !imageRef?.current?.getFiles()?.length){
                throw new Error()
            }
            await createCategory({variables: {
                "createCategoryInput": {
                  "banner": bannerRef?.current.getFiles() ? bannerRef?.current?.getFiles()[0]: null,
                  "image": imageRef?.current?.getFiles()[0],
                  "name": name,
                  "parent": null
                }
              }})
            await refetch()
            showSuccess()
            setVisible(false)
            setName('')
        }
        catch(err){
            showError()
        }
    }

    useEffect(()=>{
        setAdmin(getIsAdmin())
    }, [])

    return (
        <div>
            <BreadCrumb model={items} className="m-4" />
            <Toast ref={toast} />
            <Card className="m-4">
                {isAdmin && <Button label="Add New" className="mb-3" onClick={()=>setVisible(true)}/>}
                <DataTable lazy totalRecords={data?.getAdminCategories?.count ? data?.getAdminCategories?.count : 0} onPage={(value) => console.log(value)} value={data?.getAdminCategories?.categories ? data?.getAdminCategories?.categories : []} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
                    <Column field="_id" header="ID"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="order" header="Order"></Column>
                    <Column body={(item)=>categoryImageRenderer(item?.image)} header="Image"></Column>
                    <Column body={(item)=>categoryImageRenderer(item?.banner)} header="Banner"></Column>
                    <Column field="status" header="Status"></Column>
                </DataTable>
            </Card>
            <Dialog header="Create New Category" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <div className="flex flex-column">
                    <p className="mb-2 font-semibold">Brand Name</p>
                    <InputText value={name} onChange={(e)=>setName(e.target.value)} className="w-full block" id="username" placeholder="Enter brand name" />
                </div>
                <div className="flex flex-column">
                    <p className="my-3 font-semibold">Category Image</p>
                    <FileUpload className="w-full" ref={imageRef}/>
                </div>
                <div className="flex flex-column">
                    <p className="my-3 font-semibold">Category Banner</p>
                    <FileUpload className="w-full" ref={bannerRef}/>
                </div>
                <Button label={careateCategoryLoading? "Loading...":"Submit"} disabled={careateCategoryLoading} className="my-3" onClick={createCategoryHandler}/>
            </Dialog>
        </div>
    )
}