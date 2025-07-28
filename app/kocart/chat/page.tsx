'use client';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import AsyncSelect from 'react-select/async';

export default function Page() {
  return (
    <Card className="m-4">
      <div className="grid">
        <div className="col-4">
          <div className="border-1 p-3">
            <AsyncSelect />
            <div>
              <p className="text-center">User One</p>
              <p className="text-center">User Two</p>
              <p className="text-center">User Three</p>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div
            className="border-1"
            style={{ minHeight: '70vh', position: 'relative' }}
          >
            <div style={{ overflowY: 'scroll', height: '58vh' }}>
              <p className="px-3 py-1 text-left">Hello how are u?</p>
              <p className="px-3 py-1 text-right">I am fine. Hose are u?</p>
              <p className="px-3 py-1 text-left">What about your days?</p>
              <p className="px-3 py-1 text-left">Hello how are u?</p>
              <p className="px-3 py-1 text-right">I am fine. Hose are u?</p>
              <p className="px-3 py-1 text-left">What about your days?</p>
              <p className="px-3 py-1 text-left">Hello how are u?</p>
              <p className="px-3 py-1 text-right">I am fine. Hose are u?</p>
              <p className="px-3 py-1 text-left">What about your days?</p>
              <p className="px-3 py-1 text-left">Hello how are u?</p>
              <p className="px-3 py-1 text-right">I am fine. Hose are u?</p>
              <p className="px-3 py-1 text-left">What about your days?</p>
              <p className="px-3 py-1 text-left">Hello how are u?</p>
              <p className="px-3 py-1 text-right">I am fine. Hose are u?</p>
              <p className="px-3 py-1 text-left">What about your days?</p>
            </div>
            <div
              style={{ position: 'absolute', bottom: '10px' }}
              className="m-3 w-12"
            >
              <InputText className="mr-4 w-10" />
              <Button label="Submit" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
