import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/action/productAction';
import ProductCard from '../ProductCard'

const index = () => {
  const dispatch = useDispatch();
  // getting all products 
  const allproducts = useSelector((state) => state.allProducts || {});
  const { products = [], selectedCategory } = allproducts;
  
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

// filter products based on category 
  const filteredProducts = selectedCategory === 'all' ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <>
      {/* product displaying  */}
      <div className='grid grid-cols-1 justify-around md:grid-cols-2 lg:grid-cols-4 gap-14 p-8 '>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}

export default index
