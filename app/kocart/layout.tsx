import AppSidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="grid">
            <div className="col-2">
                <AppSidebar />
            </div>
            <div className="col-10">
                <div>
                    <Topbar/>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}
