import React, { useState } from "react";
import api from "../../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { setToken } from "../../store/slices/authSlice";
import { setUser } from "../../store/slices/userSlice";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      dispatch(setToken(res.data.accessToken));

      if (res.data.user) {
        dispatch(setUser(res.data.user));
      }

      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">

      {/* LOGO + HEADER */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://www.svgrepo.com/show/301692/login.svg"
          alt="Logo"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Or{" "}
          <span
            onClick={() => navigate("/login")}
            className="font-medium text-purple-600 hover:text-purple-500 cursor-pointer"
          >
            login to your account
          </span>
        </p>

        {error && (
          <p className="mt-4 text-center text-red-500 font-medium">{error}</p>
        )}
      </div>

      {/* FORM CARD */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl sm:rounded-2xl sm:px-10">

          <form onSubmit={handleSubmit}>

            {/* NAME */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                name="name"
                required
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-purple-300 sm:text-sm"
              />
            </div>

            {/* EMAIL */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="user@example.com"
                value={form.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-purple-300 sm:text-sm"
              />
            </div>

            {/* PASSWORD */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 focus:ring-purple-300 sm:text-sm"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 focus:ring-purple-300 sm:text-sm"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition duration-200"
              >
                Create account
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
};

export default Register;
