import React, { useState } from 'react';
import { GoHeart } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, updateQuantity } from '../../redux/action/cartAction';
import { useDispatch } from 'react-redux';
import { addToWishlist } from '../../redux/action/wishlistAction';
import toast from 'react-hot-toast';

const index = ({ product }) => {
  const [qty, setQty] = useState(1);
  const [showGoToCart, setShowGoToCart] = useState(false); // Show "Go to Cart" button after adding to cart
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem('user');

  // Handling title length for symmetry and showing an ellipsis if title is too long
  const maxTitleLength = 20;
  const shorterTitle = product.title.length > maxTitleLength
    ? product.title.substring(0, maxTitleLength) + '...'
    : product.title;

  // Add to cart handler with login check
  const addcartHandler = () => {
    if (!isLoggedIn) {
      toast.error("Please login to add items to the Cart!");
      navigate("/login");
    } else {
      dispatch(addToCart(String(product.id), qty)); // Add item to cart with quantity
      toast.success("Item added successfully!");
      setShowGoToCart(true); // Show Go to Cart button after item is added
    }
  };

  // Add to wishlist handler with login check
  const addWishHandler = () => {
    if (!isLoggedIn) {
      toast.error("Please login to add items to the wishlist!");
      navigate("/login");
    } else {
      dispatch(addToWishlist(product.id)); // Add item to wishlist
      toast.success("Item added to wishlist successfully!");
      navigate(`/wishlist`); // Redirect to wishlist page
    }
  };

  return (
    <>
      <div className='container bg-white' key={product.id}>
        <div className='border rounded-sm border-transparent shadow-md hover:translate-y-2'>
          {/* Product Image */}
          <Link to={`/products/${product.id}`}>
            <div className='w-auto h-96 border-transparent m-2 shadow-lg m-1 overflow-hidden'>
              <img src={product.image} alt="img" />
            </div>
          </Link>
          <div className='text-center m-4 p-2 h-56'>
            {/* Product Title and Category */}
            <Link to={`/products/${product.id}`}>
              <h3 className='font-semibold overflow-hidden hidden text-ellipsis'>{shorterTitle}</h3>
              <p><span className='font-black'>category: </span>{product.category}</p>
            </Link>
            {/* Price and Rating */}
            <div className='flex justify-around'>
              <p data-testid="product-price">
                <span className="font-black">price: $</span>{product.price}
              </p>
              <p><span className='font-black'>rating: </span>{product.rating.rate}</p>
            </div>
            {/* Quantity Selection */}
            <div className='flex m-1 p-1 mx-16 lg:mx-4'>
              <p className='p-2'>Qty:</p>
              <div className='p-2' style={{ backgroundColor: "#F72C5B" }} onClick={() => setQty(qty + 1)} data-testid='increase'>+</div>
              <span className='bg-white border border-gray-300 px-3 py-1' data-testid='quantity'>{qty}</span>
              <div
                className={`p-2 ${qty === 1 ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer hover:scale-110'}`}
                style={{ backgroundColor: "#F72C5B" }}
                onClick={() => {
                  if (qty === 1) {
                    toast.error("Minimum quantity is 1");
                    return;
                  }
                  setQty(qty - 1); // Decrease quantity
                }} data-testid='decrease'> -</div>
            </div>

            {/* Buttons for Wishlist and Cart */}
            <div className='flex justify-between m-1 gap-3'>
              <button onClick={addWishHandler} data-testid="wishlist-button" className="btn-action">
                <GoHeart className='m-3 text-xl hover:scale-150' />
              </button>
              <button onClick={addcartHandler} data-testid="cart-button" className="btn-action">Add to Cart</button>
            </div>

            {/* Show "Go to Cart" button if item was added to cart */}
            {showGoToCart && (
              <button
                data-testid='go-to-cart'
                onClick={() => navigate("/cart")}
                className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500 mt-3 w-full"
              >
                Go to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
