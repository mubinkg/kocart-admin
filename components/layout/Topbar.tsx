
"use client";


import React from 'react';
import { MegaMenu } from 'primereact/megamenu';
import { Avatar } from 'primereact/avatar';

export default function TemplateDemo() {
   
    const start = ()=> (
        <h2></h2>
    );
    const end = <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />;

    return (
        <div className="card">
            <MegaMenu orientation="horizontal" start={start} end={end} breakpoint="960px" className="px-5 py-4 surface-0 shadow-2 mb-4" />
        </div>
    )
}
        