import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Maxxlab Forms',
  description: 'Professional client intake forms by Maxxlab',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-brand-bg text-brand-ink font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
