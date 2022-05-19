import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = (props) => {
  // console.log(props);
  return (
    <nav className="teal darken-4">
      <div className="nav-wrapper">
        <ul id="nav-mobile" className="left">
          <li>
            <NavLink to="/">Home</NavLink>
            {/* <Link to="{{ pathname: "/>", nekiProps:true }}">Home</Link>  Ukoliko zelimo i props da posaljemo*/}
          </li>
          <li>
            <NavLink to="/blog">Blog</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
