import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addUser } from '../../redux/action/userAction';
import { useDispatch } from 'react-redux';
import Image from "../../assets/images/logo2.png";
import toast from 'react-hot-toast';
import backgroundImage from "../../assets/images/imageC2.webp";

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Input Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  // Validation Function
  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;

    if (!values.name.trim()) {
      errors.name = "Name is required";
    }

    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.password.trim()) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(values.password)) {
      errors.password = "Password must contain 1 number, 1 lowercase, 1 uppercase (8-16 chars)";
    }

    return errors;
  };

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formValue);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // If there are validation errors, show the error messages
      Object.values(validationErrors).forEach((msg) => toast.error(msg));
      return;
    }

    // If no errors, save user and navigate
    localStorage.setItem("user", JSON.stringify(formValue));
    dispatch(addUser(formValue));
    toast.success("Registered successfully!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}>
      
      {/* Logo */}
      <Link to='/'>
        <header className="flex items-center mb-6 bg-white/20 text-red-500">
          <img src={Image} alt="logo" width={45} height={45} />
          <span className="text-3xl font-semibold ml-2">Arista Mall</span>
        </header>
      </Link>

      {/* Form */}
      <div className="border border-gray-200 w-11/12 md:w-96 p-6 shadow rounded bg-white/45">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-bold mb-4">Sign Up</h2>

          {/* Name */}
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input id='name' type="text" name="name" placeholder="Full name"
            className={`w-full border border-gray-400 rounded-lg p-2 mb-3 ${errors.name ? 'border-red-500' : ''}`}
            value={formValue.name}
            onChange={handleChange} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          {/* Email */}
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input id='email' type="email" name="email" placeholder="Email"
            className={`w-full border border-gray-400 rounded-lg p-2 mb-3 ${errors.email ? 'border-red-500' : ''}`}
            value={formValue.email}
            onChange={handleChange} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          {/* Password */}
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input id='password' type="password" name="password" placeholder="Password"
            className={`w-full border border-gray-400 rounded-lg p-2 mb-3 ${errors.password ? 'border-red-500' : ''}`}
            value={formValue.password}
            onChange={handleChange} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          {/* Submit Button */}
          <button type="submit" className="bg-gray-400 text-white w-full rounded-3xl py-2 mt-2 hover:scale-95 transition">Continue</button>
        </form>

        <p className="text-xs font-light text-center mt-3">
          By continuing, you agree to Arista's Conditions of Use and Privacy Notice.
        </p>
      </div>

      {/* Login Link */}
      <div className="text-center mt-4">
        <p className="text-sm">Already have an account?</p>
        <Link to="/login">
          <button className="bg-gray-400 text-white rounded-3xl px-8 py-2 mt-2 hover:scale-105 transition">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
