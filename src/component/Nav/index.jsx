import React from 'react';
import { useDispatch } from 'react-redux';
import { setCategory } from '../../redux/action/productAction';
import { useNavigate } from 'react-router-dom';


const categories = [
  { label: 'All', value: 'all' },
  { label: "Men", value: "men's clothing" },
  { label: "Women", value: "women's clothing" },
  { label: "Jewelery", value: "jewelery" },
  { label: "Electronics", value: "electronics" }
];

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handling selecting and clicking of category
  const handleCategorySelect = (category) => {
    dispatch(setCategory(category));
    navigate("/category");
  };

  return (
    <div className='content-container bg-stone-100 text-black shadow-lg rounded-sm'>
      <nav className='p-4'>

        {/* Desktop View */}
        <ul className='hidden md:grid md:grid-cols-5 lg:w-1/3 w-full font-semibold gap-2.5'>
          {/* maping for desktop category button  */}
          {categories.map((cat) => (
            <li key={cat.value} className='hover:text-red-500 cursor-pointer'
              onClick={() => handleCategorySelect(cat.value)} >
              {cat.label}  </li>
          ))}
        </ul>
        {/*  Mobile View */}
        <div className='border-gray-300 p-1 m-1 md:hidden px-auto'>
          <p>Browse Categories{" "}
            <select className='p-3.5 px-8 bg-white border border-gray-400 rounded-2xl text-xs'
              onChange={(e) => handleCategorySelect(e.target.value)} >
              <option>Select Category</option>
              {/* maping for mobile category options  */}
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