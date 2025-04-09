'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, Utensils } from 'lucide-react';
import Link from 'next/link';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  deliveryTime: string;
  categories: string[];
}

export default function RestaurantManagement() {
  const { logout } = useAuth();
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    {
      id: '1',
      name: 'Sample Restaurant',
      description: 'A sample restaurant description',
      image: '/restaurant1.jpg',
      rating: 4.5,
      deliveryTime: '30-45 min',
      categories: ['Italian', 'Pizza'],
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newRestaurant, setNewRestaurant] = useState<Partial<Restaurant>>({
    name: '',
    description: '',
    image: '',
    rating: 0,
    deliveryTime: '',
    categories: [],
  });

  const handleAddRestaurant = () => {
    if (newRestaurant.name && newRestaurant.description) {
      const restaurant: Restaurant = {
        id: Date.now().toString(),
        name: newRestaurant.name,
        description: newRestaurant.description,
        image: newRestaurant.image || '/default-restaurant.jpg',
        rating: newRestaurant.rating || 0,
        deliveryTime: newRestaurant.deliveryTime || '30-45 min',
        categories: newRestaurant.categories || [],
      };
      setRestaurants([...restaurants, restaurant]);
      setIsAdding(false);
      setNewRestaurant({
        name: '',
        description: '',
        image: '',
        rating: 0,
        deliveryTime: '',
        categories: [],
      });
    }
  };

  const handleDeleteRestaurant = (id: string) => {
    setRestaurants(restaurants.filter((r) => r.id !== id));
  };

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Restaurant Management</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
          >
            <Plus size={16} />
            Add Restaurant
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Add Restaurant Form */}
      {isAdding && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Add New Restaurant</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Restaurant Name
              </label>
              <input
                type="text"
                value={newRestaurant.name}
                onChange={(e) =>
                  setNewRestaurant({ ...newRestaurant, name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newRestaurant.description}
                onChange={(e) =>
                  setNewRestaurant({ ...newRestaurant, description: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={newRestaurant.image}
                onChange={(e) =>
                  setNewRestaurant({ ...newRestaurant, image: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={newRestaurant.rating}
                  onChange={(e) =>
                    setNewRestaurant({
                      ...newRestaurant,
                      rating: parseFloat(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Time
                </label>
                <input
                  type="text"
                  value={newRestaurant.deliveryTime}
                  onChange={(e) =>
                    setNewRestaurant({
                      ...newRestaurant,
                      deliveryTime: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddRestaurant}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
              >
                Add Restaurant
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Restaurant List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/restaurants/${restaurant.id}/menu`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Utensils size={16} />
                  </Link>
                  <button
                    onClick={() => setEditingId(restaurant.id)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteRestaurant(restaurant.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mt-2">{restaurant.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1 text-gray-600">{restaurant.rating}</span>
                </div>
                <span className="text-gray-600">{restaurant.deliveryTime}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {restaurant.categories.map((category) => (
                  <span
                    key={category}
                    className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 