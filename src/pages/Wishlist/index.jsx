import React, { useEffect } from 'react'
import { MdArrowForwardIos, MdDelete } from "react-icons/md";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaFacebook, FaInstagramSquare, FaPinterest } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "../../redux/action/cartAction";
import Image from '../../assets/images/wishL.png'
import { addToWishlist, removeFromWishlist } from '../../redux/action/wishlistAction';
import toast from 'react-hot-toast';

const Wishlist = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // getting id
  const { id } = useParams();
  const productId = id;
//  getting wishlist item from store
  const wishListItems = useSelector((state) => state.wishlist?.wishItems || []);  
  // removing item from wishlist
  const removeItemFromWishList = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.success("Removed from wishlist!");
  };
// add to cart and remove from wishlist
  const addHandler = (productId) => {    
    dispatch(addToCart(productId,1));
    toast.success("Item added to Cart succesfully!");
    dispatch(removeFromWishlist(productId));
    toast.success("Removed from wishlist!");
  navigate('/cart');

};

return (
  <>
    <div className='w-full'>
      {/* header */}
      <header className='bg-gradient-to-tl from-stone-50 via-red-50 to-red-200  p-6'>
        <h1 className='text-center font-semibold'>Wishlist</h1>
        <h3 className='font-light text-red-300 text-center'>Shop</h3>
      </header>

      {/* navigations */}
      <div className='flex flex-row gap-1 container m-4'>
        <Link to="/" className='hover:text-red-400'>  Home <span className='inline-block'><MdArrowForwardIos /></span></Link>
        <Link to="/cart" className='hover:text-red-400'> Cart <span className='inline-block'><MdArrowForwardIos /></span></Link>
        <div>Wishlist</div>
      </div>

      {/* card for wishlist  */}
      <div className=''>
        { wishListItems.length === 0 ? (

          // if no item in wishlist 
          <div className='container m-5  flex-col text-center text-xl space-y-3'>

            <img src={Image} alt="wishlistImage" />
            <h1 className='font-bold text-3xl text-red-400'>Your Wishlist is Empty</h1>
            <p className='text-blue-400'>seems like you don't have wishes here.</p>
            <p className='text-blue-400'> make a wish!</p>
            <div className='mx-auto'></div>
            <Link to='/products'><button>Start Shopping</button></Link>
          </div>
        )
          : (
            // if item in wishlist
            <div>
              { wishListItems.map((item) => (
                <div key={item.product}>
                  <div className='grid grid-cols-2  m-3 p-2 justify-between md:grid-cols-6 md:space-y-2 ' key={item.product}>
                    <Link to={`/products/${item.product}`}><img src={item.image} alt="img" /></Link>
                    <p className='m-1'>Products {item.title}</p>
                    <h3 className='m-2'> Price {item.price}</h3>
                    <p onClick={() => removeItemFromWishList(item.product)} className='m-4 relative left-5'><MdDelete /></p>
                    <button  data-testid="add-to-cart" onClick={() => addHandler(item.product)} className='bg-gray-400 p-2 m-2 hover:bg-gray-300 h-14 w-32'>Add to Cart</button>
                  </div>
                  <hr />
                </div>
              ))
              }
            </div>
          )}

      </div>
      {/* social links  */}
      <div className='flex flex-row gap-3 m-4 text-2xl'> share on:
        <div className='p-2'><a href="https://www.facebook.com" target="_blank"> <FaFacebook className='hover:text-red-400 hover:scale-105 text-2xl' /></a></div>
        <div className='p-2'><a href="https://in.pinterest.com" target="_blank"><FaSquareXTwitter className='hover:text-red-400 hover:scale-105 text-2xl' /></a></div>
        <div className='p-2'><a href="https://www.instagram.com" target="_blank"><FaInstagramSquare className='hover:text-red-400 hover:scale-105 text-2xl' /></a></div>
        <div className='p-2'><a href="https://in.pinterest.com" target="_blank"><FaPinterest className='hover:text-red-400 hover:scale-105 text-2xl' /></a></div>

      </div>
    </div>

  </>
)
  }

export default Wishlist