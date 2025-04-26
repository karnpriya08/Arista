import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { MdArrowForwardIos, MdDelete } from "react-icons/md";
import { addToCart, removeFromCart, updateQuantity } from '../../redux/action/cartAction'
import { useDispatch, useSelector } from 'react-redux';
import Image from '../../assets/images/cart.jpg';
import toast from 'react-hot-toast';

const index = () => {
  // getting id
  const { id } = useParams();
  const productId = id;
  const dispatch = useDispatch();

  // destructuring cart from state and using cart item 
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // adding to cart with quantity
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId]);

  // remove item from cart button handling
  const removeItemsFromCart = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Removed from Cart!");
  };

  return (
    <>
      <div>
        {/* header */}
        <header className='bg-gradient-to-tl from-stone-100 via-transparent to-red-300 p-6'>
          <h1 className='text-center font-semibold'>Shopping Cart</h1>
          <h3 className='font-light text-red-300 text-center'>Shop</h3>
        </header>

        {/* navigations */}
        <div className='flex flex-row gap-1'>
          <Link to="/" className='hover:text-red-400'>Home <span className='inline-block '><MdArrowForwardIos /></span></Link>
          <Link to="/wishlist" className='hover:text-red-400'> Wishlist <span className='inline-block '><MdArrowForwardIos /></span></Link>
          <div>Cart</div>
        </div>

        {/* cartlist */}
        <div className='box'>
          <div className='nodata'>
            {/* if no item in cart  */}
            {cartItems.length === 0 ? (
              <div className='container text-center text-2xl m-5'>
                <div>
                  <img src={Image} alt="cartImage" className='relative m-auto' />
                  <h1 className='font-bold'>Hey, it feels so light !</h1>
                  <p>There is nothing in your bag. let's add some items.</p>
                  <div className='flex justify-around'>
                    <Link to="/wishlist"><div className='border rounded-xl text-red-500 p-3 m-2'>Add Items From Wishlist</div></Link>
                    <Link to='/'><div className='border rounded-xl text-red-500 p-3 m-2'>Go To Home</div></Link>
                  </div>
                </div>
              </div>
            )
              : (
                // when cart have items 
                <div className=' grid grid-cols-1 m-2 md:grid-cols-2'>
                  {/* cart card */}
                  <div>{cartItems.map((item) => (
                    <div className=''> product
                      {/* heading */}
                      <div >
                        <div className='grid grid-cols-2  m-3 p-2 justify-between md:grid-cols-3 lg:grid-cols-8 md:space-y-2 '>
                          <Link to={`/products/${item.product}`}><img src={item.image} alt="img" className='p-0.5' /></Link>
                          <p className='m-1'>Products {item.title}</p>
                          <h3 className='m-2'> Price {item.price}</h3>
                          {/* quantity */}
                          {/* updating quantity with redux  */}
                          <div className='flex gap-4 h-7 m-2'>
                            <h3>Qty:</h3>
                            <div className='flex flex-row justify-between w-24 border border-gray-200'>
                              <div
                                onClick={() => {
                                  if (item.qty === 1) {
                                    toast.error("Minimum quantity is 1");
                                    return; // Prevent decrementing if qty is already 1
                                  }
                                  dispatch(updateQuantity(item.product, item.qty - 1)); // Update quantity
                                }}
                                className={`bg-red-500 p-1 px-2.5 border-red-300 rounded-md hover:scale-105 ${item.qty === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                  }`}>- </div>
                              <span className='p-1 m-0.5'> {item.qty} </span>
                              <div onClick={() => dispatch(updateQuantity(item.product, item.qty + 1))}
                                className='bg-red-500 p-1 px-2 border-red-300 rounded-md hover:scale-105'>+</div>
                            </div>
                          </div>
                          <hr className='text-white' />
                          {/* delet button */}
                          <p onClick={() => removeItemsFromCart(item.product)} className='py-1 md:mx-5  mx-1 '><MdDelete className='mx-18 text-2xl' /></p>
                          <h3 className='mx-10 m-2'> ${item.qty * item.price}</h3>
                        </div>
                        <hr />
                      </div>
                    </div>
                  ))
                  }
                  </div>
                  {/* total card */}
                  <div className='m-2 flex-col'>
                    {/* heading */}
                    <div className='bg-gradient-to-tr from-stone-100 via-red-50 to bg-red-200 items-center text-center text-black'>
                      <h1 >Card Total</h1>
                      <hr />
                      {/* calculation of product and price */}
                      <div className='flex flex-row justify-between p-3'>
                        <h4>({cartItems.reduce((acc, item) => acc + item.qty, 0)}) Products</h4>
                        <h4>total: ${cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)}</h4>
                      </div>
                      {/* subcharge section  */}
                      <div className='text-start p-8 m-1'>
                        <h5 className='font-semibold text-center m-2'>SubCharges </h5>
                        <div className='flex flex-row justify-between '>
                          <input type="radio" />
                          <label> Free Shipping</label>
                          <h3>$ 0.00</h3>
                        </div>
                        <div className='flex flex-row justify-between'>
                          <input type="radio" />
                          <label>Service Charge</label>
                          <h3>$ 0.00</h3>
                        </div>
                        <div className='flex flex-row justify-between'>
                          <input type="radio" />
                          <label> Convenience fee</label>
                          <h3>$ 0.00</h3>
                        </div>
                        <div className='flex flex-row justify-between p-3 m-4 text-red-300'>
                          <h4>Subtotal : {cartItems.reduce((acc, item) => acc + item.qty, 0)}</h4>
                          <h4>Total : ${cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)}</h4>
                        </div>
                        <div className='text-center'>
                          <button className=' text-red-300 border border-red-300 p-4 ' >PROCEED TO CHECKOUT</button>
                        </div>
                      </div>
                    </div>
                    <div className='px-15 mx-16  lg:mx-auto'>
                      <Link to="/" ><button className=''>Continue Shopping</button></Link>
                    </div>
                  </div>
                </div>)}
          </div>
        </div>
      </div>
    </>
  )
}
export default index