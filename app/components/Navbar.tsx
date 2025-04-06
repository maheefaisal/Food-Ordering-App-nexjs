'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Home, Utensils, ListOrdered } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Menu', href: '/menu', icon: Utensils },
    { name: 'Cart', href: '/cart', icon: ShoppingCart },
    { name: 'Orders', href: '/orders', icon: ListOrdered },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-red-600">
              FoodApp
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-red-100 text-red-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-red-100 text-red-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 