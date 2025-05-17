import { React, useEffect, useState, useMemo } from 'react';
import ProductCard from "../../component/ProductCard";
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/action/productAction';
import Loading from '../../component/Loading';
import Error from '../Error';

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Getting all products from Redux store
  const dispatch = useDispatch();
  const allproducts = useSelector((state) => state.allProducts || {});
  const { error, loading, products = [] } = allproducts;

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Pagination logic with useMemo for optimization
  const totalPages = useMemo(() => Math.ceil(products.length / itemsPerPage), [products]);
  
  const currentItems = useMemo(() => {
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    return products.slice(firstItemIndex, lastItemIndex);
  }, [currentPage, products]);

  // Pagination button handlers
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <>
      <div style={{ paddingTop: '80px' }} className='content-responsive-container'>
        {loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : (
          <div className='w-full p-4'>
            <div className='grid grid-cols-1 justify-around md:grid-cols-2 lg:grid-cols-4 gap-14 p-8'>
              {/* Mapping the products for the current page */}
              {currentItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className='flex justify-center items-center mt-4 space-x-4'>
              <button
                className={`px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <span className='text-lg font-medium'>
                Page {currentPage} of {totalPages}
              </span>

              <button
                className={`px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Index;
