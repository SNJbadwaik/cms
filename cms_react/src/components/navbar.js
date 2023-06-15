import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({isLoggedIn}) => {
  // 
  const navStyle = { display: "flex", alignItem: "center", borderBottom: "2px #7a6a6a solid", backgroundColor: "rgb(198 212 213)",marginBottom:"10px"};
  const textStyle = { color: "black", fontWeight: "600" };
  return (
 
    <nav class="navbar navbar-expand-lg"  style={navStyle}>
  <div class="container-fluid">
     <Link className='navbar-brand' to='/'>
          <b style={{cursor:'pointer'}}>FLASH COURIERS</b> 
        </Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
           <Link className='nav-link active' aria-current='page' to='/trackCourier' style={textStyle}>
               Track Courier
             </Link>
        </li>
        <li class="nav-item">
           <Link className='nav-link active' aria-current='page' to='/aboutUs' style={textStyle}>
              About Us
            </Link>
            </li>
            {!isLoggedIn ?(
        <li class="nav-item">
           <Link
               className='nav-link active'
               aria-current='page'
               to='/user/signin'
               style={textStyle}
            >
               Signin
             </Link>
        </li>):(
        <li class="nav-item">
           <Link className='nav-link active' aria-current='page' to='/signout' style={textStyle}>
                 Sign Out
               </Link>
        </li>)}
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar



