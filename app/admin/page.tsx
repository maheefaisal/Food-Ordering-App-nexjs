'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, Users, Settings, BarChart } from 'lucide-react';

export default function AdminHome() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push('/admin/login');
    return null;
  }

  const features = [
    {
      name: 'Restaurants',
      description: 'Manage restaurant listings and details',
      icon: Package,
      link: '/admin/restaurants',
    },
    {
      name: 'Orders',
      description: 'View and manage customer orders',
      icon: Package,
      link: '/admin/orders',
    },
    {
      name: 'Analytics',
      description: 'View sales data and customer feedback',
      icon: BarChart,
      link: '/admin/analytics',
    },
    {
      name: 'Users',
      description: 'Manage user accounts and permissions',
      icon: Users,
      link: '/admin/users',
    },
    {
      name: 'Settings',
      description: 'Configure system settings',
      icon: Settings,
      link: '/admin/settings',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => logout()}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full transition duration-300"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Link
            key={feature.name}
            href={feature.link}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <div className="flex items-center space-x-4">
              <feature.icon className="w-8 h-8 text-red-600" />
              <div>
                <h2 className="text-xl font-semibold">{feature.name}</h2>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 