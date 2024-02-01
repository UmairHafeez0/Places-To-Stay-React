"use client"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname(); 

  const hideNavbarRoutes = ['/login', '/signup'];

  return (
    <html lang="en">
      <body>
        
      </body>
    </html>
  );
};

export default Layout;
