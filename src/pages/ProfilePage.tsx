import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchMyProfile, updateMyProfile } from "../store/slices/profileSlice";

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((s) => s.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  if (password.trim() !== "") {
    payload.password = password;
  }

  try {
    await dispatch(updateMyProfile(payload)).unwrap();
    alert("✅ Profile updated successfully");
    setPassword("");
  } catch (err) {
    alert("❌ Failed to update profile");
  }
};



  return (
    <div className="bg-[#f4f7ff] min-h-screen p-6">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        {loading && <p>Loading...</p>}

        <div className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Name"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Email"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full border rounded px-3 py-2"
            placeholder="New Password (optional)"
          />

          <button
            onClick={handleSave}
            className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
