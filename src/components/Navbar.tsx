import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Header from './Header';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { themeName } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={`shadow-md fixed w-full z-20 ${themeName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          DummyKart
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/about" className="hover:underline">About</Link>

          {/* Theme switcher */}
          <div className="ml-4">
            <Header />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" className="block hover:underline">Home</Link>
          <Link to="/contact" className="block hover:underline">Contact</Link>
          <Link to="/about" className="block hover:underline">About</Link>
          

          <div className="pt-2">
            <Header />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
