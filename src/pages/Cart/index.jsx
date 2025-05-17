import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdArrowForwardIos, MdDelete } from "react-icons/md";
import { addToCart, removeFromCart, updateQuantity } from '../../redux/action/cartAction';
import { useDispatch, useSelector } from 'react-redux';
import Image from '../../assets/images/cart.jpg';
import toast from 'react-hot-toast';

const index = () => {
  const { id } = useParams();
  const productId = id;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Adding to cart with quantity
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId]);

  // Remove item from cart button handling
  const removeItemsFromCart = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Removed from Cart!");
  };

  return (
    <>
      <div style={{ paddingTop: '80px' }}>
        {/* header */}
        <header className='bg-gradient-to-tl from-stone-100 via-transparent to-red-300 p-6'>
          <h1 className='text-center font-semibold'>Shopping Cart</h1>
          <h3 className='font-light text-red-300 text-center'>Shop</h3>
        </header>

        {/* Navigations */}
        <div className='flex flex-row gap-1'>
          <Link to="/" className='hover:text-red-400'>Home <span className='inline-block '><MdArrowForwardIos /></span></Link>
          <Link to="/wishlist" className='hover:text-red-400'> Wishlist <span className='inline-block '><MdArrowForwardIos /></span></Link>
          <div>Cart</div>
        </div>

        {/* Cart List */}
        <div className='box'>
          <div className='nodata'>
            {/* If no item in cart */}
            {cartItems.length === 0 ? (
              <div className='container text-center text-2xl m-5'>
                <div>
                  <img src={Image} alt="cartImage" className='relative m-auto' />
                  <h1 className='font-bold'>Hey, it feels so light !</h1>
                  <p>There is nothing in your bag. Let's add some items.</p>
                  <div className='flex justify-around'>
                    <Link to="/wishlist"><div className='border rounded-xl text-red-500 p-3 m-2'>Add Items From Wishlist</div></Link>
                    <Link to='/'><div className='border rounded-xl text-red-500 p-3 m-2'>Go To Home</div></Link>
                  </div>
                </div>
              </div>
            ) : (
              // When cart has items
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-2'>
                {/* Cart card */}
                {cartItems.map((item) => (
                  <div className="cart-item flex flex-col items-center p-2">
                    {/* Heading */}
                    <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-8 w-full">
                      <Link to={`/products/${item.product}`}>
                        <img src={item.image} alt="img" className="w-full h-auto max-w-xs" />
                      </Link>
                      <div className="flex flex-col text-center md:text-left md:ml-4">
                        <p className='m-1'>Product: {item.title}</p>
                        <h3 className='m-2'>Price: ${item.price}</h3>
                        {/* Quantity */}
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
                              className={`bg-red-500 p-1 px-2.5 border-red-300 rounded-md hover:scale-105 ${item.qty === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>- </div>
                            <span className='p-1 m-0.5'> {item.qty} </span>
                            <div onClick={() => dispatch(updateQuantity(item.product, item.qty + 1))}
                              className='bg-red-500 p-1 px-2 border-red-300 rounded-md hover:scale-105'>+</div>
                          </div>
                        </div>
                        <hr className='text-white' />
                        {/* Delete button */}
                        <p onClick={() => removeItemsFromCart(item.product)} className='py-1 md:mx-5  mx-1'>
                          <MdDelete className='mx-18 text-2xl' />
                        </p>
                        <h3 className='mx-10 m-2'> ${item.qty * item.price}</h3>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
                {/* Total card */}
                <div className='m-2 flex-col'>
                  <div className='bg-gradient-to-tr from-stone-100 via-red-50 to bg-red-200 items-center text-center text-black'>
                    <h1>Card Total</h1>
                    <hr />
                    {/* Calculation of product and price */}
                    <div className='flex flex-row justify-between p-3'>
                      <h4>({cartItems.reduce((acc, item) => acc + item.qty, 0)}) Products</h4>
                      <h4>Total: ${cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)}</h4>
                    </div>
                    {/* Subcharge section */}
                    <div className='text-start p-8 m-1'>
                      <h5 className='font-semibold text-center m-2'>SubCharges</h5>
                      <div className='flex flex-row justify-between'>
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
                        <h4>Subtotal: {cartItems.reduce((acc, item) => acc + item.qty, 0)}</h4>
                        <h4>Total: ${cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)}</h4>
                      </div>
                      <div className='text-center'>
                        <button className='text-red-300 border border-red-300 p-4'>PROCEED TO CHECKOUT</button>
                      </div>
                    </div>
                  </div>
                  <div className='px-15 mx-16 lg:mx-auto'>
                    <Link to="/">
                      <button className='p-3 bg-red-300 text-white rounded'>Continue Shopping</button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
