'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Bot, 
  Workflow, 
  CreditCard, 
  Store, 
  BarChart3, 
  Menu,
  X,
  Wallet,
  Zap
} from 'lucide-react';
import { useState } from 'react';
import { useWallet } from '@/lib/hooks';
import { formatAddress } from '@/lib/contracts';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'x402 Demo', href: '/x402-demo', icon: Zap, highlight: true },
  { name: 'Agents', href: '/agents', icon: Bot },
  { name: 'Workflows', href: '/workflows', icon: Workflow },
  { name: 'Payments', href: '/payments', icon: CreditCard },
  { name: 'Marketplace', href: '/marketplace', icon: Store },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { address, isConnected, connect, disconnect, connecting } = useWallet();

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cronos-light to-primary-600 flex items-center justify-center">
              <span className="text-xl font-bold">N</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold gradient-text">NEXUS-402</h1>
              <p className="text-xs text-white/60">x402 Protocol</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-white/10 text-white' 
                      : item.highlight
                      ? 'text-cronos-light hover:text-white hover:bg-cronos-light/10 border border-cronos-light/30'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right side - Wallet Connect */}
          <div className="flex items-center gap-4">
            {isConnected && address ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-sm font-medium">{formatAddress(address)}</span>
                </div>
                <button 
                  onClick={disconnect}
                  className="px-3 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-colors text-sm font-medium"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  console.log('Connect button clicked in Header');
                  connect();
                }}
                disabled={connecting}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cronos-light to-primary-600 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <Wallet className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {connecting ? 'Connecting...' : 'Connect Wallet'}
                </span>
              </button>
            )}
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-white/10">
          <nav className="px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-white/10 text-white' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
