import React, { useState, useEffect } from "react";
import BreadCrumb from "../componets/BreadCrumb";
import { Meta } from "../componets/Meta";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, login } from "../redux/features/auth/authSlice";
import { LoadingButton } from "../componets/extras/LoadingButton";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [showPassword, setShowPassword] = useState(false);
  const { user, isLoggedIn, isSuccess, isError } = useSelector(
    (state) => state.auth
  );

  // Capture the `redirect` parameter
  const redirect = location.search ? new URLSearchParams(location.search).get("redirect") : "/";

  useEffect(() => {
    // Navigate to the `redirect` path if the user is logged in
    if (user) {
      navigate(redirect);
    }
  }, [user, navigate, redirect]);


  // Adjust useEffect to navigate on success, no need to manually toggle loading state here
  useEffect(() => {
    if (isSuccess && user) {
      navigate(redirect);
      // Reset any auth state if needed here
    }

    dispatch(RESET_AUTH());
  }, [user, isSuccess, isLoggedIn, navigate, redirect, dispatch]);

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All field are required");
    }
    if (password.length < 6) {
      return toast.error("Please must be up to 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };

    setIsLoading(true);

    try {
      await dispatch(login(userData)).unwrap();
      navigate(redirect); // Navigate to dashboard or home page
    } catch (error) {
      setIsLoading(false);
      if (error.info === "Please verify your email before logging in.") {
        toast.error("Please verify your email before logging in.");
        setTimeout(() => {
          navigate("/verify-email");
        }, 3000); // Adjust the delay as needed
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Meta
        title="Login Page - Bamstore.ng"
        description="Login to the BamstoreNG No1 gadget store in Nigeria."
        keywords="login, bamstore login, welcome to bamstore ng"
        url="http://bamstore.ng/login"
      />
      <main
        id="main-content"
        className="bg-gray-bk w-full h-screen md:h-fit px-6 flex flex-col items-center justify-center gap-6 py-20  md:py-60"
      >
        <h3 className="text-3xl text-dark text-center md:text-4xl font-bold">
          Login
        </h3>
        <p className="text-center text-dark">
          Enter Your email and password to login
        </p>
        <form
          onSubmit={loginUser}
          action=""
          className="w-full container px-6  bg-light py-6 rounded-lg max-w-md gap-6 flex flex-col shadow-2xl "
        >
          {/*    <!-- Component: Rounded basic input  --> */}
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            required
            value={email}
            onChange={handleInputChange}
            className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          />
          <div className="relative ">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Password"
              value={password}
              onChange={handleInputChange}
              className="peer relative h-10 w-full rounded border  border-gray px-4 pr-12 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />

            {showPassword ? (
              <svg
                onClick={() => setShowPassword(!showPassword)}
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-2.5 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-labelledby="title-4 description-4"
                role="graphics-symbol"
              >
                <title id="title-4">Check mark icon</title>
                <desc id="description-4">Icon description here</desc>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              <svg
                onClick={() => setShowPassword(!showPassword)}
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-2.5 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-labelledby="title-4d description-4d"
                role="graphics-symbol"
              >
                <title id="title-4d">Check mark icon</title>
                <desc id="description-4d">Icon description here</desc>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            )}
          </div>
          <Link to={"/forgot-password"} className="text-red-800">
            Forgot your password?
          </Link>
          <LoadingButton type="submit" isLoading={isLoading}>
            Login
          </LoadingButton>
          {/* <button type="submit" className="btn btn-primary">
              Login
            </button> */}
        </form>
        <p className="text-dark">
          Don't have account?{" "}
          <Link to={"/register"} className="text-sec-color">
            Sign up
          </Link>{" "}
        </p>
      </main>
    </>
  );
};

export default Login;
