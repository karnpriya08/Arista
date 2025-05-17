import React, { useEffect, useState } from 'react';
import { FaSearch, FaHeart, FaShoppingCart, FaUser, FaTimes, FaShopify } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/action/productAction';
import { Badge } from 'customizable-react-badges';
import Nav from '../Nav';
import image from '../../assets/images/logo2.png';

const Header = () => {
  const dispatch = useDispatch();
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { products = [] } = useSelector((state) => state.allProducts || {});
  const { cartItems = [] } = useSelector((state) => state.cart || {});
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setOpenModal(value.trim().length > 0);
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-red-400 via-pink-500 to-red-600 shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center text-black font-bold text-xl">
            <img src={image} alt="Logo" className="w-10 h-auto" />
            <span className="ml-2">Arista Mall</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <button
                className="flex items-center bg-white rounded-full px-3 py-1 text-black text-sm"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <FaSearch />
                {searchOpen && (
                  <input
                    type="text"
                    className="ml-2 bg-transparent outline-none text-black"
                    placeholder="Search products..."
                    value={search}
                    onChange={handleSearchChange}
                    autoFocus
                  />
                )}
              </button>
              {openModal && (
                <div className="absolute top-full left-0 w-72 max-h-60 mt-2 bg-white shadow-lg border rounded-md z-50 overflow-y-auto text-black">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((p) => (
                      <Link to={`/products/${p.id}`} key={p.id} onClick={() => setOpenModal(false)}>
                        <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
                          <img src={p.image} alt={p.title} className="w-8 h-8 object-contain" />
                          <span>{p.title}</span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">No results found</div>
                  )}
                </div>
              )}
            </div>

            {/* Icons */}
            <Link to="/" className="text-black text-xl hover:text-gray-800"><HiHome /></Link>
            <Link to="/products" className="text-black text-xl hover:text-gray-800"><FaShopify /></Link>
            <Link to="/login" className="text-black text-xl hover:text-gray-800"><FaUser /></Link>
            <Link to="/wishlist" className="text-black text-xl hover:text-gray-800"><FaHeart /></Link>
            <Link to="/cart" className="text-black text-xl relative hover:text-gray-800">
              <Badge content={cartItemCount} bgColor="pink">
                <FaShoppingCart />
              </Badge>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden text-black text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <RxHamburgerMenu />}
          </div>
        </div>
      </header>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-white z-40 shadow-md py-4 border-t border-gray-300">
          <ul className="flex flex-col items-start px-6 space-y-4 text-black text-lg font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)}><li className="flex items-center gap-2"><HiHome />Home</li></Link>
            <Link to="/products" onClick={() => setMenuOpen(false)}><li className="flex items-center gap-2"><FaShopify />Shop</li></Link>
            <Link to="/login" onClick={() => setMenuOpen(false)}><li className="flex items-center gap-2"><FaUser />Login</li></Link>
            <Link to="/wishlist" onClick={() => setMenuOpen(false)}><li className="flex items-center gap-2"><FaHeart />Wishlist</li></Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)}>
              <li className="flex items-center gap-2">
                <Badge content={cartItemCount} bgColor="pink">
                  <FaShoppingCart />
                </Badge>
                Cart
              </li>
            </Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}><li>About Us</li></Link>
          </ul>
        </div>
      )}

      {/* Nav categories (below header) */}
      <div className="mt-20"><Nav /></div>
    </>
  );
};

export default Header;
