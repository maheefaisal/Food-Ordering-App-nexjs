# Food Ordering App

A modern food ordering application built with Next.js, featuring a user-friendly interface, secure authentication, and comprehensive admin dashboard.

## Features

### User Features
- 🍔 Browse restaurants and menus
- 🛒 Add items to cart
- 💳 Secure checkout process
- 📱 Responsive design for all devices
- 🔐 Secure authentication with 2FA
- 📍 Multiple delivery addresses
- 📦 Order tracking
- 📝 Order history
- 👤 User profile management

### Admin Features
- 🔐 Secure admin authentication with 2FA
- 📊 Dashboard with key metrics
- 🏪 Restaurant management
- 📝 Menu management
- 📦 Order management
- 👥 User management
- 📈 Analytics and reporting
- 🔍 Activity monitoring
- ⚙️ System settings

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Icons**: Lucide React
- **Authentication**: Custom implementation with 2FA
- **Database**: Local Storage (for demo)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/food-ordering-app.git
   cd food-ordering-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── admin/                 # Admin dashboard
│   ├── layout.tsx        # Admin layout with navigation
│   ├── page.tsx          # Admin dashboard home
│   ├── login/            # Admin login page
│   ├── restaurants/      # Restaurant management
│   ├── orders/           # Order management
│   ├── users/            # User management
│   ├── activity/         # Activity monitoring
│   └── settings/         # System settings
├── auth/                 # Authentication pages
│   ├── login/           # User login
│   ├── signup/          # User registration
│   └── forgot-password/ # Password recovery
├── cart/                # Shopping cart
├── checkout/            # Checkout process
├── context/             # React contexts
│   ├── AuthContext.tsx  # Authentication
│   ├── CartContext.tsx  # Shopping cart
│   ├── OrderContext.tsx # Orders
│   └── AddressContext.tsx # Delivery addresses
├── profile/             # User profile
├── orders/              # Order history
└── order-success/       # Order confirmation
```

## Authentication

### User Authentication
- Email/password login
- Social login (Google, Facebook, Twitter, GitHub)
- Two-factor authentication
- Password reset functionality
- Email verification

### Admin Authentication
- Secure admin login
- Two-factor authentication required
- Session management
- Role-based access control

### Default Admin Credentials
- Email: admin@example.com
- Password: Admin@123!
- 2FA Code: Any 6-digit number (for demo)

## Key Components

### Context Providers
- `AuthContext`: Handles authentication state and methods
- `CartContext`: Manages shopping cart state
- `OrderContext`: Handles order management
- `AddressContext`: Manages delivery addresses

### Pages
- `Home`: Restaurant listings and search
- `Restaurant`: Menu and ordering
- `Cart`: Shopping cart management
- `Checkout`: Order processing
- `Profile`: User information
- `Orders`: Order history
- `Admin`: Dashboard and management

## Design System

### Colors
- Primary: Blue (#3B82F6)
- Secondary: Red (#EF4444)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)
- Background: Gray (#F3F4F6)

### Typography
- Headings: Inter
- Body: System fonts
- Font sizes: Tailwind defaults

### Components
- Buttons: Primary, Secondary, Outline
- Cards: Restaurant, Menu Item, Order
- Forms: Input, Select, Checkbox
- Navigation: Header, Footer, Sidebar

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security

- All passwords are hashed
- Two-factor authentication for admin access
- Secure session management
- Protected API routes
- Input validation and sanitization
- XSS protection
- CSRF protection

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 