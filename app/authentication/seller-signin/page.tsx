'use client'

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import logo from '../../../public/logo/cocartlogo.png'
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  const prod_url = "http://35.208.204.126/api/auth/"
  const local_url = "http://localhost:3000/api/auth/"
  let url = ''
  
  const signInHandler = async () => {
    try {
      setLoading(true)
      const data = await axios.post((prod_url),
        {
            password: password,
            phone: phone
        }
      )

      localStorage.setItem('access_token', data?.data?.data?.signinSeller?.access_token)
      localStorage.setItem('user',  JSON.stringify(data?.data?.data?.signinSeller?.seller||""))
      setLoading(false)
      router.push('/kocart/dashboard')
    } catch (err:any) {
      const errmsg = (err?.response?.data?.data?.errors[0]?.message) || "Error on login"
      Swal.fire({
        title: 'Seller Signin',
        text: errmsg,
        icon: 'error'
      })
      setLoading(false)
    }
  }

  return (
    <main>
      <div className="flex justify-content-center align-items-center h-screen">
        <Card className="w-4">
            <div className="flex align-items-center justify-content-center">
              <Image alt="kocart logo" src={logo} />
            </div>
            <div>
              <h1 className="text-3xl text-center	 font-bold my-3">Welcome Back!</h1>
              <p className="text-xl text-center	 mb-5">Please login to your account.</p>
            </div>
            <div>
              <form className="flex max-w-md flex-column gap-4">
                <div>
                  <div className="my-2 block">
                    <label htmlFor="phone">Phone</label>
                  </div>
                  <InputText className="w-full" id="number" onChange={(e) => setPhone(e.target.value)} type="text" placeholder="017********" required />
                </div>
                <div>
                  <div className="mb-2 block">
                    <label htmlFor="password">Password</label>
                  </div>
                  <InputText className="w-full" id="passwor1" onChange={(e) => setPassword(e.target.value)} type="password" required />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="remember">Remember me</label>
                </div>
                  <Button onClick={signInHandler} color="primary" label= {loading?'loading...':'Sign In'} disabled={loading}/>
              </form>
            </div>
            <div>
              <Link href="/authentication/register-seller/">
                <p className="text-center	 text-xl text-[#41469B] py-5 hover:cursor-pointer">Dont have any account?</p>
              </Link>
            </div>
        </Card>
      </div>
    </main>
  );
}
