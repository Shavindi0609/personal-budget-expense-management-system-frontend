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
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(form.password)) {
      setError("Password must contain at least one letter and one number");
      return;
    }

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

  const getPasswordStrength = () => {
    if (form.password.length < 8) return "Weak";
    if (/^(?=.*[A-Za-z])(?=.*\d).+$/.test(form.password)) return "Strong";
    return "Medium";
  };

  return (
    <div className="bg-purple-100 min-h-screen">
      <PublicNavbar />

      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl my-12">

        {/* LEFT SIDE IMAGE */}
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dm4qd5n2c/image/upload/v1767588755/pexels-shalom-ejiofor-2153542296-32836402_rxjp8o.jpg')",
          }}
        ></div>

        {/* RIGHT SIDE FORM */}
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-3xl font-bold text-purple-700 text-center">
            Create Your Account
          </h2>
          <p className="text-lg text-gray-700 text-center mt-1">
            Join us and get started!
          </p>

          {error && (
            <p className="text-center text-red-500 font-medium mt-2">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* Name */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
                className="bg-white border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="user@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="bg-white border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="********"
                required
                className="bg-white border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs text-purple-700 mt-1"
              >
                {showPassword ? "Hide password" : "Show password"}
              </button>
              {form.password && (
                <p className="text-sm mt-1 text-gray-600">
                  Strength:{" "}
                  <span
                    className={
                      getPasswordStrength() === "Strong"
                        ? "text-green-600"
                        : getPasswordStrength() === "Medium"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }
                  >
                    {getPasswordStrength()}
                  </span>
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="********"
                required
                className="bg-white border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={
                  !form.name || !form.email || !form.password || !form.confirmPassword
                }
                className="bg-purple-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-purple-800 transition"
              >
                Create Account
              </button>
            </div>
          </form>

          {/* Already have account */}
          <div className="mt-4 flex items-center justify-center">
            <span className="text-gray-600">Already have an account? </span>
            <span
              onClick={() => navigate("/login")}
              className="text-purple-700 ml-2 cursor-pointer hover:underline font-semibold"
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
