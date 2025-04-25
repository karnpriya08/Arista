import React, { useState } from 'react';
import { GoHeart } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, updateQuantity } from '../../redux/action/cartAction';
import { useDispatch } from 'react-redux';
import { addToWishlist } from '../../redux/action/wishlistAction';
import toast from 'react-hot-toast';


const index = ({ product }) => {
  const [qty, setQty] = useState(1);
  const [showGoToCart, setShowGoToCart] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // check for login
  const isLoggedIn = localStorage.getItem('user');

  // handling title length to display with symmatry
  const maxTitleLength = 20;
  const shorterTitle = product.title.length > maxTitleLength
    ? product.title.substring(0, maxTitleLength) + '...'
    : product.title;
  // handling add to cart button checking for login then item adding item to cart  and showing go to cart button 
  const addcartHandler = () => {
    if (!isLoggedIn) {
      toast.error("Please login to add items to the Cart!");
      navigate("/login");
    }
    else {
      dispatch(addToCart(String(product.id), qty));
      toast.success("Item added succesfully!");
      setShowGoToCart(true);
    }
  }
  // handling add to wishlist button hecking for login then item adding item to wishlist 
  const addWishHandler = () => {
    if (!isLoggedIn) {
      toast.error("Please login to add items to the wishlist!");
      navigate("/login");
    } else {
      dispatch(addToWishlist(product.id));
      toast.success("Item added to wishlist successfully!");
      navigate(`/wishlist`);
    }
  }
  return (
    <>
      <div className='container bg-white' key={product.id} >
        <div className='border rounded-sm border-transparent  shadow-md hover:translate-y-2'>
          {/* image */}
          <Link to={`/products/${product.id}`}>
            <div className='w-auto h-96 border-transparentm-2 shadow-lg m-1 overflow-hidden'>
              <img src={product.image} alt="img" />
            </div>
          </Link>
          <div className='text-center m-4 p-2  h-56'>
            {/* name and category */}
            <Link to={`/products/${product.id}`}>
              <h3 className='font-semibold overflow-hiddenhidden text-ellipsis'>{shorterTitle}</h3>
              <p><span className='font-black'>category: </span>{product.category}</p>
            </Link>
            {/* price rating */}
            <div className='flex justify-around' >
            <p data-testid="product-price">
  <span className="font-black">price:$</span>{product.price}
</p>
              <p><span className='font-black'>rating:  </span> {product.rating.rate}</p>
            </div>
            {/* quantity */}
            <div className='flex m-1 p-1 mx-16 lg:mx-4'>
              <p className='p-2'>Qty:</p>
              <div className=' p-2' style={{ backgroundColor: "#F72C5B" }} onClick={() => setQty(qty + 1)} data-testid='increase'>+</div>
              <span className='bg-white border border-gray-300 px-3 py-1' data-testid='quantity'>{qty}</span>
              <div className=' p-2' style={{ backgroundColor: "#F72C5B" }} onClick={() => setQty(Math.max(qty - 1, 1))} data-testid='decrease' >-</div>
            </div>
            {/* buttons */}
            <div className='flex justify-around m-1 gap-1'>
              <button onClick={() => { addWishHandler(product) }} data-testid="wishlist-button">
                <GoHeart className='m-3 text-xl hover:scale-150' />
              </button>
              <button onClick={() => { addcartHandler(product) }} data-testid="cart-button" >Add to Cart</button>
            </div>
            {/* showing go to cart button if show to cart is true */}
            {showGoToCart && (
              <button data-testid='go-to-cart'
                onClick={() => navigate("/cart")}
                className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500">
                Go to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default index;
