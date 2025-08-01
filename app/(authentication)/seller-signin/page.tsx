'use client';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import Image from 'next/image';
import logo from '../../../public/logo/cocartlogo.png';
import Link from 'next/link';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { signinAction } from '@/app/action';

export default function Home() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const signInHandler = async () => {
    try {
      setLoading(true);
      const data = await signinAction(phone, password);
      localStorage.setItem(
        'access_token',
        data?.data?.signinSeller?.access_token,
      );
      localStorage.setItem(
        'user',
        JSON.stringify(data?.data?.signinSeller?.seller || {}),
      );
      setLoading(false);
      router.push('/kocart/dashboard');
    } catch (err: any) {
      const errmsg =
        err?.response?.data?.data?.errors[0]?.message || 'Invalid credentials';
      Swal.fire({
        title: 'Seller Signin',
        text: errmsg,
        icon: 'error',
      });
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="justify-content-center align-items-center flex h-screen">
        <Card className="sm:w-12 md:w-12 lg:w-3">
          <div className="align-items-center justify-content-center flex">
            <Image alt="kocart logo" src={logo} width={100} height={100} />
          </div>
          <div>
            <h1 className="my-3 text-center text-3xl font-bold">
              Welcome Back!
            </h1>
            <p className="mb-5 text-center text-xl">
              Please login to your account.
            </p>
          </div>
          <div>
            <form className="flex-column flex max-w-md gap-4">
              <div>
                <div className="my-2 block">
                  <label htmlFor="phone">Phone</label>
                </div>
                <InputText
                  className="w-full"
                  id="number"
                  onChange={e => setPhone(e.target.value)}
                  type="text"
                  placeholder="017********"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <label htmlFor="password">Password</label>
                </div>
                <InputText
                  className="w-full"
                  id="passwor1"
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="remember">Remember me</label>
              </div>
              <Button
                onClick={signInHandler}
                color="primary"
                label={loading ? 'loading...' : 'Sign In'}
                disabled={loading}
              />
            </form>
          </div>
          <div>
            <Link href="/register-seller/">
              <p className="py-5 text-center text-xl text-[#41469B] hover:cursor-pointer">
                Dont have any account?
              </p>
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}
