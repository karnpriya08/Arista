import React, { useEffect, useState } from 'react'
import { FaSearch, FaHeart, FaShoppingCart, FaUser, FaTimes, FaBars, FaShopify } from 'react-icons/fa';
import image from "../../assets/images/logo2.png";
import { Badge } from 'customizable-react-badges';
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { getAllProducts } from '../../redux/action/productAction';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../Nav';
import { HiHome } from 'react-icons/hi';

const index = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  // getting products 
  const allproducts = useSelector((state) => state.allProducts || {});
  const { products = [] } = allproducts;
  // getting cart items to calculate cart item no. 
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // handle changes of search to get value of search
  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    setOpenModal(true);
    if (e.target.value == 0) {
      setOpenModal(false);
    }
  }
  // search functinality comparing search value with prduct title 
  const searchProduct = (product) => {
    if (search) {
      return product.title.toLowerCase().includes(search.toLowerCase())
    }
    return product
  }
  const filterProducts = products.filter((product) => searchProduct(product));

  return (
    <>
      <div className='fixed top-0 left-0 w-full bg-gradient-to-r from-red-400 via-pink-500 to-red-600 p-2 shadow-md a z-50'>
        <div className='flex justify-between items-center '>
          {/* logo */}
          <Link to="/">
            <header className='flex text-xl justify-start font-bold items-center md:left-1/3 p-2 m-1  '>
              <img src={image} alt="lo" width={50} height={20} />
              <span className='ml-2'>Arista Mall</span>
            </header>
          </Link>
          <nav className='flex items-center m-1 p-1 space-x-6'>
            {/* search for mobile and desktop  */}
            <div onClick={() => setSearchOpen(!searchOpen)}
              className="relative flex gap-0 justify-around  border rounded-2xl bg-white   hover:text-black hover:scale-110 items-center text-black text-xl md:mb-5 p-2" >
              <div className="container-responsive">
                {/* displaying input field on click */}
                {searchOpen && (
                  <div className="">
                    <input type="text" placeholder='search for product' className='w-full focus:outline-none cursor-pointer' autoFocus
                      onChange={handleChange} />
                  </div>
                )}
              </div> <FaSearch />
            </div>
            {/* Dropdown search modal */}
            {openModal && search?.length > 0 && (
              <div className="absolute w-1/2   lg:right-24 lg:w-1/4 bg-white mt-72 border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                {filterProducts.length > 0 ? (
                  // mapping on filtered product to display 
                  filterProducts.map((curPro, index) => (
                    <Link to={`/products/${curPro.id}`}>
                      <div key={index} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        //  {/* // Handle click, like navigating or selecting */}
                        onClick={() => { setOpenModal(false); setSearch("") }}>
                        <img src={curPro.image} alt={curPro.title} className="w-8 h-8 object-contain" />
                        <span>{curPro.title}</span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">No results found</div>
                )}
              </div>
            )}
            {/* desktop links */}
            <ul className='hidden md:grid md:grid-cols-5  justify-evenly gap-2 mt-1'>
              <Link to='/' className='text-2xl hover:text-blue-200  hover:scale-110'><HiHome /></Link>
              <Link to="/products" className='text-2xl hover:text-blue-200 '><FaShopify className='hover:scale-120' /></Link>

              <Link to="/login"><li className="relative text-2xl hover:scale-110"><FaUser /> </li></Link>

              <Link to="/wishlist">
                <li className='flex  text-2xl relative hover:scale-110'>
                  <FaHeart />
                </li>
              </Link>

              <Link to="cart"><li className='flex text-2xl relative hover:scale-110'>
                <Badge content={cartItemCount} verticalAlignment="top" horizontalAlignment="right" bgColor="pink">
                  <FaShoppingCart /><span className='text-transparent'>......</span>
                </Badge>
              </li>
              </Link>

            </ul>


            {/* hamburger button */}
            <div className='md:hidden'>
              <button data-testid="hamburger-toggle" className='text-xl text-white '
                onClick={() => setMenuOpen(!menuOpen)} >
                {menuOpen ? <FaTimes /> : <RxHamburgerMenu />}
              </button>
            </div>
          </nav>
          {/* navbar end  */}
        </div>
      </div>
      {/* mobile links */}
      <div className={`transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-96' : 'max-h-0 overflow-hidden'} z-40 fixed top-16 left-0 w-full`}>
        {menuOpen && (
          <div className='bg-gradient-to-r from-red-400 via-pink-500 to-red-500  shadow-md border-red-500 rounded-2xl  font-bold w-auto  p-2 text-left z-10'>
            <ul className='md:hidden grid-cols-6 justify-around space-y-1 text-2xl px-5'>
              <Link to="/" >
                <li className='text-2xl hover:text-blue-200 flex gap-1 m-1.5'> <HiHome className='hover:scale-120' /> Home</li>
              </Link>
              <Link to="/products" >
                <li className='text-2xl hover:text-blue-200 flex gap-1 m-1.5'> <FaShopify className='hover:scale-120' /> Shop</li>
              </Link>
              <Link to="/login">
                <li className="relative  flex m-1.5  hover:text-blue-200"><FaUser />Login</li>
              </Link>
              <Link to="/wishlist " >
                <li className="flex items-center  relative  hover:text-blue-200 mb-3">
                  <FaHeart className='m-1.5' />Wishlist</li>
              </Link>
              <Link to="cart">
                <li className='flex  hover:text-blue-200'>
                  <div className=''>
                    <Badge content={cartItemCount} verticalAlignment="top" horizontalAlignment="right" bgColor="pink">
                      <FaShoppingCart className='m-1.5' />
                    </Badge>
                  </div>
                  <span className='inline-block'>cart</span>
                </li>
              </Link>
              <Link to="/about">
                <li className="relative flex m-1.5  hover:text-blue-200">About Us</li>
              </Link>
            </ul>
          </div>
        )}
      </div>
      {/* nav for category  */}
      <div className='mt-22'><Nav /></div>
    </>
  )
}

export default index