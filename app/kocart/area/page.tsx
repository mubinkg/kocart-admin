'use client'
import { ADMIN_CITY_LIST, CREATE_CITY } from "@/graphql/city";
import { useMutation, useQuery } from "@apollo/client";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export default function Page() {
    const [createCity] = useMutation(CREATE_CITY)
    const {data, refetch, loading} = useQuery(ADMIN_CITY_LIST, {fetchPolicy:"no-cache", variables: {
        "limit": 1000,
        "offset": 0,
        "query": ""
      }})

    const [visible, setVisible] = useState(false)
    const [name, setName] = useState<string>('')

    async function createCityHandler() {
        try{
            await createCity({
                variables: {
                    "createCityInput": {
                      "city_name": name
                    }
                  }
            })
            await refetch({
                "limit": 1000,
                "offset": 0,
                "query": ""
              })
            setName('');
            setVisible(false);
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <Card className="m-4">
            <Button label="Add New" onClick={() => setVisible(true)} className="mb-4" />
            <DataTable 
                value={data?.adminCityList?.cities ? data?.adminCityList?.cities : []}
                totalRecords={data?.adminCityList?.count ? data?.adminCityList?.count : 0}
                lazy
                paginator 
                rows={1000} 
                rowsPerPageOptions={[1000, 2000, 5000]}
            >
                <Column field="_id" header="ID"/>
                <Column field="city_name" header="Name"/>
            </DataTable>

            <Dialog header="Create New Area" visible={visible} onHide={() => setVisible(false)} className="w-6">
                <div className="flex flex-column">
                    <p className="mb-2 font-semibold">City Name</p>
                    <InputText value={name} onChange={(e) => setName(e.target.value)} className="w-full block" id="cityname" placeholder="Enter city name" />
                </div>
                <Button disabled={loading} label={loading ? "Loading...":"Submit"} className="mt-4" onClick={createCityHandler}/>
            </Dialog>
        </Card>
    )
}