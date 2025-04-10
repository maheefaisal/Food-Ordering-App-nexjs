'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Package, Check, X, Clock, Truck, Search } from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  createdAt: string;
}

export default function OrderManagement() {
  const { logout } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Sample orders data
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      customerName: 'John Doe',
      items: [
        { name: 'Margherita Pizza', quantity: 2, price: 12.99 },
        { name: 'Coca Cola', quantity: 1, price: 2.99 },
      ],
      total: 28.97,
      status: 'pending',
      deliveryAddress: '123 Main St, City, Country',
      createdAt: '2024-03-20T10:30:00',
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      items: [
        { name: 'Chicken Burger', quantity: 1, price: 8.99 },
        { name: 'French Fries', quantity: 1, price: 3.99 },
      ],
      total: 12.98,
      status: 'confirmed',
      deliveryAddress: '456 Oak Ave, City, Country',
      createdAt: '2024-03-20T11:15:00',
    },
  ]);

  const handleStatusUpdate = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.includes(searchQuery);
    
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-purple-100 text-purple-800';
      case 'out-for-delivery':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'confirmed':
        return <Check className="w-4 h-4" />;
      case 'preparing':
        return <Package className="w-4 h-4" />;
      case 'out-for-delivery':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <Check className="w-4 h-4" />;
      case 'cancelled':
        return <X className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <button
          onClick={() => logout()}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="preparing">Preparing</option>
          <option value="out-for-delivery">Out for Delivery</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                <p className="text-gray-600">{order.customerName}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Order Items</h4>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-600">Delivery Address</p>
                <p className="font-medium">{order.deliveryAddress}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-lg font-bold text-red-600">${order.total.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleStatusUpdate(order.id, 'confirmed')}
                className={`flex-1 py-2 px-4 rounded-lg ${
                  order.status === 'confirmed'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                disabled={order.status === 'confirmed'}
              >
                Confirm
              </button>
              <button
                onClick={() => handleStatusUpdate(order.id, 'preparing')}
                className={`flex-1 py-2 px-4 rounded-lg ${
                  order.status === 'preparing'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                disabled={order.status === 'preparing'}
              >
                Preparing
              </button>
              <button
                onClick={() => handleStatusUpdate(order.id, 'out-for-delivery')}
                className={`flex-1 py-2 px-4 rounded-lg ${
                  order.status === 'out-for-delivery'
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                disabled={order.status === 'out-for-delivery'}
              >
                Out for Delivery
              </button>
              <button
                onClick={() => handleStatusUpdate(order.id, 'delivered')}
                className={`flex-1 py-2 px-4 rounded-lg ${
                  order.status === 'delivered'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                disabled={order.status === 'delivered'}
              >
                Delivered
              </button>
              <button
                onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                className={`flex-1 py-2 px-4 rounded-lg ${
                  order.status === 'cancelled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                disabled={order.status === 'cancelled'}
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 