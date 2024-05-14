
export async function POST(request:Request){
    try{
    const {password, phone} = await request.json()

    const query = `
    mutation SigninSeller($password: String!, $phone: String!) {
        signinSeller(password: $password, phone: $phone) {
          access_token
          seller {
            _id
            account_name
            account_number
            address
            address_proof
            bank_code
            bank_name
            business_license
            email
            isAdmin
            mobile
            name
            national_identity_card
            status
          }
        }
      }
    `

    const variables = {
        password: password,
        phone: phone
    };

    const body = JSON.stringify({ query, variables });

    const prod_url = "http://35.208.204.126/api/graphql/"
    const local_url = "http://localhost:3001/graphql"
    
    const res = await fetch(prod_url as string, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
    })

    const data = await res.json()

    const token = data?.data?.signinSeller?.access_token
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)

    if(!token){
        return new Response(JSON.stringify({
            'data': data
        }),{
            status: 400
        })
    }
    
    return new Response(JSON.stringify(data),{
        status: 200,
        headers: {
            'Set-Cookie': `access_token = ${token}; expires=${expires.toUTCString()};path=/`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
    })
    }catch(err){
        return new Response(JSON.stringify({
            'message': 'Error on sing in'
        }),{
            status: 400
        })
    }
}