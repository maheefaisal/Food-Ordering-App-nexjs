'use client';

import { useAuth } from '../../context/AuthContext';
import { BarChart, LineChart, PieChart } from 'lucide-react';

interface SalesData {
  date: string;
  amount: number;
}

interface PopularDish {
  name: string;
  orders: number;
  revenue: number;
}

interface CustomerFeedback {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

export default function Analytics() {
  const { logout } = useAuth();

  // Sample sales data
  const salesData: SalesData[] = [
    { date: 'Mar 1', amount: 1200 },
    { date: 'Mar 2', amount: 1500 },
    { date: 'Mar 3', amount: 1800 },
    { date: 'Mar 4', amount: 2000 },
    { date: 'Mar 5', amount: 2200 },
    { date: 'Mar 6', amount: 2500 },
    { date: 'Mar 7', amount: 2800 },
  ];

  // Sample popular dishes
  const popularDishes: PopularDish[] = [
    { name: 'Margherita Pizza', orders: 150, revenue: 1875 },
    { name: 'Chicken Burger', orders: 120, revenue: 1200 },
    { name: 'Caesar Salad', orders: 90, revenue: 900 },
    { name: 'Pasta Carbonara', orders: 80, revenue: 1000 },
    { name: 'Chocolate Cake', orders: 70, revenue: 700 },
  ];

  // Sample customer feedback
  const customerFeedback: CustomerFeedback[] = [
    {
      id: '1',
      customerName: 'John Doe',
      rating: 5,
      comment: 'Great food and fast delivery!',
      date: '2024-03-20',
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      rating: 4,
      comment: 'Good quality but delivery was a bit late.',
      date: '2024-03-19',
    },
    {
      id: '3',
      customerName: 'Mike Johnson',
      rating: 5,
      comment: 'Excellent service and delicious food!',
      date: '2024-03-18',
    },
  ];

  const totalSales = salesData.reduce((sum, data) => sum + data.amount, 0);
  const averageRating = customerFeedback.reduce((sum, feedback) => sum + feedback.rating, 0) / customerFeedback.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics & Reports</h1>
        <button
          onClick={() => logout()}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-red-600">${totalSales.toLocaleString()}</p>
            </div>
            <BarChart className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-yellow-600">{averageRating.toFixed(1)}/5.0</p>
            </div>
            <PieChart className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-green-600">{popularDishes.reduce((sum, dish) => sum + dish.orders, 0)}</p>
            </div>
            <LineChart className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
        <div className="h-64">
          <div className="flex items-end h-full space-x-2">
            {salesData.map((data, index) => (
              <div key={index} className="flex-1">
                <div
                  className="bg-red-500 rounded-t"
                  style={{ height: `${(data.amount / 3000) * 100}%` }}
                />
                <p className="text-center text-sm mt-2">{data.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Dishes */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Popular Dishes</h2>
        <div className="space-y-4">
          {popularDishes.map((dish, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{dish.name}</p>
                <p className="text-sm text-gray-600">{dish.orders} orders</p>
              </div>
              <p className="text-red-600 font-semibold">${dish.revenue.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Feedback */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Customer Feedback</h2>
        <div className="space-y-4">
          {customerFeedback.map((feedback) => (
            <div key={feedback.id} className="border-b pb-4 last:border-b-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{feedback.customerName}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500">{feedback.date}</p>
              </div>
              <p className="mt-2 text-gray-600">{feedback.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 