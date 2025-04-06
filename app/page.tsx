import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="/hero-bg.jpg"
          alt="Delicious food background"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-5xl font-bold mb-4 text-center">Delicious Food Delivered To Your Door</h1>
          <p className="text-xl mb-8 text-center">Order your favorite meals from the best restaurants in town</p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition duration-300">
            Order Now
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Food Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {['Pizza', 'Burger', 'Sushi', 'Pasta'].map((category) => (
            <div key={category} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <div className="h-48 relative">
                <Image
                  src={`/${category.toLowerCase()}.jpg`}
                  alt={category}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{category}</h3>
                <p className="text-gray-600 mt-2">Explore our delicious {category} options</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Dishes */}
      <section className="py-16 bg-gray-100 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Dishes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { name: 'Margherita Pizza', price: '$12.99', image: '/pizza.jpg' },
            { name: 'Classic Burger', price: '$8.99', image: '/burger.jpg' },
            { name: 'California Roll', price: '$14.99', image: '/sushi.jpg' },
          ].map((dish) => (
            <div key={dish.name} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 relative">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{dish.name}</h3>
                <p className="text-red-600 font-bold mt-2">{dish.price}</p>
                <button className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 w-full">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
} 