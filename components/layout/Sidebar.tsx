'use client'
import React from 'react';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import Link from 'next/link';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function TemplateDemo() {
    const router = useRouter()
    const itemRenderer = (item: any) => (
        <div className='p-menuitem-content mb-2'>
            <Link className="flex align-items-center p-menuitem-link" href={item?.url || "#"}>
                <i className={item.icon} style={{ fontSize: '1rem', fontWeight: 'bolder' }}></i> 
                <span className="mx-3 font-semibold">{item.label}</span>
            </Link>
        </div>
    );

    const signOutRender = (item: any) => (
        <div className='p-menuitem-content mb-2' onClick={signoutHandler}>
            <span className="flex align-items-center p-menuitem-link">
                <i className={item.icon} style={{ fontSize: '1rem', fontWeight: 'bolder' }}></i> 
                <span className="mx-3 font-semibold">{item.label}</span>
            </span>
        </div>
    );

    const signoutHandler = async ()=>{
        try{
            await axios.get('/api/logout')
            router.push('/authentication/seller-signin')
        }
        catch(err){
            Swal.fire({
                title:'Sign Out',
                text: 'Error on signout',
                icon:'error'
            })
        }
    }

    let items: MenuItem[] = [
        {
            template: () => {
                return (
                    <div className='mb-4'>
                        <h2 className='text-center my-4 font-bold'>
                            Kocart
                        </h2>
                        <hr />
                    </div>
                );
            }
        },
        {
            label: 'Dashboard',
            icon: 'pi pi-th-large',
            template: itemRenderer,
            url: '/kocart/dashboard'
        },
        {
            label: 'Seller',
            icon: 'pi pi-users',
            template: itemRenderer,
            url: '/kocart/seller'
        },
        {
            label: 'Brand',
            icon: 'pi pi-users',
            template: itemRenderer,
            url: '/kocart/brand'
        },
        {
            label: 'Category',
            icon: 'pi pi-list-check',
            template: itemRenderer,
            url: '/kocart/category'
        },
        {
            label: 'Sign Out',
            icon: 'pi pi-sign-out',
            template: signOutRender,
            url: '#'
        },
    ]

    return (
        <Menu model={items} className="h-screen w-full" />
    )
}
