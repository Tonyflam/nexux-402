'use client';

import { ReactNode } from 'react';
import { WagmiProvider, http } from 'wagmi';
import { Chain } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

// Define Cronos Testnet chain
const cronosTestnet: Chain = {
  id: 338,
  name: 'Cronos Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Cronos',
    symbol: 'TCRO',
  },
  rpcUrls: {
    default: {
      http: ['https://evm-t3.cronos.org'],
    },
    public: {
      http: ['https://evm-t3.cronos.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Cronos Explorer',
      url: 'https://explorer.cronos.org/testnet',
    },
  },
  testnet: true,
};

// Configure chains and transports
const config = getDefaultConfig({
  appName: 'NEXUS-402',
  projectId: '1d312418a268341fd8f9d84734b9e11a',
  chains: [cronosTestnet],
  ssr: true, // Enable SSR support
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
