'use client'

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import AsyncSelect from 'react-select/async'

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
                    <div className="border-1" style={{ minHeight: "70vh", position: "relative" }}>
                        <div style={{overflowY: "scroll", height: "58vh"}}>
                            <p className="text-left px-3 py-1">Hello how are u?</p>
                            <p className="text-right px-3 py-1">I am fine. Hose are u?</p>
                            <p className="text-left px-3 py-1">What about your days?</p>
                            <p className="text-left px-3 py-1">Hello how are u?</p>
                            <p className="text-right px-3 py-1">I am fine. Hose are u?</p>
                            <p className="text-left px-3 py-1">What about your days?</p>
                            <p className="text-left px-3 py-1">Hello how are u?</p>
                            <p className="text-right px-3 py-1">I am fine. Hose are u?</p>
                            <p className="text-left px-3 py-1">What about your days?</p>
                            <p className="text-left px-3 py-1">Hello how are u?</p>
                            <p className="text-right px-3 py-1">I am fine. Hose are u?</p>
                            <p className="text-left px-3 py-1">What about your days?</p>
                            <p className="text-left px-3 py-1">Hello how are u?</p>
                            <p className="text-right px-3 py-1">I am fine. Hose are u?</p>
                            <p className="text-left px-3 py-1">What about your days?</p>
                        </div>
                        <div style={{ position: "absolute", bottom: "10px" }} className="w-12 m-3">
                            <InputText className="w-10 mr-4" />
                            <Button label="Submit" />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}