'use client';

import { useOrder } from '../context/OrderContext';
import { Clock, CheckCircle, Truck, Package } from 'lucide-react';

const statusIcons = {
  pending: Clock,
  preparing: Package,
  'out-for-delivery': Truck,
  delivered: CheckCircle,
};

const statusColors = {
  pending: 'text-yellow-600',
  preparing: 'text-blue-600',
  'out-for-delivery': 'text-purple-600',
  delivered: 'text-green-600',
};

export default function OrdersPage() {
  const { orders } = useOrder();

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">No Orders Yet</h1>
          <p className="text-gray-600 mb-8">You haven't placed any orders yet.</p>
          <a
            href="/menu"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
          >
            Browse Menu
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      
      <div className="space-y-6">
        {orders.map((order) => {
          const StatusIcon = statusIcons[order.status];
          const statusColor = statusColors[order.status];
          
          return (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                    <p className="text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`flex items-center ${statusColor}`}>
                    <StatusIcon className="w-5 h-5 mr-2" />
                    <span className="capitalize">{order.status.replace(/-/g, ' ')}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Items</h3>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <h3 className="font-semibold mb-2">Delivery Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <p>
                      <span className="text-gray-600">Name:</span> {order.deliveryInfo.name}
                    </p>
                    <p>
                      <span className="text-gray-600">Email:</span> {order.deliveryInfo.email}
                    </p>
                    <p>
                      <span className="text-gray-600">Phone:</span> {order.deliveryInfo.phone}
                    </p>
                    <p>
                      <span className="text-gray-600">Address:</span> {order.deliveryInfo.address}
                    </p>
                    <p>
                      <span className="text-gray-600">City:</span> {order.deliveryInfo.city}
                    </p>
                    <p>
                      <span className="text-gray-600">Postal Code:</span> {order.deliveryInfo.postalCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 