import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A simple todo app built with Next.js and TypeScript',
};

export default function RootLayout({
  children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
