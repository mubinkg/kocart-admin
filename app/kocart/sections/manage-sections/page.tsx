'use client'
import { FeaturedSectionType, ProductTypes, SectionStyle } from "@/data/featured-section/types";
import { CREATE_BRAND, GET_BRANDS } from "@/graphql/brand/query";
import { getIsAdmin } from "@/util/storageUtils";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select'
import Swal from "sweetalert2";

export default function Page() {
    const {register, control, handleSubmit} = useForm<FeaturedSectionType>({
        defaultValues:{
            title: "",
            description: "",
            categories: [],
            style: SectionStyle.DEFAULT,
            productType: ProductTypes.CUSTOM_PRODUCT,
            products: []
        }
    })
    const [getBrands, {data,loading}] = useLazyQuery(GET_BRANDS, { fetchPolicy: "no-cache"})
    const [visible, setVisible] = useState(false)
    const [pageData, setPageData] = useState<any>({})
    const [isAdmin, setAdmin] = useState(false)


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

    const submitHandler = (data:any)=>{
        console.log(data)
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
        { label: 'Featured Sections' },
        { label: 'Manage Sections' }
    ];

    const brandImageRenderer = (item: any) => <Image src={item?.image} alt="Brand Image" width="200"/>

    return (
        <div>
            <BreadCrumb model={items} className="m-4" />
            <Card className="m-4" title="Featured Sections">
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
                    <p className="mb-2 font-semibold">Title for section <span style={{color: "red"}}>*</span></p>
                    <InputText {...register('title')} className="w-full block" id="username" placeholder="Title" />
                </div>
                <div className="flex flex-column">
                    <p className="mb-2 font-semibold">Short description <span style={{color: "red"}}>*</span></p>
                    <InputText {...register('description')} className="w-full block" id="username" placeholder="Short Description" />
                </div>
                <div className="flex flex-column">
                    <p className="mb-2 font-semibold">Categories</p>
                    <Controller
                        name="categories"
                        control={control}
                        render={({field})=> <Select {...field}/>}
                    />
                </div>
                <div className="flex flex-column">
                    <p className="mb-2 font-semibold">Style <span style={{color: "red"}}>*</span></p>
                    <Select/>
                </div>
                <div className="flex flex-column">
                    <p className="mb-2 font-semibold">Product Types <span style={{color: "red"}}>*</span></p>
                    <Select/>
                </div>
                <div className="flex flex-column">
                    <p className="mb-2 font-semibold">Products <span style={{color: "red"}}>*</span></p>
                    <Select/>
                </div>
                <Button  label={"Submit"} className="my-3" onClick={handleSubmit(submitHandler)}/>
            </Dialog>
        </div>
    )
}