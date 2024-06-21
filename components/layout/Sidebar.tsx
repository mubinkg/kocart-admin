'use client'

import React, { useEffect, useState } from 'react';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { logoutAction } from '@/app/action';
import { getIsAdmin } from '@/util/storageUtils';

export default function TemplateDemo() {
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(()=>{
        setIsAdmin(getIsAdmin())
    }, [])

    const router = useRouter()
    const itemRenderer = (item: any) => (
        <div className='p-menuitem-content mb-2'>
            <Link className="flex align-items-center p-menuitem-link" href={item?.url || "#"}>
                <i className={item.icon} style={{ fontSize: '1rem', fontWeight: 'bolder' }}></i> 
                <span className="mx-3 font-semibold">{item.label}</span>
            </Link>
        </div>
    );

    const subItemRenderer = (item: any) => (
        <div className='p-menuitem-content mb-2 ml-3'>
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
            await logoutAction()
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
    
    let menuItems: MenuItem[] = []
    menuItems.push({
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
    })
    menuItems.push({
        label: 'Dashboard',
        icon: 'pi pi-th-large',
        template: itemRenderer,
        url: '/kocart/dashboard'
    })

    if(isAdmin){
        menuItems.push({
            label: 'Seller',
            icon: 'pi pi-users',
            template: itemRenderer,
            url: '/kocart/seller'
        })
    }
    menuItems.push({
        label: 'Brand',
        icon: 'pi pi-users',
        template: itemRenderer,
        url: '/kocart/brand'
    })
    menuItems.push({
        label: 'Category',
        icon: 'pi pi-list-check',
        template: itemRenderer,
        url: '/kocart/category'
    })
    menuItems.push({
        label: 'Manage Stock',
        icon: 'pi pi-list-check',
        template: itemRenderer,
        url: '/kocart/stock-management'
    })
    menuItems.push({
        label: 'Order',
        icon: 'pi pi-list-check',
        items: [
            {
                label: 'Order List',
                icon: 'pi pi-align-left',
                template: subItemRenderer,
                url: '/kocart/order/order-list'
            },
        ]
    })
    const productItems:any = {
        label: 'Product',
        icon: 'pi pi-list-check',
        items: []
    }
    if(!isAdmin){
        productItems.items.push({
            label: 'Attribute Sets',
            icon: 'pi pi-align-left',
            template: subItemRenderer,
            url: '/kocart/product/attribute-set'
        })
    }

    productItems.items.push({
        label: 'Attributes',
        icon: 'pi pi-align-left',
        template: subItemRenderer,
        url: '/kocart/product/attribute'
    })

    if(!isAdmin){
        productItems.items.push({
            label: 'Attribute Values',
            icon: 'pi pi-align-left',
            template: subItemRenderer,
            url: '/kocart/product/attribute-value'
        })
    }

    productItems.items.push({
        label: 'Add Product',
        icon: 'pi pi-align-left',
        template: subItemRenderer,
        url: '/kocart/product/add-product'
    })
    productItems.items.push({
        label: 'Manage Product',
        icon: 'pi pi-align-left',
        template: subItemRenderer,
        url: '/kocart/product/product-list'
    })
    productItems.items.push({
        label: 'Product FAQ',
        icon: 'pi pi-align-left',
        template: subItemRenderer,
        url: '/kocart/product/faq'
    })

    
    menuItems.push(productItems)

    if(isAdmin){
        menuItems.push({
            label: 'Sliders',
            icon: 'pi pi-list-check',
            template: itemRenderer,
            url: '/kocart/slider'
        })
    }

    menuItems.push({
        label: 'Media',
        icon: 'pi pi-images',
        template: itemRenderer,
        url: '/kocart/media'
    })

    const locationItems:MenuItem = {
        label: 'Location',
        icon: 'pi pi-list-check',
        items: [
            {
                label: 'City',
                icon: 'pi pi-align-left',
                template: subItemRenderer,
                url: '/kocart/city'
            },
            {
                label: 'Areas',
                icon: 'pi pi-align-left',
                template: subItemRenderer,
                url: '/kocart/area'
            },
            {
                label: 'Countries',
                icon: 'pi pi-align-left',
                template: subItemRenderer,
                url: '/kocart/address'
            }
        ]
    }

    menuItems.push(locationItems)

    const featuredSectionItems:MenuItem = {
        label: 'Featured Sections',
        icon: 'pi pi-list-check',
        items: [
            {
                label: 'Manage Sections',
                icon: 'pi pi-align-left',
                template: subItemRenderer,
                url: '/kocart/sections/manage-sections'
            },
            {
                label: 'Section Order',
                icon: 'pi pi-align-left',
                template: subItemRenderer,
                url: '/kocart/sections/sections-order'
            }
        ]
    }

    if(isAdmin){
        menuItems.push(featuredSectionItems)
    }

    const customerItems:MenuItem = {
        label: 'Customers',
        icon: 'pi pi-list-check',
        items: [
            {
                label: 'View Customers',
                icon: 'pi pi-align-left',
                template: subItemRenderer,
                url: '/kocart/customers'
            },
            {
                label: 'Addresses',
                icon: 'pi pi-align-left',
                template: subItemRenderer,
                url: '/kocart/address'
            }
        ]
    }

    if(isAdmin){
        menuItems.push(customerItems)
    }

    const reportsItems:MenuItem = {
        label: 'Reports',
        icon: 'pi pi-list-check',
        items: [
            {
                label: 'Sales Reports',
                icon: 'pi pi-align-left',
                template: subItemRenderer,
                url: '/kocart/report/sales-report'
            },
            {
                label: 'Sale Inventory Reports',
                icon: 'pi pi-align-left',
                template: subItemRenderer,
                url: '/kocart/report/inventory-report'
            }
        ]
    }

    menuItems.push(reportsItems)

    menuItems.push({
        label: 'Sign Out',
        icon: 'pi pi-sign-out',
        template: signOutRender,
        url: '#'
    })

    return (
        <Menu model={menuItems} className="w-full"  style={{overflowY:"scroll", maxHeight:"100vh"}}/>
    )
}
