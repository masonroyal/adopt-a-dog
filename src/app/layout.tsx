import UserProvider from '@/providers/UserProvider';
import './globals.scss';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Fetch Adopt a Dog',
  description: 'Made with love',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <NavBar />
          {children}
          <Footer />
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
