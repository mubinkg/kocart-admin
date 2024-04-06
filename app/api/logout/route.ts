import { cookies } from "next/headers";

export async function GET(){
    const cookie = cookies()
    cookie.delete('access_token')
    return new Response(JSON.stringify({
        'message': 'Delete'
    }))
}