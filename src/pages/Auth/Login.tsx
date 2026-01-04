import React, { useState } from "react";
import api from "../../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { setToken } from "../../store/slices/authSlice";
import { setUser } from "../../store/slices/userSlice";
import { jwtDecode } from "jwt-decode";
import PublicNavbar from "../../components/PublicNavbar";
// After
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // -------------------------
  // Handle regular email/password login
  // -------------------------
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
          name: res.data.name || "",
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

  // -------------------------
  // Handle Google login
  // -------------------------
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const token = credentialResponse.credential;
      if (!token) throw new Error("No token returned from Google");

      // Send Google token to backend to login/register user
      const res = await api.post("/auth/google-login", { token });

      // Save access token to Redux
      dispatch(setToken(res.data.accessToken));

      const payload = jwtDecode<{ id: string; role: string }>(
        res.data.accessToken
      );

      dispatch(
        setUser({
          name: res.data.name || "",
          email: res.data.email,
          role: payload.role,
        })
      );

      if (payload.role === "admin") navigate("/admin");
      else navigate("/user");
    } catch (err: any) {
      setError(err.response?.data?.message || "Google login failed");
    }
  };

  const handleGoogleFailure = () => {
    setError("Google login failed");
  };

  // -------------------------
  // JSX
  // -------------------------
  return (
    <div className="bg-[#f4f7ff] min-h-screen">
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

          {/* GOOGLE LOGIN BUTTON */}
          <div className="flex justify-center mt-6">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
            />
          </div>

          {/* OR DIVIDER */}
          <div className="mt-6 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <span className="text-xs text-gray-500 uppercase">
              or login with email
            </span>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>

          {/* EMAIL LOGIN FORM */}
          <form onSubmit={handleSubmit} className="mt-4">
            <div>
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

            <div className="mt-8">
              <button
                type="submit"
                className="bg-purple-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-purple-800 transition"
              >
                Login
              </button>
            </div>

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
