import React from "react";
import { useForm } from "react-hook-form";

import axios from "axios";
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
export default function Login() {
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

//   const submitHandler = (e) => {
//     e.preventDefault();
//     console.log(data);
//     axios.post("http://localhost:7007/login", data).then((res) => {
//       if (res.data === "notexist") {
//         toast.error("Signup First");
//         navigate("/signup");
//       } else {
//         toast.success("Login successfully");
//         const userData = JSON.parse(res.config.data);
//         localStorage.setItem("userLoginData", JSON.stringify(userData));
//         const intendedDestination = localStorage.getItem('intendedDestination');
//         if (intendedDestination) {
//           localStorage.removeItem('intendedDestination');
//           navigate(`/${intendedDestination}`);
//         } else {
//           navigate("/");
//         }
//       }
//     }).catch((error) => {
//       console.error("There was an error logging in!", error);
//       toast.error("Login failed. Please try again.");
//     });
//   };
 
const submitHandler = (data) => {
    axios.post("http://localhost:7007/signup", data).then((res) => {
      console.log(res);
      if (res.data === "notexist") {
        toast.error("You dont have an account");
        navigate("/signup");
      } else {
        toast.success("Login Successfully");
        const userData = JSON.parse(res.config.data);
        localStorage.setItem("userSignupData", JSON.stringify(userData));
        const intendedDestination = localStorage.getItem('intendedDestination');
        
        if (intendedDestination) {
          const totalScore = localStorage.getItem('totalScore');
          const maxScore = localStorage.getItem('maxScore');
          localStorage.removeItem('intendedDestination');
          navigate('/score', { state: { totalScore, maxScore } });
        } else {
          navigate("/");
        }
      }
    }).catch((error) => {
      console.error("There was an error during signup!", error);
      toast.error("Signup failed. Please try again.");
    });
  };
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="w-full bg-slate-400">
        <Navbar />
      </nav>
      <div className="flex flex-1 flex-col lg:flex-row items-center justify-center ">
        <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
          <form onSubmit={handleSubmit(submitHandler)} className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-extrabold text-center mb-4">Login</h1>
            <div className="form-control mb-4">
              <label className="text-gray-900 font-bold">Username</label>
              <input
                type="text"
                name="email"
                {...register("email", { required: true })}
                className={`w-full p-2 border-b-2 text-gray-900 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:border-blue-500`}
                placeholder="Enter your username"
              />
              {errors.email && errors.email.type === "required" && (
                <p className="text-red-500 mt-1">Email is required.</p>
              )}
            </div>
            <div className="form-control mb-4">
              <label className="text-gray-900 font-bold">Password</label>
              <input
                type="password"
                name="password"
                {...register("password", { required: true })}
                className={`w-full p-2 border-b-2 text-gray-900 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:border-blue-500`}
                placeholder="Enter your Password"
              />
              {errors.password && (
                <p className="text-red-500 mt-1">Password is required.</p>
              )}
            </div>
            <div className="form-control flex justify-center items-center">
              <button
                type="submit"
                className="w-full py-2 bg-slate-800 text-gray-200 rounded-md hover:bg-slate-700 transition duration-300"
              >
                Login
              </button>
            </div>
            <div className="text-gray-900 flex justify-center items-center mt-5">
              Don't have an account? <Link to="/signup"><p className="text-slate-800 underline ml-2">Signup</p></Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}