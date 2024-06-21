'use client'
import React, { createContext, useState } from 'react';

interface SubamountContextValue {
  subamount: any;
  setSubamount: React.Dispatch<React.SetStateAction<any>>;
}

const SubamountContext = createContext<SubamountContextValue | undefined>(undefined);

const SubamountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subamount, setSubamount] = useState<number>(0);

  const value: SubamountContextValue = {
    subamount,
    setSubamount,
  };

  return <SubamountContext.Provider value={value}>{children}</SubamountContext.Provider>;
};

export { SubamountContext, SubamountProvider };
