'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Shield, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Beranda', href: '/' },
  { name: 'Laporan Darurat', href: '/laporan' },
  { name: 'Edukasi Kedaruratan', href: '/edukasi' },
  { name: 'Regulasi', href: '/regulasi' },
  { name: 'Kontak Darurat', href: '/kontak-darurat' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="p-2 bg-secondary rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-dark">SiRANA</span>
                <p className="text-xs text-gray-600">Siaga - Insan - Rana</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'bg-secondary text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-secondary'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Emergency Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/kontak-darurat"
              className="flex items-center space-x-2 bg-error text-white px-4 py-2 rounded-lg hover:bg-error/90 transition-colors duration-200"
            >
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">Darurat</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-secondary hover:bg-gray-100"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 py-2 space-y-1 bg-white">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'block px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'bg-secondary text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-secondary'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
            <Link
              href="/kontak-darurat"
              className="flex items-center space-x-2 bg-error text-white px-3 py-2 rounded-lg hover:bg-error/90 transition-colors duration-200 mt-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">Kontak Darurat</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}