'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

// Sample data - replace with your actual data source
const menuCategories = [
  { id: 'appetizers', name: 'Appetizers' },
  { id: 'main-courses', name: 'Main Courses' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'beverages', name: 'Beverages' },
];

const dishes = [
  {
    id: 1,
    name: 'Bruschetta',
    description: 'Toasted bread topped with tomatoes, garlic, and fresh basil',
    price: 8.99,
    category: 'appetizers',
    dietary: ['vegetarian'],
  },
  {
    id: 2,
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and basil',
    price: 12.99,
    category: 'main-courses',
    dietary: ['vegetarian'],
  },
  {
    id: 3,
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
    price: 7.99,
    category: 'desserts',
    dietary: ['vegetarian'],
  },
  // Add more dishes as needed
];

const dietaryOptions = [
  { id: 'vegetarian', name: 'Vegetarian' },
  { id: 'vegan', name: 'Vegan' },
  { id: 'gluten-free', name: 'Gluten Free' },
];

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);

  const filteredDishes = dishes.filter((dish) => {
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || dish.category === selectedCategory;
    const matchesDietary = selectedDietary.length === 0 || 
                          selectedDietary.some(diet => dish.dietary.includes(diet));
    
    return matchesSearch && matchesCategory && matchesDietary;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Menu</h1>
        <p className="text-gray-600">Discover our delicious offerings</p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search dishes..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400" />
            <select
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {menuCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dietary Filters */}
        <div className="flex flex-wrap gap-2">
          {dietaryOptions.map((option) => (
            <button
              key={option.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedDietary.includes(option.id)
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => {
                setSelectedDietary(prev =>
                  prev.includes(option.id)
                    ? prev.filter(id => id !== option.id)
                    : [...prev, option.id]
                );
              }}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDishes.map((dish) => (
          <div
            key={dish.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
              <p className="text-gray-600 mb-4">{dish.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-red-600 font-bold">${dish.price.toFixed(2)}</span>
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredDishes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No dishes found matching your criteria.</p>
        </div>
      )}
    </div>
  );
} 