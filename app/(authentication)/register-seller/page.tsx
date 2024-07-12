'use client'

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import Image from "next/image";
import logo from '@/public/logo/cocartlogo.png'
import { SubmitHandler, useForm } from "react-hook-form";
import { useRef } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_SELLER } from "@/graphql/auth/query";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

type RegisterSeller = {
  name: string,
  mobile: string,
  email: string,
  password: string,
  confirmPassword: string,
  address: string,
  account_number: string,
  account_name: string,
  bank_code: string,
  bank_name: string
}

const sellerValidationSchem = yup.object().shape({
  name: yup.string().required('Name is required'),
  mobile: yup.string().required('Mobile is required'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().required('Confirm password is required'),
  address: yup.string().required('Address is required'),
  account_number: yup.string().required('Account name is required'),
  account_name: yup.string().required('Name is required'),
  bank_code: yup.string().required('Bank name is required'),
  bank_name: yup.string().required('Bank name is required')
})

export default function RegisterSeller() {
  const router = useRouter()
  const [registerSeller, { data, error, loading }] = useMutation<any>(REGISTER_SELLER)
  const addressProofRef = useRef<any>(null)
  const nationalIdentityCardRef = useRef<any>(null)
  const businessLiscenceRef = useRef<any>(null)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterSeller>({
    resolver: yupResolver(sellerValidationSchem)
  })
  if (error) {
    console.log(error?.message)
    Swal.fire({
      title: 'Seller Registration',
      icon: 'error',
      text: error?.message
    })
  }
  const onSubmit: SubmitHandler<RegisterSeller> = async (data: RegisterSeller) => {
    try {
      await registerSeller({
        variables: {
          createSellerInput: {
            name: data.name,
            mobile: data.mobile,
            email: data.email,
            password: data.password,
            address: data.address,
            account_number: data.account_number,
            account_name: data.account_name,
            bank_code: data.bank_code,
            bank_name: data.bank_name,
            address_proof: addressProofRef.current.files[0],
            business_license: businessLiscenceRef.current.files[0],
            national_identity_card: nationalIdentityCardRef.current.files[0]
          }
        }
      })
      router.push('/seller-signin')
    } catch (err) {
      
    }
  }

  return (
    <div className="flex align-items-center justify-content-center h-screen">
      <Card className="h-full no-scrollbar" style={{overflowY: 'scroll'}}>
        <div className="flex items-center flex-column overflow-auto">
          <div className="flex justify-content-center">
            <Image alt="kocart logo" src={logo} width={150} />
          </div>
          <div>
            <h1 className="text-3xl text-center font-bold my-3">Seller Registration</h1>
          </div>
          <div>
            <form className="flex flex-column gap-4">
              <div>
                <h2 className="mb-3 text-lg font-bold">Personal Details</h2>
                <hr />
                <div className="flex items-center gap-5 mt-3">
                  <label className="w-10rem inline-block">Name</label>
                  <InputText className="w-full"  {...register('name')} placeholder="Jhon" />
                </div>
                <div className="flex items-center gap-5 mt-3">
                  <label className="w-10rem inline-block">Mobile</label>
                  <InputText className="w-full" {...register('mobile')} placeholder="017*****" />
                </div>
                <div className="flex items-center gap-5 mt-3">
                  <label className="w-10rem inline-block">Email</label>
                  <InputText className="w-full" {...register('email')} placeholder="user@domain.com" />
                </div>
                <div className="flex items-center gap-5 mt-3">
                  <label className="w-10rem inline-block">Password</label>
                  <InputText className="w-full" {...register('password')} placeholder="*****" />
                </div>
                <div className="flex items-center gap-5 mt-3">
                  <label className="w-10rem inline-block">Confirm Password</label>
                  <InputText className="w-full" {...register('confirmPassword')} placeholder="****" />
                </div>
                <div className="flex items-center gap-5 mt-3">
                  <label className="w-10rem inline-block">Address</label>
                  <InputText className="w-full" {...register('address')} placeholder="House 13/A Banani DOHS" />
                </div>
                <div className="flex items-center gap-5 mt-3">
                  <label className="w-10rem inline-block">Address Prof</label>
                  <FileUpload className="w-full" ref={addressProofRef}/>
                </div>
                <div className="flex items-center gap-5 mt-3">
                  <label className="w-10rem inline-block">National Identity Card</label>
                  <FileUpload className="w-full" ref={nationalIdentityCardRef} />
                </div>
                <div className="flex items-center gap-5 mt-3">
                  <label className="w-10rem inline-block">Business Liscenece</label>
                  <FileUpload className="w-full" ref={businessLiscenceRef} />
                </div>
              </div>
              <div className="pt-3">
                <h2 className="mb-3 text-lg font-bold">Bank Details</h2>
                <hr />
                <div className="flex items-center gap-5 mt-3">
                  <label className="w-10rem inline-block">Account Number</label>
                  <InputText className="w-full" {...register('account_number')} placeholder="1111111" />
                </div>
                <div className="flex items-center gap-5 mt-3">
                  <label className="w-10rem inline-block">Account Name</label>
                  <InputText className="w-full" {...register('account_name')} placeholder="1111111" />
                </div>
                <div className="flex items-center gap-5 mt-3">
                  <label className="w-10rem inline-block">Bank Code</label>
                  <InputText className="w-full" {...register('bank_code')} placeholder="1111111" />
                </div>
                <div className="flex items-center gap-5 mt-3">
                  <label className="w-10rem inline-block">Bank Name</label>
                  <InputText className="w-full" {...register('bank_name')} placeholder="1111111" />
                </div>
              </div>
                <Button onClick={()=>handleSubmit(onSubmit)} label="Submit" type="submit" color="primary" disabled={loading}/>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
}
