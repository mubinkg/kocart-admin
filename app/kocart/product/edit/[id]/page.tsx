'use client'

type IProps = {
    params:{
        id: string
    }
}

export default function Page({params: {id}}:IProps){
    
    return (
        <div>
            <h2>Update product page</h2>
        </div>
    )
}
