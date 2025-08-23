import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import menuIcon from "../assets/menu.svg";

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setMenu(false);
    navigate("/");
  };

  return (
    <div className="w-full h-14 absolute flex justify-between md:justify-around items-center">
      <div className="ml-3 md:ml-0">
        <h1 className="logo">Logloop</h1>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex text-lg gap-7">
        <Link to="/" className="hover:underline List">
          Home
        </Link>

        {isLoggedIn && (
          <>
            <Link to="/write" className="hover:underline  List">
              Write
            </Link>
            <button
              onClick={handleLogout}
              className="hover:underline bg-transparent border-none cursor-pointer text-black  List"
            >
              Logout
            </button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/register" className="hover:underline  List">
              Register
            </Link>
            <Link to="/login" className="hover:underline  List">
              Login
            </Link>
          </>
        )}
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden mr-3 md:ml-0">
        <button onClick={() => setMenu(!menu)}>
          <img src={menuIcon} alt="menu" />
        </button>
      </div>

      {/* Mobile menu */}
      {menu && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-white shadow-md flex flex-col py-3 gap-2 z-40 text-center">
          <Link
            to="/"
            onClick={() => setMenu(false)}
            className=" List"
          >
            Home
          </Link>

          {isLoggedIn && (
            <>
              <Link
                to="/write"
                onClick={() => setMenu(false)}
            className=" List"

              >
                Write
              </Link>
              <button
                onClick={handleLogout}
                className="bg-transparent border-none cursor-pointer text-black Link"
                
              >
                Logout
              </button>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link
                to="/register"
                onClick={() => setMenu(false)}
            className=" List"

              >
                Register
              </Link>
              <Link
                to="/login"
                onClick={() => setMenu(false)}
            className=" List"

              >
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
