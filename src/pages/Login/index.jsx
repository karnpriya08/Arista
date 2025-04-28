import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import image from "../../assets/images/logo2.png"
import { useNavigate } from 'react-router-dom';
import backgroundImage from "../../assets/images/imageC2.webp";
import { useSelector } from "react-redux";
import toast from 'react-hot-toast';


const Login = () => {

  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  // get user from store 
  const userInfo = useSelector((state) => state.user.userInfo);
  // handle change and getting value 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value })
  }
  // validations
  const validate = (values) => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "this not a valid email format";
    }
    if (!values.password) {
      errors.password = "password is required";
    } else if (values.password.length < 6) {
      errors.password = "password must be more than 6 character";
    }
    else if (values.password.length > 12) {
      errors.password = "password can not exceed  10 character";
    }
    return errors;
  }
  // handle login button 
  const handleLogin = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true)
    // checking credentials
    const loggeduser = JSON.parse(localStorage.getItem("user"));
    const isReduxMatch = userInfo && formValues.email === userInfo.email &&
      formValues.password === userInfo.password;

    const isLocalMatch = loggeduser && formValues.email === loggeduser.email &&
      formValues.password === loggeduser.password;
    // matching both redux and local storage 
    if (isReduxMatch || isLocalMatch) {
      toast.success("Signed in successfully!")
      navigate("/")
    } else {
      toast.error("wrong email or password")
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      toast.success("happy Shopping !")
    }
  }, [formErrors])


  return (
    <>
      <div  className="min-h-screen bg-cover bg-center flex flex-col justify-center"
        style={{ backgroundImage: `url(${backgroundImage})`, paddingTop: '80px' }}>
        {/* if no error and form submitted  */}
        {Object.keys(formErrors).length === 0 && isSubmit
          ? (<div>signed in sucesfully</div>) :
          null}
        <Link to='/'>
          {/* logo  */}
          <header className='flex flex-row gap-4 justify-center m-4 bg-white/20 text-red-500 '>
            <img src={image} alt="lo" width={45} height={35} />
            <span className='p-2 text-3xl'>Arista Mall</span>
          </header>
        </Link>
        <secction className='border border-gray-200 w-auto md:w-96 h-96 m-auto p-20 bg-white/35 backdrop-blur-md  rounded shadow  text-black '>
          {/* login form  */}
          <form onSubmit={handleLogin}>
            <h2 className='text-lg font-bold'> Sign in </h2>
            {/* email */}
            <label htmlFor="email" > Email or Mobile No.</label>
            <br />
            <input type="text" name='email' placeholder=''
              onChange={handleChange}
              value={formValues.email}
              className='border border-gray-400 rounded-lg
               text-white p-1' />
            <br />
            <p className='text-red-500'>{formErrors.email}</p>
            {/* password */}
            <label htmlFor="password" > Password</label>
            <br />
            <input type="password" placeholder=''
              name='password' value={formValues.password}
              onChange={handleChange}
              className='border border-gray-400 rounded-lg p-1' />
            <br />
            <p className='text-red-500'>{formErrors.password}</p>
            {/* button for sub,ittion handle submit */}
            <button className='bg-gray-400 border rounded-3xl  px-8 m-4 ' type="submit">Continue</button>
          </form>

          <p className='text-xs font-light text-center text-wrap'> By continuing, you agree
            to Arista's Conditions of Use and Privacy Notice.</p>
        </secction>
        <br />
        <hr />
        <br />
        {/* for register  */}
        <div className='text-center'>
          <h2>New to Arista?</h2>
          <Link to="/register"><button className='bg-gray-400 border rounded-3xl  px-8 m-4 ' type='submit'>Create Your Account</button></Link>
        </div>
      </div>
    </>
  )
}
export default Login