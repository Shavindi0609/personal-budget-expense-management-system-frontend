import React, { useState } from "react";
import api from "../../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { setToken } from "../../store/slices/authSlice";
import { setUser } from "../../store/slices/userSlice";
import { jwtDecode } from "jwt-decode";
import PublicNavbar from "../../components/PublicNavbar";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);

      dispatch(setToken(res.data.accessToken));

      const payload = jwtDecode<{ id: string; role: string }>(
        res.data.accessToken
      );

      dispatch(
        setUser({
          name: "",
          email: form.email,
          role: payload.role,
        })
      );

      if (payload.role === "admin") navigate("/admin");
      else navigate("/user");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-[#f4f7ff] min-h-screen">
      {/* PUBLIC NAVBAR */}
      <PublicNavbar />

      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl my-12">

        {/* LEFT SIDE IMAGE */}
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?auto=format&fit=crop&w=700&q=80')",
          }}
        ></div>

        {/* RIGHT SIDE FORM */}
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-3xl font-bold text-purple-700 text-center">
            FinWise
          </h2>
          <p className="text-lg text-gray-700 text-center mt-1">
            Welcome back!
          </p>

          {error && (
            <p className="text-center text-red-500 font-medium mt-2">{error}</p>
          )}

          <form onSubmit={handleSubmit}>
            {/* GOOGLE BUTTON */}
            <div className="flex items-center justify-center mt-6 bg-purple-700 text-white rounded-lg shadow-md hover:bg-purple-800 cursor-pointer transition">
              <div className="px-4 py-3">
                <svg className="h-6 w-6" viewBox="0 0 40 40">
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#1976D2"
                  />
                </svg>
              </div>
              <h1 className="px-4 py-3 w-5/6 text-center font-semibold">
                Sign in with Google
              </h1>
            </div>

            {/* OR DIVIDER */}
            <div className="mt-6 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <span className="text-xs text-gray-500 uppercase">
                or login with email
              </span>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>

            {/* EMAIL */}
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-semibold">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="bg-white border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* PASSWORD */}
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-semibold">
                  Password
                </label>
                <a className="text-xs text-purple-700 cursor-pointer hover:underline">
                  Forgot Password?
                </a>
              </div>
              <input
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                className="bg-white border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* LOGIN BUTTON */}
            <div className="mt-8">
              <button
                type="submit"
                className="bg-purple-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-purple-800 transition"
              >
                Login
              </button>
            </div>

            {/* SIGN UP LINK */}
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <span
                onClick={() => navigate("/register")}
                className="text-xs text-purple-700 uppercase cursor-pointer hover:underline"
              >
                or sign up
              </span>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
