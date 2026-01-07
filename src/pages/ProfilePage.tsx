import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchMyProfile, updateMyProfile } from "../store/slices/profileSlice";
import Sidebar from "../components/Sidebar";

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((s) => s.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    dispatch(fetchMyProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSave = async () => {
    const payload: any = { name, email };
    if (password.trim()) payload.password = password;

    try {
      await dispatch(updateMyProfile(payload)).unwrap();
      setSaved(true);
      setPassword("");
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("❌ Failed to update profile");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f4f7ff]">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8">

          {/* HEADER */}
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            My <span className="text-purple-700">Profile</span>
          </h1>

          {/* AVATAR */}
          <div className="flex justify-center mb-8">
            <img
              src="https://res.cloudinary.com/dm4qd5n2c/image/upload/v1767585614/default-avatar-profile-icon-of-social-media-user-vector_bjnif3.webp"
              alt="avatar"
              className="w-28 h-28 rounded-full object-cover shadow-md"
            />
          </div>

          {loading && (
            <p className="text-center text-gray-500 mb-4">Loading...</p>
          )}

          {saved && (
            <div className="mb-6 text-center text-green-600 font-medium bg-green-50 border border-green-200 rounded-lg py-2">
              ✅ Profile updated successfully
            </div>
          )}

          {/* FORM */}
          <div className="space-y-6">
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                New Password (optional)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>
          <div className="text-center mt-10">
            <button
              onClick={handleSave}
              className="w-3/4 inline-block bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-full text-lg font-semibold shadow transition"
            >
              Save Changes
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
