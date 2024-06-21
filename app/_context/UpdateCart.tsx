'use client'
import { useState } from 'react';
import { create } from 'zustand'

import React from 'react';


interface CartContextValue {
  count: any;
  countcartitems:(len:any)=>void;
 
}


interface statetype {

  subtotal: number;
  count: any;
  inc:()=>void;




}


export const useStore = create<statetype>((set) => ({
  count: 0,
  subtotal: 0,
  inc: () => set((state) => ({ count: state.count })),





}))





