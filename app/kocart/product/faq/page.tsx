'use client'

import { SLIDER_PRODUCT } from "@/graphql/slider";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";
import AsyncSelect from 'react-select/async'
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Image } from "primereact/image";
import { ADMIN_FAQ_LIST, CREATE_ADMIN_FAQ } from "@/graphql/faq";
import { BreadCrumb } from "primereact/breadcrumb";


export default function Page() {
    const { data: faqList, refetch } = useQuery(ADMIN_FAQ_LIST, { variables: { limit: 1000, offset: 0 } })
    const [getSliderProduct] = useLazyQuery(SLIDER_PRODUCT)
    const [createAdminFaq] = useMutation(CREATE_ADMIN_FAQ)
    const [visible, setVisible] = useState(false)
    const [product, setProduct] = useState('')
    const [question, setQuestion] = useState('')
    const [ans, setAns] = useState('')

    const loadProductOptions: any = async (val: string, callback: any) => {
        const data = await getSliderProduct({ variables: { query: val } })
        callback(data?.data?.sliderProduct?.map((d: any) => ({ label: d?.pro_input_name, value: d?._id })) || [])
    }

    const createFaqHandler = async ()=>{
        try{
        await createAdminFaq({variables: {
            "faqAdminInput": {
              "ans": ans,
              "product": product,
              "question": question
            }
          }})
        }catch(err){
            console.log(err)
        }

    }

    const items = [
        { label: 'Product' },
        { label: 'Product Faq List' }
    ];

    return (
        <div>
            <BreadCrumb model={items} className='m-4'/>
            <Card className="m-4 p-2">
                <Button className="mb-4" label="Add New" onClick={() => setVisible(true)} />
                <DataTable lazy totalRecords={faqList?.adminFaqList?.count ? faqList?.adminFaqList?.count : 0} onPage={(value) => console.log(value)} value={faqList?.adminFaqList?.faqs ? faqList?.adminFaqList?.faqs : []} paginator rows={1000} rowsPerPageOptions={[1000, 2000, 2500, 5000]}>
                    <Column field="_id" header="ID"></Column>
                    <Column field="question" header="Question"></Column>
                    <Column field="ans" header="Answr"></Column>
                    <Column field="user.account_name" header="User"></Column>
                </DataTable>
            </Card>
            <Dialog header='Add new slider image' className="xl:w-5 sm:w-12" visible={visible} onHide={() => setVisible(false)}>
                <Card>
                    <div className="flex flex-column">
                        <p className="my-3 font-semibold">Product <span style={{ color: "red" }}>*</span></p>
                        <AsyncSelect
                            loadOptions={loadProductOptions}
                            onChange={(value: any) => setProduct(value.value)}
                        />
                    </div>
                    <div className="flex flex-column">
                        <p className="my-3 font-semibold">Question <span style={{ color: "red" }}>*</span></p>
                        <InputText value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full" placeholder="Write question" />
                    </div>
                    <div className="flex flex-column">
                        <p className="my-3 font-semibold">Answer <span style={{ color: "red" }}>*</span></p>
                        <InputText value={ans} onChange={(e) => setAns(e.target.value)} className="w-full" placeholder="Write answer" />
                    </div>
                    <Button onClick={createFaqHandler} label={"Submit"} className="mt-3"/>
                </Card>
            </Dialog>
        </div>
    )
}