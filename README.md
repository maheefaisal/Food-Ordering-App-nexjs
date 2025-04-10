# 🍽️ Food Ordering App

A modern, responsive food ordering application built with Next.js, TypeScript, and Tailwind CSS. This application allows users to browse restaurants, view menus, add items to cart, and place orders with multiple delivery addresses.

## ✨ Features

### User Features
- **Restaurant Browsing**
  - View restaurant details and menus
  - Search and filter restaurants
  - Responsive grid layout

- **Menu Management**
  - Browse menu categories
  - View dish details with images
  - Add items to cart with quantity selection

- **Shopping Cart**
  - Real-time cart updates
  - Quantity modification
  - Item removal
  - Total price calculation

- **Checkout System**
  - Multiple saved delivery addresses
  - Form validation
  - Order summary
  - Payment processing (Stripe integration)

- **Order Management**
  - Order history tracking
  - Order status updates
  - Reorder functionality
  - Order confirmation emails

- **User Profile**
  - Personal information management
  - Address management
  - Order history access

### Admin Features
- **Admin Dashboard**
  - Secure authentication system
  - Intuitive navigation interface
  - Quick access to all management features
  - Responsive design for all screen sizes

- **Analytics & Reports**
  - Sales data visualization
    - Daily/weekly/monthly sales trends
    - Total revenue tracking
    - Sales growth metrics
  - Popular dishes analysis
    - Top-selling items
    - Revenue per dish
    - Order frequency
  - Customer feedback management
    - Rating system
    - Customer comments
    - Feedback trends
  - Performance metrics
    - Total orders
    - Average ratings
    - Customer satisfaction

- **Restaurant Management**
  - Add, edit, and delete restaurants
  - Menu management for each restaurant
  - Category organization
  - Price and availability control

- **Order Management**
  - View all orders
  - Update order status
  - Search and filter orders
  - Detailed order information

- **User Management**
  - View user profiles
  - Manage user permissions
  - Track user activity

## 🛠️ Tech Stack

- **Frontend**
  - Next.js 14
  - React
  - TypeScript
  - Tailwind CSS
  - Lucide Icons

- **State Management**
  - React Context API
  - Custom hooks

- **Authentication**
  - Custom auth system
  - Protected routes

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/food-ordering-app.git
cd food-ordering-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Admin Access
1. Navigate to `/admin/login`
2. Use the following credentials:
   - Username: `admin`
   - Password: `admin123`

## 📁 Project Structure

```
food-ordering-app/
├── app/
│   ├── admin/              # Admin dashboard
│   │   ├── analytics/      # Analytics and reports
│   │   ├── restaurants/    # Restaurant management
│   │   ├── orders/         # Order management
│   │   ├── users/          # User management
│   │   └── login/          # Admin login
│   ├── addresses/          # Address management page
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout process
│   ├── components/        # Reusable components
│   ├── context/           # React Context providers
│   ├── menu/              # Restaurant menu page
│   ├── order-success/     # Order confirmation page
│   ├── orders/            # Order history page
│   ├── profile/           # User profile page
│   └── restaurants/       # Restaurant listing page
├── public/                # Static assets
└── styles/                # Global styles
```

## 🔧 Key Components

- **Context Providers**
  - `CartContext`: Manages shopping cart state
  - `OrderContext`: Handles order tracking
  - `AddressContext`: Manages delivery addresses
  - `AuthContext`: Handles admin authentication

- **Pages**
  - Restaurant listing and details
  - Menu browsing
  - Shopping cart
  - Checkout process
  - Order confirmation
  - Order history
  - User profile
  - Address management
  - Admin dashboard
  - Restaurant management
  - Menu management
  - Order management
  - Analytics and reports

## 🎨 Design System

- **Colors**
  - Primary: Red (#EF4444)
  - Secondary: Gray (#6B7280)
  - Success: Green (#10B981)
  - Warning: Yellow (#F59E0B)
  - Error: Red (#DC2626)

- **Typography**
  - Headings: Inter
  - Body: Roboto

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Stripe](https://stripe.com/)
- [Lucide Icons](https://lucide.dev/) 