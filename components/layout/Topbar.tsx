'use client';

import React from 'react';
import { MegaMenu } from 'primereact/megamenu';
import { Avatar } from 'primereact/avatar';

export default function TemplateDemo() {
  const start = () => <h2></h2>;
  const end = (
    <Avatar
      image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
      shape="circle"
    />
  );

  return (
    <MegaMenu
      orientation="horizontal"
      start={start}
      end={end}
      className="shadow-1 mb-4 px-5 py-4"
    />
  );
}
