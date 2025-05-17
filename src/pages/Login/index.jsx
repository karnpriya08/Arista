import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import toast from 'react-hot-toast';

import image from "../../assets/images/logo2.png"
import backgroundImage from "../../assets/images/imageC2.webp";

const Login = () => {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.user.userInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    } else if (values.password.length > 12) {
      errors.password = "Password cannot exceed 12 characters";
    }
    return errors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length > 0) return;

    const loggeduser = JSON.parse(localStorage.getItem("user"));

    const isReduxMatch = userInfo &&
      formValues.email === userInfo.email &&
      formValues.password === userInfo.password;

    const isLocalMatch = loggeduser &&
      formValues.email === loggeduser.email &&
      formValues.password === loggeduser.password;

    if (isReduxMatch || isLocalMatch) {
      toast.success("Signed in successfully!");
      navigate("/");
    } else {
      toast.error("Wrong email or password");
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      toast.success("Happy Shopping!");
    }
  }, [formErrors]);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center px-4"
      style={{ backgroundImage: `url(${backgroundImage})`, paddingTop: '80px' }}
    >
      {/* ✅ LOGO HEADER */}
      <Link to='/'>
        <header className='flex items-center gap-4 mb-6 bg-white/20 text-red-500 p-2 rounded'>
          <img src={image} alt="logo" width={45} height={35} />
          <span className='text-2xl sm:text-3xl font-bold'>Arista Mall</span>
        </header>
      </Link>

      {/* ✅ LOGIN FORM */}
      <section className="w-full max-w-md bg-white/35 backdrop-blur-md border border-gray-200 rounded shadow-md p-6 sm:p-8 text-black">
        <form onSubmit={handleLogin} className="space-y-4">
          <h2 className='text-xl font-bold mb-4 text-center'>Sign in</h2>

          {/* ✅ EMAIL */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">Email or Mobile No.</label>
            <input
              type="text"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded px-3 py-2 bg-white text-black"
            />
            {formErrors.email && <p className='text-red-500 text-sm'>{formErrors.email}</p>}
          </div>

          {/* ✅ PASSWORD */}
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded px-3 py-2 bg-white text-black"
            />
            {formErrors.password && <p className='text-red-500 text-sm'>{formErrors.password}</p>}
          </div>

          {/* ✅ SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-2 rounded-3xl hover:bg-gray-800 transition-colors"
          >
            Continue
          </button>

          {/* ✅ TERMS */}
          <p className="text-xs text-center mt-2">
            By continuing, you agree to Arista's <span className="underline">Conditions of Use</span> and <span className="underline">Privacy Notice</span>.
          </p>
        </form>
      </section>

      {/* ✅ REGISTER CTA */}
      <div className='text-center mt-6'>
        <h2 className="text-white mb-2">New to Arista?</h2>
        <Link to="/register">
          <button className='bg-gray-400 text-black border rounded-3xl px-6 py-2 hover:bg-gray-500 transition-colors'>
            Create Your Account
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
