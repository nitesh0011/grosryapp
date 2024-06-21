'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import NextTopLoader from 'nextjs-toploader';
import React from "react";
import PathProvider from "./_components/PathProvider";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const inter = Inter({ subsets: ["latin"] });








export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  


  return (
    <PayPalScriptProvider options={{
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,

    }}>
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" richColors
          toastOptions={{

            className: 'w-full',
          }}
        />


        <NextTopLoader
          color="#22c55e"
        />
        <PathProvider>
         
         
            {children}

         

        </PathProvider>


      </body>
    </html>
    </PayPalScriptProvider>
  );
}
