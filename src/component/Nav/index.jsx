import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCategory } from '../../redux/action/productAction';
import { useNavigate, useLocation } from 'react-router-dom';

const categories = [
  { label: 'All', value: 'all' },
  { label: "Men", value: "men's clothing" },
  { label: "Women", value: "women's clothing" },
  { label: "Jewelery", value: "jewelery" },
  { label: "Electronics", value: "electronics" }
];

const Nav = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Reset dropdown on page change
  useEffect(() => {
    setSelectedCategory('');
  }, [location.pathname]);

  const handleCategorySelect = (category) => {
    // prevent blank selection from navigating
    if (!category) return;

    setSelectedCategory(category);
    dispatch(setCategory(category));
    navigate("/category");
  };

  return (
    <div className='fixed top-[72px] left-0 w-full z-40 lg:mt-5 bg-stone-100 text-black shadow-lg rounded-sm'>
      <nav className='p-4'>

        {/* Desktop View */}
        <ul className='hidden md:grid md:grid-cols-5 lg:w-1/3 w-full font-semibold gap-2.5'>
          {categories.map((cat) => (
            <li key={cat.value}
              className='hover:text-red-500 cursor-pointer'
              onClick={() => handleCategorySelect(cat.value)} >
              {cat.label}
            </li>
          ))}
        </ul>

        {/* Mobile View */}
        <div className='border-gray-300 p-1 m-1 md:hidden px-auto'>
          <p>Browse Categories{" "}
            <select
              className='p-3.5 px-8 bg-white border border-gray-400 rounded-2xl text-xs'
              value={selectedCategory}
              onChange={(e) => handleCategorySelect(e.target.value)}>
            
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </p>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
