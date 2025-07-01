    import './App.css';
  import HeroSection from './components/HeroSection';
  import PopularDishes from './components/PopularDishes';

  function App() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">🍽️</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Bites</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors">About Us</a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors">Menu</a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors">Reviews</a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors">Blog</a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors">Contacts</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              🔍
            </button>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">
              Reserve Table
            </button>
          </div>
        </nav>

        {/* Hero Section with Three.js */}
        <HeroSection />

        {/* Popular Dishes Section */}
        <PopularDishes />

        {/* Services Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We provide exceptional dining experiences with our premium services
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Fast Delivery</h3>
                <p className="text-gray-600">
                  Quick and reliable delivery service to bring our delicious food right to your doorstep.
                </p>
              </div>
              
              {/* Service 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">👨‍🍳</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Expert Chefs</h3>
                <p className="text-gray-600">
                  Our experienced chefs create culinary masterpieces using the finest ingredients.
                </p>
              </div>
              
              {/* Service 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">🍽️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Fine Dining</h3>
                <p className="text-gray-600">
                  Elegant atmosphere and exceptional service for an unforgettable dining experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">🍽️</span>
                  </div>
                  <span className="text-xl font-bold">Bites</span>
                </div>
                <p className="text-gray-400">
                  Serving delicious food with passion and excellence since 2020.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Menu</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Reservations</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Delivery</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Catering</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Private Dining</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold mb-4">Contact Info</h4>
                <div className="space-y-2 text-gray-400">
                  <p>📍 123 Food Street, City</p>
                  <p>📞 +1 (555) 123-4567</p>
                  <p>✉️ info@bites.com</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Bites Restaurant. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  export default App;