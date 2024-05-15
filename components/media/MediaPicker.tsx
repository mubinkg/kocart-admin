'use client'
import { Dialog } from 'primereact/dialog'
import React, { useRef, useState } from 'react'
import FileDng from '../file/FileDng'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_MEDIA, GET_MEDIA } from '@/graphql/media/indes'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { extname } from 'path'
import { Toast } from 'primereact/toast'
import Swal from 'sweetalert2'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

const MediaPicker = ({ visible, setVisible , isMultiple, callback}: { visible: boolean, setVisible: (value: boolean) => unknown, isMultiple?:boolean, callback?:(val:any)=>void }) => {

    const fileRef = useRef<any>(null)

    const [query, setQuery] = useState('')
    const [selectedProducts, setSelectedProducts] = useState(null);

    const { data: mediaList, refetch } = useQuery(GET_MEDIA, {
        variables: {
            limit: 1000,
            offset: 0,
            query: ""
        },
        fetchPolicy: 'no-cache'
    })

    const [createMedia, { data, loading, error }] = useMutation(CREATE_MEDIA)

    const mediaNameRenderer = (item: any) => <p style={{ maxWidth: "150px", wordWrap: "break-word" }}>{item.name}</p>
    const mediaSizeRenderer = (item: any) => <p>{item.size / 1000} kb</p>

    async function createMediaHandler() {

        if (fileRef?.current?.getFiles()?.length) {
            const file = fileRef.current.getFiles()[0]
            const fileName = file?.name
            const extension = extname(fileName).split('.')[1]
            const size = file?.size
            await createMedia({
                variables: {
                    "createMediaInput": {
                        "file": file,
                        "extension": extension,
                        "name": fileName,
                        "size": size,
                        "subDirectory": "/"
                    }
                }
            });
            await refetch({
                limit: 1000,
                offset: 0,
                query: ""
            })
        } else {
            Swal.fire({
                title: "Media Upload",
                text: 'Please select a file.',
                icon: "warning"
            })
        }
    }

    const handleChoose = ()=>{
        if(callback){
            callback(selectedProducts)
        }
    }


    return (
        <div>
            <Dialog header="Choose Media" className='xl:w-6 sm:w-12' visible={visible} onHide={() => setVisible(false)}>
                <FileDng fileUploadRef={fileRef} />
                <Button onClick={createMediaHandler} label={loading ? "Loading..." : "Upload"} className="mt-4" />
                <div className='my-4 flex justify-content-between'>
                    <Button label='Choose' onClick={handleChoose}/>
                    <div className="flex gap-2">
                        <InputText style={{ height: "40px" }} value={query} onChange={(e) => setQuery(e.target.value)} />
                        <Button size="small" label="Search" onClick={() => {
                            refetch({
                                query: query,
                                limit: 1000,
                                offset: 0
                            });
                        }} />
                    </div>
                </div>
                <DataTable
                    totalRecords={mediaList?.adminMedia?.count ? mediaList?.adminMedia?.count : 0}
                    value={mediaList?.adminMedia?.media ? mediaList?.adminMedia?.media : []}
                    lazy
                    paginator
                    rows={1000}
                    rowsPerPageOptions={[1000, 2000, 30000]}
                    className="mt-4"
                    selectionMode="checkbox"
                    selection={selectedProducts}
                    onSelectionChange={(e) => setSelectedProducts(e.value)}
                >
                    <Column selectionMode={isMultiple ? "multiple" : "single"} headerStyle={{ width: '3rem' }}></Column>
                    <Column field="_id" header="ID" />
                    <Column body={mediaNameRenderer} header="Name" />
                    <Column body={mediaSizeRenderer} header="Size" />
                </DataTable>
            </Dialog>
        </div>
    )
}

export default MediaPicker
