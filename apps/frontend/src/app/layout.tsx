import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'NEXUS-402 | Universal x402 Orchestration Protocol',
  description: 'The Universal x402 Orchestration Protocol & Agent Marketplace for Cronos. Connect AI agents, automate workflows, and process crypto payments seamlessly.',
  keywords: ['x402', 'Cronos', 'AI agents', 'crypto payments', 'USDC', 'DeFi', 'automation'],
  authors: [{ name: 'NEXUS-402 Team' }],
  openGraph: {
    title: 'NEXUS-402 | Universal x402 Orchestration Protocol',
    description: 'Connect AI agents, automate workflows, and process crypto payments on Cronos',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
