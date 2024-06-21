'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { PayPalButtons } from '@paypal/react-paypal-js';




const CheckOut = () => {
  const searchParams = useSearchParams()
 
  const aubamnt = searchParams.get("subamount")
  
  const onCreateOrder = (data:any,actions:any) => {
    return actions.order.create({
        purchase_units: [
            {
                amount: {
                    value:aubamnt,
              
                },
            },
        ],
    });
}

const onApproveOrder = (data:any,actions:any) => {
return actions.order.capture().then((details:any) => {
const name = details.payer.name.given_name;
alert(`Transaction completed by ${name}`);
});
}

  
 




  return (
    <div>
      <div className="font-[sans-serif] lg:flex lg:items-center lg:justify-center lg:h-screen max-lg:py-4">
      <div className="bg-gradient-to-br from-gray-200 to-gray-100 p-6 w-full max-w-5xl max-lg:max-w-xl mx-auto rounded-md">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center">Checkout</h2>

        <div className="grid lg:grid-cols-3 gap-6 mt-12">
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-gray-800">Billing Details</h3>

            

            <form className="mt-8">
              <div className="grid sm:col-span-2 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Name "
                  className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                <input type="email" placeholder="Email"
                  className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                <input type="number" placeholder="Phone"
                  className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                <input type="number" placeholder="Zip"
                  className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                <input type="text" placeholder="Address"
                  className="col-span-full px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
              </div>
            </form>
          </div>

          <div className="bg-white p-6 flex flex-col gap-5 rounded-md">
            <h3 className="text-lg font-bold text-gray-800">Summary</h3>
            <ul className="text-gray-800 mt-4 space-y-2">
              <li className="flex flex-wrap gap-4 text-sm">Dilevery <span className="ml-auto font-bold">$15.00</span></li>
              <hr />
              <li className="flex flex-wrap gap-4 text-base font-bold">Total <span className="ml-auto">${aubamnt}</span></li>
            </ul>
            <PayPalButtons 
          style={{ layout: "horizontal" }}
          createOrder={(data:any, actions:any) => onCreateOrder(data, actions)}
          onApprove={(data:any, actions:any) => onApproveOrder(data, actions)}
        />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-8">
          <button type="button"
            className="px-6 py-3.5 text-sm bg-white hover:bg-gray-50 text-gray-800 rounded-md">Pay later</button>
          <button type="button"
            className="px-6 py-3.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit</button>
        </div>
      </div>
    </div>
    </div>

  )
}

export default CheckOut
