import React, { useEffect, useState } from 'react';
import { BsDot, BsHeart } from 'react-icons/bs';
import { FcInTransit, FcRating } from 'react-icons/fc';
import { MdLocalOffer, MdOutlineShoppingBag } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetails } from '../../redux/action/productAction';
import { addToCart } from '../../redux/action/cartAction';
import { addToWishlist } from '../../redux/action/wishlistAction';
import Loading from '../../component/Loading';
import Error from '../Error';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('user');
  const { id } = useParams();

  const productdetail = useSelector((state) => state.productDetails || {});
  const { error, loading, product } = productdetail;

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const addcartHandler = () => {
    if (!isLoggedIn) {
      toast.error("Please login to add items to the cart!");
      navigate("/login");
    } else {
      dispatch(addToCart(String(product.id), qty));
      toast.success("Item added to Cart successfully!");
      navigate('/cart');
    }
  };

  const addWishHandler = () => {
    if (!isLoggedIn) {
      toast.error("Please login to add items to wishlist!");
      navigate("/login");
    } else {
      dispatch(addToWishlist(id));
      toast.success("Item added to Wishlist!");
      navigate('/wishlist');
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <div
          style={{ paddingTop: '80px' }}
          data-testid="product-detail-container"
          className="p-5 sm:p-8 md:p-10 bg-gradient-to-tl from-stone-100 via-transparent to-red-300"
        >
          <div className="max-w-6xl mx-auto">
            {/* section-1 Product Info */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="flex justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-2/3 sm:w-1/2 md:w-2/3 h-auto shadow-lg object-contain"
                />
              </div>

              {/* Product Details */}
              <div className="space-y-6 text-center md:text-left text-black">
                <h1 data-testid="product-title" className="font-bold text-3xl md:text-5xl">{product.title}</h1>
                <h2 className="text-lg font-medium text-gray-600">{product.category}</h2>

                {/* Rating Box */}
                <div className="border border-gray-300 w-fit px-4 py-1 mx-auto md:mx-0 flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <FcRating className="text-xl" />
                    {product?.rating?.rate ?? 'N/A'}
                  </div>
                  <span>|</span>
                  <div>{product?.rating?.count ?? 'N/A'} reviews</div>
                </div>

                <h1 data-testid="product-price" className="text-2xl font-semibold">Price: $ {product.price}</h1>

                {/* Size Selector */}
                <div>
                  <label className="mr-3">Size:</label>
                  <select className="p-2 border border-gray-400 rounded-lg text-sm">
                    <option>Select a Size</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </select>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <span>Qty:</span>
                  <div className="flex items-center border rounded w-24 justify-between">
                    <button data-testid="qty-decrease" onClick={() => setQty(qty > 1 ? qty - 1 : 1)} className="px-2 hover:bg-gray-100">-</button>
                    <span data-testid="qty-display">{qty}</span>
                    <button data-testid="qty-increase" onClick={() => setQty(qty + 1)} className="px-2 hover:bg-gray-100">+</button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:gap-5 mt-4 justify-center md:justify-start">
                  <button data-testid="add-wishlist" onClick={addWishHandler} className="flex items-center justify-center gap-2 border px-4 py-2 rounded hover:bg-gray-100">
                    <BsHeart /> Wishlist
                  </button>
                  <button data-testid="add-cart" onClick={addcartHandler} className="flex items-center justify-center gap-2 bg-gray-400 px-4 py-2 rounded hover:bg-gray-300">
                    <MdOutlineShoppingBag /> Add to Cart
                  </button>
                </div>
              </div>
            </section>

            {/* Description */}
            <section className="mt-12">
              <h1 className="text-2xl font-bold mb-2">Description</h1>
              <p className="text-lg text-gray-800">{product.description}</p>
            </section>

            {/* Delivery Options */}
            <section className="mt-12 space-y-4">
              <div className="flex items-center gap-2 text-2xl font-bold">
                Delivery Options <FcInTransit className="text-3xl" />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input type="text" placeholder="Enter Pincode" className="p-2 border border-gray-300 rounded-md" />
                <button className="bg-red-300 hover:bg-red-400 text-white px-4 py-2 rounded">Check</button>
              </div>
              <ul className="text-sm text-gray-700 list-disc list-inside">
                <li>100% Original Products</li>
                <li>Pay on delivery might be available</li>
                <li>Easy 14 days returns and exchanges</li>
              </ul>
            </section>

            {/* Offers Section */}
            <section className="mt-12 space-y-6">
              <div className="flex items-center gap-2 text-2xl font-bold">
                Best Offers <MdLocalOffer className="text-3xl" />
              </div>

              {/* Offer 1 */}
              <div className="space-y-2">
                <h3 className="font-semibold">10% Discount on BOB Credit Cards and Credit Card EMI.</h3>
                <p className="flex items-center text-sm text-gray-700">
                  <BsDot /> Min Spend ₹3500, Max Discount ₹1000.
                </p>
                <p className="text-sm text-red-400 font-medium">Terms & Conditions</p>
              </div>

              {/* Offer 2 */}
              <div className="space-y-2">
                <h3 className="font-semibold">10% Discount on Federal Bank Credit Cards.</h3>
                <p className="flex items-center text-sm text-gray-700">
                  <BsDot /> Min Spend ₹2000, Max Discount ₹750.
                </p>
                <p className="text-sm text-red-400 font-medium">Terms & Conditions</p>
              </div>

              {/* Offer 3 */}
              <div className="space-y-2">
                <h3 className="font-semibold">EMI option available</h3>
                <p className="flex items-center text-sm text-gray-700">
                  <BsDot /> EMI starting from ₹9/month
                </p>
                <p className="text-sm text-red-400 font-medium">View Plan</p>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;