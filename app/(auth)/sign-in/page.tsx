'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logo from "@/public/grocery.png"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { LoaderIcon } from 'lucide-react'

const SignInPage = () => {
    const router = useRouter();
    const [username,setUserName] =useState('');
    const [email,setEmail] =useState('');
    const [password,setPassword] =useState('');
    const [loader,setLoader] =useState(false);

    useEffect(()=>{
        const jwt = sessionStorage.getItem('jwt');
        if(jwt) {
            router.push("/")
        }
    })

    const onSignIn = () => {
      setLoader(true)
        GlobalApi.LoginUser({email,password}).then(resp=>{
            
            sessionStorage.setItem('user', JSON.stringify(resp.data.user));
            sessionStorage.setItem('jwt', resp.data.jwt);
            toast.success("Login succesfully, sending you to home page !")
           
            router.push("/")
            setLoader(false)
        },(e:any)=>{
            toast(e.response?.data?.error?.message)
            setLoader(false)
        })
    }
  return (
    <div className='flex items-baseline justify-center my-20'>
      <div className="flex flex-col  items-center justify-center p-10 bg-slate-200">
        <Image src={logo} alt='logo' height={200} width={200}/>
        <h2 className='font-bold text-3xl'> Sign In</h2>
        <h2>Enter your Email and Password to sign in </h2>
        <div className='w-full flex flex-col gap-5 mt-7'>
            
            <Input placeholder='test@gmail.com' type='email'
              onChange={(e)=> setEmail(e.target.value)}
            />


            <Input placeholder='Password' type='password'
             onChange={(e)=> setPassword(e.target.value)}
            />
            <Button 
            onClick={onSignIn}
            disabled={!( email ||password)}
            className='text-white bg-green-600 hover:bg-green-800'>
              {loader?<LoaderIcon className=" animate-spin"/>:'Sign In'}
            </Button>
            <p>Dont have an account , <Link href='/create-account' className='text-blue-600'> create an acount</Link></p>
        </div>

      </div>
    </div>
  )
}

export default SignInPage
