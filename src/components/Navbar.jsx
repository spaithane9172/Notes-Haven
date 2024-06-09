import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../img/logo.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <nav className="w-full px-[5rem] flex justify-between items-center fixed bg-black rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
      <div className="flex items-center">
        <div className="mr-[5rem] my-[0.5rem]">
          <img src={img} alt="" className="w-[5rem] h-[3rem]" />
        </div>
        <div>
          <ul className="flex items-center">
            <Link to="/">
              <li
                className={`px-[2rem] py-[1rem] duration-500 border-b-[3px] ${
                  location.pathname === "/"
                    ? "font-bold border-blue-500"
                    : "font-semibold border-transparent"
                }`}
              >
                Home
              </li>
            </Link>
            <Link to="/about">
              <li
                className={`px-[2rem] py-[1rem] duration-500 border-b-[3px] ${
                  location.pathname === "/about"
                    ? "font-bold border-blue-500"
                    : "font-semibold border-transparent"
                }`}
              >
                About
              </li>
            </Link>
          </ul>
        </div>
      </div>

      <div>
        {!localStorage.getItem("token") && (
          <div>
            <Link
              to="/login"
              className="mr-[0.5rem] bg-blue-600 font-semibold text-white px-[1rem] py-[0.5rem] rounded-md"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="mr-[1rem] bg-blue-600 font-semibold text-white px-[1rem] py-[0.5rem] rounded-md"
            >
              SignUp
            </Link>
          </div>
        )}

        {localStorage.getItem("token") && (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="mr-[0.5rem] bg-blue-600 font-semibold text-white px-[1rem] py-[0.5rem] rounded-md"
          >
            LogOut
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
