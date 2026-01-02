import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axiosClient";

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isBlocked: boolean;
  createdAt: string;
}

interface State {
  items: AdminUser[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  items: [],
  loading: false,
  error: null,
};

// Fetch users
export const fetchUsers = createAsyncThunk(
  "adminUsers/fetch",
  async () => {
    const res = await api.get("/admin/users");
    return res.data.users;
  }
);

// Toggle block
export const toggleBlockUser = createAsyncThunk(
  "adminUsers/block",
  async (id: string) => {
    const res = await api.put(`/admin/users/${id}/block`);
    return res.data.user;
  }
);

// Change role
export const updateUserRole = createAsyncThunk(
  "adminUsers/role",
  async ({ id, role }: { id: string; role: string }) => {
    const res = await api.put(`/admin/users/${id}/role`, { role });
    return res.data.user;
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "adminUsers/delete",
  async (id: string) => {
    await api.delete(`/admin/users/${id}`);
    return id;
  }
);

const slice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchUsers.pending, (s) => {
      s.loading = true;
    });
    b.addCase(fetchUsers.fulfilled, (s, a) => {
      s.loading = false;
      s.items = a.payload;
    });
    b.addCase(fetchUsers.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error.message || "Failed";
    });

    b.addCase(toggleBlockUser.fulfilled, (s, a) => {
      s.items = s.items.map((u) =>
        u._id === a.payload._id ? a.payload : u
      );
    });

    b.addCase(updateUserRole.fulfilled, (s, a) => {
      s.items = s.items.map((u) =>
        u._id === a.payload._id ? a.payload : u
      );
    });

    b.addCase(deleteUser.fulfilled, (s, a) => {
      s.items = s.items.filter((u) => u._id !== a.payload);
    });
  },
});

export default slice.reducer;
