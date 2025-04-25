import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const index = ({children}) => {
    const location = useLocation();
    const [showNavbar, setShowNavbar]=useState(false);

    useEffect(()=> {
    // hides the child components navbar and footer
    if (location.pathname === '/login' || location.pathname === "/register") {
        setShowNavbar(false)
    }else {
        setShowNavbar(true)
    }
    },[location])
  return (
    <div>
      {showNavbar && children }
    </div>
  )
}

export default index