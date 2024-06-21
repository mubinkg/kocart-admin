'use server'

import { baseUrl } from '@/util/urlUtils'
import { cookies } from 'next/headers'

export async function signinAction(phone:string, password:string) {
    try {
        const res = await fetch(baseUrl, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                query: `mutation SigninSeller($password: String!, $phone: String!) {
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
                `,
                variables:{
                    password: password,
                    phone: phone
                }
            })
        })

        const data = await res.json()
        cookies().set('access_token', data?.data?.signinSeller?.access_token)
        return data
    } catch (err) {
        throw err
    }
}

export async function logoutAction(){
    cookies().delete('access_token')
}