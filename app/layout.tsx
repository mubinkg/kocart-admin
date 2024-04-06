import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import '/node_modules/primeflex/primeflex.css'
import 'primeicons/primeicons.css';
import GraphqlProvider from "@/components/graphql/GraphqlProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kocart",
  description: "An ecommerce platform.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
      <html lang="en">
        <body className={`${inter.className} m-0 p-0`}>
          <GraphqlProvider>
          <PrimeReactProvider value={{ unstyled: false}}>
            {children}
          </PrimeReactProvider>
          </GraphqlProvider>
        </body>
      </html>
  );
}
