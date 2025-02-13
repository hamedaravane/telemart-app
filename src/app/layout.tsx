import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';
import { UserProvider } from '@/context/user-context';
import { QueryContext } from '@/context/query-context';

export const metadata: Metadata = {
  title: 'Telemart',
  description: 'Telegram mini app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Telemart</title>
        <Script src="https://telegram.org/js/telegram-web-app.js?56" strategy="beforeInteractive" />
      </head>
      <body className="antialiased">
        <QueryContext>
          <UserProvider>{children}</UserProvider>
        </QueryContext>
      </body>
    </html>
  );
}
