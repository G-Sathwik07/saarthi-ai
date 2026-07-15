import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Saarthi.ai - Your AI Personal Agent for the Digital World',
  description:
    'Connect your accounts. Saarthi understands context and performs intelligent actions - with you in the loop, always.',
  openGraph: {
    title: 'Saarthi.ai - Your AI Personal Agent',
    description:
      'Connect multiple digital accounts. Understand context. Perform intelligent actions. Human always approves.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saarthi.ai - Your AI Personal Agent',
    description:
      'Connect multiple digital accounts. Understand context. Perform intelligent actions. Human always approves.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased bg-bg-primary text-ink">
        {children}
      </body>
    </html>
  );
}
