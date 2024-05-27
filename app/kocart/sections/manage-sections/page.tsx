'use client'
import { FeaturedSectionType, ProductTypes, SectionStyle } from "@/data/featured-section/types";
import { OptionType } from "@/data/product/types";
import { CREATE_BRAND, GET_BRANDS } from "@/graphql/brand/query";
import { CREATE_FEATURED_SECTION, GET_ADMIN_SECTIONS, GET_ALL_CATEGORY, GET_PRODUCT_FOR_FEATURED_SECTION } from "@/graphql/fetured-section";
import { productTypeOptions, styleOptions } from "@/graphql/fetured-section/data";
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
import AsyncSelect from 'react-select/async'
import Swal from "sweetalert2";

export default function Page() {
    const { register, control, handleSubmit, watch, reset } = useForm<FeaturedSectionType>({
        defaultValues: {
            title: "",
            description: "",
            categories: [],
            style: {},
            productType: {},
            products: []
        }
    })

    const { data: categoryList } = useQuery(GET_ALL_CATEGORY, { fetchPolicy: "no-cache" })
    const [getProduct] = useLazyQuery(GET_PRODUCT_FOR_FEATURED_SECTION)
    const [createFeaturedSection, {loading:createFeaturedSectionLoading}] = useMutation(CREATE_FEATURED_SECTION)

    const [getSections, { data, loading }] = useLazyQuery(GET_ADMIN_SECTIONS, { fetchPolicy: "no-cache" })
    const [visible, setVisible] = useState(false)
    const [pageData, setPageData] = useState<any>({})
    const [isAdmin, setAdmin] = useState(false)

    useEffect(() => {
        if (watch('productType')) {
            const productType = watch('productType').value
            const categories = watch('categories')?.map((d: OptionType) => d.value)
            const query: Record<string, any> = {}
            if (categories) {
                query['categories'] = categories
            }
            if (productType === 'DIGITAL_PRODUCT') {
                query['productType'] = productType
            }
            getProduct({
                variables: {
                    adminFeaturedSectionProductFilterInput: {
                        ...query,
                        limit: 10,
                        offset: 0
                    }
                }
            })
        }
    }, [watch('productType'), watch('categories')])

    const loadProductOptions: any = async (val: string, callback: any) => {
        if (watch('productType')) {
            const productType = watch('productType').value
            const categories = watch('categories')?.map((d: OptionType) => d.value)
            const query: Record<string, any> = {}
            if (categories) {
                query['categories'] = categories
            }
            if (productType === 'DIGITAL_PRODUCT') {
                query['productType'] = productType
            }
            const res = await getProduct({
                variables: {
                    adminFeaturedSectionProductFilterInput: {
                        ...query,
                        limit: 10,
                        offset: 0
                    }
                }
            })

            const products = res?.data?.getProductsForFeaturedSections || []
            callback(products.map((d: any) => ({ label: d.pro_input_name, value: d._id })))
        }
    }


    const getSectionList = async ({ limit, offset }: { limit: number, offset: number }) => {
        try {
            await getSections({
                variables: {
                    limit: limit, offset: offset, query:""
                }
            })
        } catch (err) {
            Swal.fire({
                title: "Brand List",
                text: 'Error on fetching brand list.',
                icon: 'error'
            })
        }
    }

    const submitHandler = async (data: FeaturedSectionType) => {
        try{
            const values:Record<string, any> = {}
            values['title'] = data.title
            values['description'] = data.description
            values['productType'] = data.productType.value
            values['style'] = data.style.value
            if(data?.categories && data.categories.length){
                values['categories'] = data.categories.map(d=>d.value)
            }
            if(data?.products && data.products.length){
                values['products'] = data.products.map((d:OptionType)=>d.value)
            }

            await createFeaturedSection({
                variables:{
                    createSectionInput:values
                }
            })
            await getSectionList({limit:5, offset:0})
            reset()
            setVisible(false)
        }
        catch(err){
            Swal.fire({
                title:"Featured Section",
                text:'Error on create featured section',
                icon:"warning"
            })
        }
    }

    useEffect(() => {
        getSectionList({ limit: 5, offset: 0 })
        setAdmin(getIsAdmin())
    }, [])

    useEffect(() => {
        if (Object.entries(pageData).length) {
            getSectionList({ limit: pageData?.rows, offset: pageData?.first })
        }
    }, [pageData])

    const items = [
        { label: 'Featured Sections' },
        { label: 'Manage Sections' }
    ];

    const sectionCategoryRenderer = (item: any) => <p>{item.categories.join(' , ')}</p>
    const sectionProductRenderer = (item:any) => <p style={{maxWidth:"300px", wordWrap:"break-word"}}>{item?.products?.map((d:any)=>d._id)?.join(',') || ""}</p>

    return (
        <div>
            <BreadCrumb model={items} className="m-4" />
            <Card className="m-4" title="Featured Sections">
                {isAdmin ? <Button label="Add New" className="mb-4" onClick={() => setVisible(true)} /> : ""}
                <DataTable
                    lazy
                    loading={loading}
                    rows={pageData?.rows || 5}
                    first={pageData?.first || 1}
                    totalRecords={data?.getAdminSetions?.count ? data?.getAdminSetions?.count : 0}
                    onPage={(values) => setPageData(values)}
                    value={data?.getAdminSetions?.sections ? data?.getAdminSetions?.sections : []}
                    paginator
                    rowsPerPageOptions={[5, 10, 25, 50]}
                >
                    <Column field="_id" header="ID"></Column>
                    <Column field="title" header="Title"></Column>
                    <Column field="description" header="Description"></Column>
                    <Column field="style" header="Style"></Column>
                    <Column body={sectionCategoryRenderer} header="Categories"></Column>
                    <Column body={sectionProductRenderer} header="Product Ids"></Column>
                    <Column field="productType" header="Product Type"></Column>
                    <Column field="createdAt" header="Date"></Column>
                    <Column field="" header="Action"></Column>
                </DataTable>
            </Card>

            <Dialog header="Create New Fatured Section" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <div className="flex flex-column">
                    <p className="mb-2 font-semibold">Title for section <span style={{ color: "red" }}>*</span></p>
                    <InputText {...register('title')} className="w-full block" id="username" placeholder="Title" />
                </div>
                <div className="flex flex-column">
                    <p className="mb-2 font-semibold">Short description <span style={{ color: "red" }}>*</span></p>
                    <InputText {...register('description')} className="w-full block" id="username" placeholder="Short Description" />
                </div>
                <div className="flex flex-column">
                    <p className="mb-2 font-semibold">Categories</p>
                    <Controller
                        name="categories"
                        control={control}
                        render={
                            ({ field }) =>
                                <Select
                                    {...field}
                                    options={categoryList?.getAllCategory?.map((d: any) => ({ label: d.name, value: d._id })) || []}
                                    isMulti={true}
                                    isSearchable={true}
                                    isClearable={true}
                                />
                        }
                    />
                </div>
                <div className="flex flex-column">
                    <p className="mb-2 font-semibold">Style <span style={{ color: "red" }}>*</span></p>
                    <Controller
                        name="style"
                        control={control}
                        render={
                            ({ field }) =>
                                <Select
                                    {...field}
                                    options={styleOptions}
                                    isClearable={true}
                                    isSearchable
                                />
                        }
                    />
                </div>
                <div className="flex flex-column">
                    <p className="mb-2 font-semibold">Product Types <span style={{ color: "red" }}>*</span></p>
                    <Controller
                        name="productType"
                        control={control}
                        render={
                            ({ field }) =>
                                <Select
                                    {...field}
                                    options={productTypeOptions}
                                    isClearable={true}
                                    isSearchable
                                />
                        }
                    />
                </div>
                {
                    watch('productType')?.value === 'CUSTOM_PRODUCT' || watch('productType')?.value === 'DIGITAL_PRODUCT' ? (
                        <div className="flex flex-column">
                            <p className="mb-2 font-semibold">Products <span style={{ color: "red" }}>*</span></p>
                            <Controller
                                name="products"
                                control={control}
                                render={({ field }) => (
                                    <AsyncSelect
                                        {...field}
                                        loadOptions={loadProductOptions}
                                        isMulti
                                        isSearchable
                                        isClearable
                                    />
                                )}
                            />
                        </div>
                    ) : ""
                }

                <Button label={createFeaturedSectionLoading?"Loading...":"Submit"} className="my-3" onClick={handleSubmit(submitHandler)} disabled={createFeaturedSectionLoading}/>
            </Dialog>
        </div>
    )
}