'use client';

import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Utensils, ShoppingCart, Users, Settings, Activity, BarChart2, AlertCircle } from 'lucide-react';

export default function AdminHome() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/admin/login');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  const features = [
    {
      name: 'Restaurants',
      description: 'Manage restaurant listings, menus, and categories',
      icon: Utensils,
      link: '/admin/restaurants',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Orders',
      description: 'View and manage customer orders and delivery status',
      icon: ShoppingCart,
      link: '/admin/orders',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Users',
      description: 'Manage user accounts, roles, and permissions',
      icon: Users,
      link: '/admin/users',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      name: 'Analytics',
      description: 'View sales reports and business analytics',
      icon: BarChart2,
      link: '/admin/analytics',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      name: 'Activity Log',
      description: 'Monitor system activity and security events',
      icon: Activity,
      link: '/admin/activity',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      name: 'Settings',
      description: 'Configure system settings and preferences',
      icon: Settings,
      link: '/admin/settings',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name || 'Admin'}</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your food ordering platform from this dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Link
            key={feature.name}
            href={feature.link}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-6">
              <div className={`flex items-center justify-center w-12 h-12 rounded-md ${feature.bgColor}`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{feature.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{feature.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-yellow-400" />
          <h2 className="ml-2 text-lg font-medium text-gray-900">Quick Stats</h2>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-500">Total Restaurants</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">12</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-500">Active Orders</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">8</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-500">Total Users</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">156</p>
          </div>
        </div>
      </div>
    </div>
  );
} 