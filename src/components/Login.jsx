import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [eye, setEye] = useState(true);
  //   const [error, setError] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePassword = (e) => {
    e.preventDefault();
    if (eye) {
      localStorage.removeItem("token");
      setEye(false);
      document.getElementById("password").type = "text";
    } else {
      setEye(true);
      document.getElementById("password").type = "password";
    }
  };
  const handleForm = async (e) => {
    e.preventDefault();
    if (user.email.length < 10 || user.password.length < 8) {
      toast.error("Please fill correct credentials", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      //   setError(true);
    } else {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, password: user.password }),
      });
      const json = await response.json();
      if (json.authtoken) {
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        console.log(json);
      } else {
        toast.error("Please fill correct credentials", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  return (
    <div className="flex justify-center items-center w-full h-[80vh]">
      <form
        onSubmit={handleForm}
        className="flex flex-col w-[35rem] p-[2rem] border-[1px] border-gray-500 rounded-md shadow-xl"
      >
        <h1 className="font-bold text-center text-[1.5rem] mb-[2rem] righteous-regular">
          Login
        </h1>
        <div className="mb-[2rem] flex flex-col">
          <input
            value={user.email}
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="john@gmail.com"
            className="border-[1px] border-gray-500 pl-[0.5rem] py-[0.5rem] rounded-sm"
          />
        </div>
        <div className="flex  items-center mb-[2.5rem] border-[1px] border-gray-500 rounded pr-[0.5rem]">
          <input
            value={user.password}
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
            placeholder="********"
            className=" pl-[0.5rem] py-[0.5rem] -sm w-full outline-none"
          />
          <button
            className={`${eye ? "block" : "hidden"} fa-solid fa-eye`}
            onClick={handlePassword}
          ></button>
          <button
            onClick={handlePassword}
            className={`${eye ? "hidden" : "block"} fa-solid fa-eye-slash`}
          ></button>
        </div>
        <div className="flex justify-center items-center mb-[1rem]">
          <button
            type="submit"
            className="bg-blue-600 py-[0.5rem] font-bold text-white w-full rounded-full shadow-xl"
          >
            LogIn
          </button>
        </div>
        <p>
          New user?{" "}
          <Link to="/signup">
            {" "}
            <span className="text-blue-600">SignUp</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
