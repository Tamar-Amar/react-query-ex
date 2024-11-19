"use client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "./globals.css";
import Link from 'next/link';
import ReactQuery from './page01/page';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}> 
          <ReactQuery/>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
