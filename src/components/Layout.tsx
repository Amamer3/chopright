import type { ReactNode } from 'react';
import { useState } from 'react';
import { useCart } from '../context/CartContext'; // Import CartContext

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart(); // Get cart state

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Calculate total items in cart for badge
  const totalCartItems = cart.reduce((sum: any, item: { quantity: any; }) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#fef7ed]">
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm flex items-center justify-between px-4 sm:px-8 h-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-400 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg font-bold" aria-label="Bites Restaurant Logo">
              🍽️
            </span>
          </div>
          <span className="font-black text-2xl tracking-wide text-gray-900 font-sans">Bites</span>
        </div>
        <nav className="hidden lg:block flex-1" role="navigation" aria-label="Main navigation">
          <ul className="flex justify-center gap-10 text-base font-medium text-gray-700">
            <li><a href="#about" className="hover:text-orange-500 transition-colors duration-200">About Us</a></li>
            <li><a href="#menu" className="hover:text-orange-500 transition-colors duration-200">Menu</a></li>
            <li><a href="#reviews" className="hover:text-orange-500 transition-colors duration-200">Reviews</a></li>
            <li><a href="#blog" className="hover:text-orange-500 transition-colors duration-200">Blog</a></li>
            <li><a href="#contact" className="hover:text-orange-500 transition-colors duration-200">Contacts</a></li>
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium" aria-label="Current language: English">EN</span>
          </div>
          <button
            className="relative bg-orange-400 text-white font-semibold rounded-full px-4 py-2.5 shadow-lg hover:bg-orange-500 transition-all duration-200 text-sm"
            aria-label="View cart"
          >
            <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </button>
          <button
            className="bg-orange-400 text-white font-semibold rounded-full px-6 py-2.5 shadow-lg hover:bg-orange-500 transition-all duration-200 text-sm"
            aria-label="Reserve a table"
          >
            Reserve Table
          </button>
          <button
            className="lg:hidden text-gray-600 hover:text-orange-500 transition-colors duration-200"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </header>
      {isMenuOpen && (
        <nav className="lg:hidden bg-white shadow-md p-4 mt-20 fixed w-full z-40" role="navigation" aria-label="Mobile navigation">
          <ul className="flex flex-col gap-4 text-base font-medium text-gray-700">
            <li><a href="#about" className="hover:text-orange-500 transition-colors duration-200" onClick={toggleMenu}>About Us</a></li>
            <li><a href="#menu" className="hover:text-orange-500 transition-colors duration-200" onClick={toggleMenu}>Menu</a></li>
            <li><a href="#reviews" className="hover:text-orange-500 transition-colors duration-200" onClick={toggleMenu}>Reviews</a></li>
            <li><a href="#blog" className="hover:text-orange-500 transition-colors duration-200" onClick={toggleMenu}>Blog</a></li>
            <li><a href="#contact" className="hover:text-orange-500 transition-colors duration-200" onClick={toggleMenu}>Contacts</a></li>
          </ul>
        </nav>
      )}
      <main className="flex-1 pt-24">{children}</main>
      <footer className="bg-white text-gray-500 text-center py-8 text-sm mt-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2025 Bites Restaurant. All rights reserved. Made with ❤️ for food lovers.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;