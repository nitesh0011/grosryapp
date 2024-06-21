import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const CheckoutComponent = dynamic(() => import('@/app/_components/CheckOutComponent'), {
  ssr: false,
})

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutComponent />
    </Suspense>
  )
}