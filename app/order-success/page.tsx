'use client';

import { CheckCircle, Clock, Package, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function OrderSuccessPage() {
  // Generate a random order number for demonstration
  const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  
  // Calculate estimated delivery time (current time + 45 minutes)
  const deliveryTime = new Date();
  deliveryTime.setMinutes(deliveryTime.getMinutes() + 45);
  const formattedDeliveryTime = deliveryTime.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        {/* Confirmation Message */}
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your order! We've received your order #{orderNumber} and will begin preparing it right away.
        </p>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="space-y-4">
            {/* Order Number */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Order Number</span>
              <span className="font-semibold">#{orderNumber}</span>
            </div>

            {/* Estimated Delivery */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Estimated Delivery</span>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                <span className="font-semibold">{formattedDeliveryTime}</span>
              </div>
            </div>

            {/* Order Status */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Status</span>
              <div className="flex items-center">
                <Package className="w-4 h-4 mr-2 text-blue-500" />
                <span className="font-semibold text-blue-600">Preparing your order</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/orders"
            className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
          >
            Track Order
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
          <Link
            href="/menu"
            className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-full transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Additional Information */}
        <div className="mt-8 text-sm text-gray-500">
          <p className="mb-2">We'll send you an email with your order details and tracking information.</p>
          <p>If you have any questions, please contact our support team.</p>
        </div>
      </div>
    </div>
  );
} 