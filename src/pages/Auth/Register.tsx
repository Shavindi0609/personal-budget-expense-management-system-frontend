import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosClient";
import { useAppDispatch } from "../../store/hooks";
import { setToken } from "../../store/slices/authSlice";
import { setUser } from "../../store/slices/userSlice";
import PublicNavbar from "../../components/PublicNavbar";

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
      if (res.data.user) dispatch(setUser(res.data.user));

      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="bg-[#f4f7ff] min-h-screen">
      <PublicNavbar />

      <div className="flex justify-center items-center py-20 px-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-purple-700 hover:text-purple-800 cursor-pointer font-semibold"
            >
              Login
            </span>
          </p>

          {error && (
            <p className="mt-4 text-center text-red-500 font-medium">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="user@example.com"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-700"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-full font-semibold transition duration-200"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
