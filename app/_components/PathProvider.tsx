'use client'
import { usePathname } from "next/navigation";
import NavBar from "./NaBar";

export default function PathProvider({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  
    const path = usePathname();
  
  
  
    const pathnames = ['/sign-in', '/create-account']
  
  
  
    return (
      
      <html lang="en">
        <body >
      
          {<div className={`${pathnames.includes(path) && 'hidden'}`}>
            <NavBar />
          </div>
          }

          {children}
        
        </body>
      </html>
    );
  }
