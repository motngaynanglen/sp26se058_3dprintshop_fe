import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24 text-center">
        <div>
          <h1 className="text-5xl mb-4 font-bold">Welcome to 3D Print Shop</h1>
          <p className="text-xl mb-8 opacity-90">Transform your ideas into reality with our premium 3D printing services</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/products" className="bg-white text-indigo-600 py-4 px-8 rounded no-underline font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg inline-block">
              Browse Products
            </Link>
            <Link to="/custom-order" className="bg-transparent text-white border-2 border-white py-4 px-8 rounded no-underline font-semibold transition-all hover:bg-white/10 inline-block">
              Custom Order
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-center mb-12 text-4xl text-gray-800">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center mb-4 text-gray-500">Product Image {item}</div>
                <h3 className="m-0 mb-2 text-gray-800">Product Name {item}</h3>
                <p className="text-xl font-bold text-indigo-600 my-2">$29.99</p>
                <Link to={`/products/${item}`} className="inline-block py-2 px-4 bg-indigo-600 text-white no-underline rounded mt-4 transition-colors hover:bg-indigo-700">
                  View Details
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/products" className="text-indigo-600 no-underline font-semibold hover:underline">
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-center mb-12 text-4xl text-gray-800">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {['Toys & Games', 'Home Decor', 'Jewelry', 'Tech Accessories', 'Art & Sculptures', 'Custom Parts'].map((category) => (
              <Link key={category} to={`/products?category=${category}`} className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-lg text-center no-underline transition-transform hover:scale-105">
                <h3 className="m-0">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-center mb-12 text-4xl text-gray-800">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg text-center shadow-md">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="m-0 mb-4 text-gray-800">AI-Powered Design</h3>
              <p className="text-gray-600 leading-relaxed">Convert your 2D images into customizable 3D models using our advanced AI technology</p>
            </div>
            <div className="bg-white p-8 rounded-lg text-center shadow-md">
              <div className="text-5xl mb-4">🖨️</div>
              <h3 className="m-0 mb-4 text-gray-800">Custom Printing</h3>
              <p className="text-gray-600 leading-relaxed">Upload your own 3D files and choose from various materials and finishes</p>
            </div>
            <div className="bg-white p-8 rounded-lg text-center shadow-md">
              <div className="text-5xl mb-4">✏️</div>
              <h3 className="m-0 mb-4 text-gray-800">Design Services</h3>
              <p className="text-gray-600 leading-relaxed">Our expert designers will create 3D models from your reference images</p>
            </div>
            <div className="bg-white p-8 rounded-lg text-center shadow-md">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="m-0 mb-4 text-gray-800">Fast Delivery</h3>
              <p className="text-gray-600 leading-relaxed">Quick turnaround times with real-time order tracking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-center mb-12 text-4xl text-gray-800">Learn About 3D Printing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-indigo-600">
              <h3 className="m-0 mb-4 text-gray-800">3D Printing Technology</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">Discover the latest advancements in 3D printing technology and materials</p>
              <Link to="/blog/technology" className="text-indigo-600 no-underline font-semibold hover:underline">
                Read More →
              </Link>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-indigo-600">
              <h3 className="m-0 mb-4 text-gray-800">Design Trends</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">Stay updated with the latest design trends and applications</p>
              <Link to="/blog/trends" className="text-indigo-600 no-underline font-semibold hover:underline">
                Read More →
              </Link>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-indigo-600">
              <h3 className="m-0 mb-4 text-gray-800">Applications</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">Explore various applications of 3D printing across industries</p>
              <Link to="/blog/applications" className="text-indigo-600 no-underline font-semibold hover:underline">
                Read More →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

