import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import './globals.css';
import { ReactNode } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub - Your Personal Second Brain",
  description: "Organize your thoughts, tasks, and ideas with NoteHub.",
  openGraph: {
    title: "NoteHub - Your Personal Second Brain",
    description: "Organize your thoughts, tasks, and ideas with NoteHub.",
    url: "https://notehub.com",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${roboto.variable}`}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <div id="modal-root"></div>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}