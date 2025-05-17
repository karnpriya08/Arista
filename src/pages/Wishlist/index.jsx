import React from 'react';
import { MdArrowForwardIos, MdDelete } from "react-icons/md";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaFacebook, FaInstagramSquare, FaPinterest } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "../../redux/action/cartAction";
import Image from '../../assets/images/wishL.png';
import { addToWishlist, removeFromWishlist } from '../../redux/action/wishlistAction';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = id;

  const wishListItems = useSelector((state) => state.wishlist?.wishItems || []);

  const removeItemFromWishList = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.success("Removed from wishlist!");
  };

  const addHandler = (productId) => {
    dispatch(addToCart(productId, 1));
    toast.success("Item added to Cart successfully!");
    dispatch(removeFromWishlist(productId));
    toast.success("Removed from wishlist!");
    navigate('/cart');
  };

  return (
    <div className="w-full pt-20 px-4 sm:px-6 lg:px-10">
      {/* Header Section */}
      <header className="bg-gradient-to-tl from-stone-50 via-red-50 to-red-200 p-6 rounded-md shadow-sm mb-6">
        <h1 className="text-center font-semibold text-xl sm:text-2xl">Wishlist</h1>
        <h3 className="font-light text-red-300 text-center">Shop</h3>
      </header>

      {/*  Navigation */}
      <div className="flex flex-wrap gap-2 text-sm mb-6">
        <Link to="/" className="hover:text-red-400 flex items-center gap-1">
          Home <MdArrowForwardIos size={12} />
        </Link>
        <Link to="/cart" className="hover:text-red-400 flex items-center gap-1">
          Cart <MdArrowForwardIos size={12} />
        </Link>
        <span className="text-gray-600">Wishlist</span>
      </div>

      {/*  Wishlist Items */}
      <div>
        {wishListItems.length === 0 ? (
          //  Empty Wishlist Layout
          <div className="max-w-md w-full mx-auto text-center space-y-4">
            <img src={Image} alt="Empty Wishlist" className="w-48 h-48 mx-auto object-contain" />
            <h1 className="font-bold text-2xl text-red-400">Your Wishlist is Empty</h1>
            <p className="text-blue-400">Seems like you don't have wishes here.</p>
            <p className="text-blue-400">Make a wish!</p>
            <Link to="/products">
              <button className="mt-3 bg-red-400 hover:bg-red-500 text-white py-2 px-6 rounded-md">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          //  Wishlist Items List
          <div className="space-y-6">
            {wishListItems.map((item) => (
              <div key={item.product} className="bg-white p-4 rounded-md shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 items-center">
                  <Link to={`/products/${item.product}`}>
                    <img src={item.image} alt={item.title} className="w-24 h-24 object-contain" />
                  </Link>
                  <p className="text-sm font-medium">{item.title}</p>
                  <h3 className="text-base font-semibold text-green-600">₹ {item.price}</h3>
                  <button
                    onClick={() => removeItemFromWishList(item.product)}
                    className="text-white hover:text-red-800 text-center "
                  >
                  <MdDelete size={24}  className='text-center ml-15'/>
                  </button>
                  <button
                    data-testid="add-to-cart"
                    onClick={() => addHandler(item.product)}
                    className="bg-gray-500 text-white hover:bg-gray-600 py-2 px-4 rounded-md w-fit"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Social Links */}
      <div className="mt-10 flex flex-wrap gap-3 text-xl items-center">
        <span className="font-medium">Share on:</span>
        <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="hover:text-red-400">
          <FaFacebook />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-red-400">
          <FaSquareXTwitter />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="hover:text-red-400">
          <FaInstagramSquare />
        </a>
        <a href="https://www.pinterest.com" target="_blank" rel="noreferrer" className="hover:text-red-400">
          <FaPinterest />
        </a>
      </div>
    </div>
  );
};

export default Wishlist;
