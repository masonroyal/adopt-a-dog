import UserProvider from '@/providers/UserProvider';
import './globals.scss';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';

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
      <UserProvider>
        <body className={inter.className}>
          <NavBar />
          {children}
          <Footer />
        </body>
      </UserProvider>
    </html>
  );
}
