import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/axiosClient";

export interface Category {
  _id: string;
  name: string;
  createdAt?: string;
}


interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

// Fetch all categories
export const fetchCategories = createAsyncThunk<
  { categories: Category[] },
  void,
  { rejectValue: string }
>("categories/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/categories");
    if (!res.data.categories || !Array.isArray(res.data.categories)) {
      return rejectWithValue("Invalid data format from server");
    }
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Fetch failed");
  }
});

// Add category
export const addCategory = createAsyncThunk<Category, string, { rejectValue: string }>(
  "categories/add",
  async (name, { rejectWithValue }) => {
    try {
      const res = await api.post("/categories", { name });
      return res.data.category; // backend sends { category: {...} }
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Add failed");
    }
  }
);

// Update category
export const updateCategory = createAsyncThunk<
  Category,
  { id: string; name: string },
  { rejectValue: string }
>("categories/update", async ({ id, name }, { rejectWithValue }) => {
  try {
    const res = await api.put(`/categories/${id}`, { name });
    return res.data.category; // backend returns { category: {...} }
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Update failed");
  }
});

// Delete category
export const deleteCategory = createAsyncThunk<string, string, { rejectValue: string }>(
  "categories/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/categories/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<{ categories: Category[] }>) => {
        state.loading = false;
        state.categories = action.payload.categories;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch categories";
      })
      // add
      .addCase(addCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.categories.unshift(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to add category";
      })
      // update
      .addCase(updateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        const index = state.categories.findIndex(c => c._id === action.payload._id);
        if (index !== -1) state.categories[index] = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to update category";
      })
      // delete
      .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
        state.categories = state.categories.filter(c => c._id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to delete category";
      });
  },
});

export default categoriesSlice.reducer;
