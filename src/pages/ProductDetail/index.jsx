import React, { useEffect, useState } from 'react'
import { BsDot, BsHeart } from 'react-icons/bs'
import { FcInTransit, FcRating } from 'react-icons/fc'
import { MdLocalOffer, MdOutlineShoppingBag } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetails } from '../../redux/action/productAction'
import { addToCart } from '../../redux/action/cartAction';
import { addToWishlist } from '../../redux/action/wishlistAction';
import Loading from '../../component/Loading';
import Error from '../Error';
import toast from 'react-hot-toast';

const index = () => {
  const [qty,setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // check for user login 
  const isLoggedIn = localStorage.getItem('user');

  // getting id 
  const { id } = useParams();
  const productId = id;

  //  getting and destructuring productdetails of product 
  const productdetail = useSelector((state) => state.productDetails || {});
  const { error, loading, product } = productdetail;

  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [dispatch, productId]);

  // handling buttons 
  // route the user to the respective cart page passing the product ID in the URL after logedin 
  const addcartHandler = () => {
    if(!isLoggedIn){
      toast.error("Please login to add items to the cart!");
      navigate("/login");
    }else {
      dispatch(addToCart(String(product.id),qty));
      toast.success("Item added to Cart succesfully!");
      navigate('/cart');
    }  
  }
// route the user to the respective wishlist page passing the product ID in the URL after logedin 
  const addWishHandler = () => {
    if(!isLoggedIn) {
      toast.error("Please login to add items to the cart!");
      navigate("/login");
    }
    else {
      dispatch(addToWishlist(productId));
      toast.success("Item added to Wishlist!");
      navigate('/wishlist');
    }
  }

  return (
    <>
    {/* handling loading and error */}
      {loading ? (<Loading />) : error ? (<Error />) : (
        <div data-testid="product-detail-container"  className='container-content p-10 m-10 bg-gradient-to-tl from-stone-100 via-transparent to-red-300'>
          <div className='flex-col'>
            {/* section-1 */}
            <section className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              {/* image */}
              <div className='mx-4  '><img src={product.image} alt="image" className='relative top-2 md:top-20 w-1/2 m-auto shadow-xl  h-2/3' />
              </div>
              <div className='flex-row justify-evenly text-center text-black text-xl space-y-5'>
                <h1 data-testid="product-title" className='font-bold text-5xl'>{product.title}</h1>
                <h2>{product.category}</h2>
                {/* rating */}
                <div className='mx-auto border border-gray-300  w-1/3 flex justify-around m-2 p-1'>
                  <div className='flex'> <FcRating className='text-2xl' />
                    {product?.rating?.rate ?? 'N/A'}
                  </div>|
                  <div>{product?.rating?.count ?? 'N/A'}</div>
                </div>
                <h1 data-testid="product-price" className='text-2xl font-semibold'>price $ {product.price}</h1>
                {/* size */}
                <p>Size: <span className='m-3'>
                  <select className='p-1.5 px-4 bg-white border border-gray-400 rounded-2xl text-xs'>
                    <option value="someOption p-1">Select a Size</option>
                    <option value="otherOption">S</option>
                    <option value="otherOption">M</option>
                    <option value="otherOption">L</option>
                    <option value="otherOption">XL</option>
                  </select>
                </span> </p>
                {/* quantity */}
                <div className='flex  px-2 md:px-4 lg:px-30'>
                <h3 className='p-2.5'>Qty:</h3>
                <div className='flex flex-row justify-between w-24 '>
                  <button data-testid="qty-decrease" onClick={() => setQty ( qty > 1 ? qty -1 : qty )} className='p-1.5 border  hover:scale-75'>-</button>
                  <span data-testid="qty-display" className='px-10 p-1 border-gray-300 text-black'> {qty}</span>
                  <button data-testid="qty-increase" onClick={() => setQty(qty + 1)} className='p-1.5 border hover:scale-75'>+</button>
                </div>
              </div>
                {/* buttons */}
                <div className='flex  flex-col md:flex-row justify-around m-7 md:m-2 md:gap-1 lg:mx-auto'>
                  <button data-testid="add-cart" onClick={() => { addWishHandler(product) }} className='hover:95 flex mb-3'><BsHeart className='m-1' />  Wishlist</button>
                  <button data-testid="add-wishlist" onClick={() => { addcartHandler(product) }} className='bg-gray-400  hover:95 flex mb-3'><MdOutlineShoppingBag className='m-1 text-xl' />Add to Cart</button>
                </div>
              </div>
            </section>
            {/* description section  */}
            <section className='w-full h-full border-transparent shadow-xl shadow-transparent '>
              <section className=' flex-col m-3 p-2'>
                <h1 className='font-black text-3xl'>Description</h1>
                <p className='text-2xl m-2'>
                  {product.description}
                </p>
              </section >
              {/* delivery options  */}
              <section className=' flex-col m-3 p-2 text-2xl text-black'>
                {/* 1 heading */}
                <div className='flex'>
                  <h1 className='font-semibold text-3xl'>Delivery Options </h1>
                  <FcInTransit className='text-5xl p-1' />
                </div>

                {/* 2  details */}
                <div className='flex-col m-1 mt-3'>
                  <input type="text" placeholder='Enter pincode' className='p-2 border-gray-200 border-2' />
                  <button className=''>check</button>
                </div>
                <p className='text-sm'>Please enter PIN code to check delivery time & Pay on Delivery Availability</p>

                <p className='mt-5'>100% Original Products</p>
                <p>Pay on delivery might be available</p>
                <p>Easy 14 days returns and exchanges</p>
              </section>
              {/* offers */}
              <section className=' flex-col m-3 p-2 text-xl'>
                <div className='flex'>
                  <h1 className='font-semibold text-3xl'>Best Offers </h1>
                  <MdLocalOffer className='text-4xl p-1' />
                </div>
                {/* offer 1 */}
                <div className='flex flex-col gap-2'>
                  <h2 className='text-xl mt-3 font-semibold'>10% Discount on BOB Credit Cards and Credit Card EMI.</h2>
                  <p className='flex'><BsDot className='text-xl' />Min Spend ₹3500, Max Discount ₹1000.</p>
                  <h4 className='font-semibold text-red-400'>Terms & Condition</h4>
                </div>
                {/* offer 2 */}
                <div className='flex flex-col gap-2'>
                  <h2 className='text-xl mt-3 font-semibold'>10% Discount on Federal Bank Credit Cards.</h2>
                  <p className='flex'><BsDot className='text-xl' />Min Spend ₹2000, Max Discount ₹750.</p>
                  <h4 className='font-semibold text-red-400'>Terms & Condition</h4>
                </div>
                {/* offer3 */}
                <div className='flex flex-col gap-2'>
                  <h2 className='text-xl mt-3 font-semibold'>EMI option available</h2>
                  <p className='flex'><BsDot className='text-xl' />EMI starting from 9/month</p>
                  <h4 className='font-semibold text-red-400'>View Plan</h4>
                </div>
              </section>
            </section>
          </div>
        </div>
      )}
    </>
  )
}
export default index