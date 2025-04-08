'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../components/LoadingSpinner';

interface CheckoutFormProps {
  totalAmount: number;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

export default function CheckoutForm({ totalAmount, isProcessing, setIsProcessing }: CheckoutFormProps) {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const validateForm = () => {
    const errors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    const postalCodeRegex = /^[A-Za-z0-9\s-]{5,10}$/;

    if (!deliveryInfo.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!deliveryInfo.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(deliveryInfo.email)) {
      errors.email = 'Invalid email format';
    }

    if (!deliveryInfo.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(deliveryInfo.phone)) {
      errors.phone = 'Invalid phone number format';
    }

    if (!deliveryInfo.address.trim()) {
      errors.address = 'Address is required';
    }

    if (!deliveryInfo.city.trim()) {
      errors.city = 'City is required';
    }

    if (!deliveryInfo.postalCode.trim()) {
      errors.postalCode = 'Postal code is required';
    } else if (!postalCodeRegex.test(deliveryInfo.postalCode)) {
      errors.postalCode = 'Invalid postal code format';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // For now, we'll just simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and redirect to success page
      clearCart();
      router.push('/order-success');
    } catch (err) {
      setError('An error occurred while processing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={deliveryInfo.name}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 ${
            formErrors.name ? 'border-red-500' : ''
          }`}
        />
        {formErrors.name && (
          <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={deliveryInfo.email}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 ${
            formErrors.email ? 'border-red-500' : ''
          }`}
        />
        {formErrors.email && (
          <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={deliveryInfo.phone}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 ${
            formErrors.phone ? 'border-red-500' : ''
          }`}
        />
        {formErrors.phone && (
          <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
        )}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Delivery Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={deliveryInfo.address}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 ${
            formErrors.address ? 'border-red-500' : ''
          }`}
        />
        {formErrors.address && (
          <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
        )}
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          City
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={deliveryInfo.city}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 ${
            formErrors.city ? 'border-red-500' : ''
          }`}
        />
        {formErrors.city && (
          <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>
        )}
      </div>

      <div>
        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
          Postal Code
        </label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          value={deliveryInfo.postalCode}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 ${
            formErrors.postalCode ? 'border-red-500' : ''
          }`}
        />
        {formErrors.postalCode && (
          <p className="mt-1 text-sm text-red-600">{formErrors.postalCode}</p>
        )}
      </div>

      {error && (
        <div className="text-red-600 text-sm mt-2">{error}</div>
      )}

      <button
        type="submit"
        disabled={isProcessing}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-full transition duration-300 disabled:opacity-50"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center">
            <LoadingSpinner />
            <span className="ml-2">Processing...</span>
          </div>
        ) : (
          'Place Order'
        )}
      </button>
    </form>
  );
} 