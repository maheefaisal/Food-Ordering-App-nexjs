'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Utensils, Package, Users, Settings } from 'lucide-react';

export default function AdminHome() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push('/admin/login');
    return null;
  }

  const features = [
    {
      name: 'Restaurants',
      description: 'Manage restaurant listings, menus, and categories',
      icon: Utensils,
      href: '/admin/restaurants',
    },
    {
      name: 'Orders',
      description: 'View and manage customer orders',
      icon: Package,
      href: '/admin/orders',
    },
    {
      name: 'Users',
      description: 'Manage user accounts and permissions',
      icon: Users,
      href: '/admin/users',
    },
    {
      name: 'Settings',
      description: 'Configure system settings and preferences',
      icon: Settings,
      href: '/admin/settings',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome to the admin dashboard. Manage your food ordering system from here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Link
            key={feature.name}
            href={feature.href}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300"
          >
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <feature.icon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="ml-4 text-lg font-semibold">{feature.name}</h3>
            </div>
            <p className="mt-4 text-gray-600">{feature.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
} 