import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from "../../api/axiosClient";

export interface Income {
  _id: string
  source: string
  amount: number
  date: string
}

interface State {
  items: Income[]
  loading: boolean
  error: string | null
}

const initialState: State = { items: [], loading: false, error: null }

// 📌 Fetch incomes
export const fetchIncomes = createAsyncThunk(
  'incomes/fetch',
  async () => {
    const res = await api.get('/incomes')
    return res.data.incomes
  }
)

// 📌 Add income
export const addIncome = createAsyncThunk(
  'incomes/add',
  async (payload: { source: string; amount: number }) => {
    const res = await api.post('/incomes', payload)
    return res.data.income
  }
)

// 📌 Delete income
export const deleteIncome = createAsyncThunk(
  'incomes/delete',
  async (id: string) => {
    await api.delete(`/incomes/${id}`)
    return id
  }
)

// 📌 Update income
export const updateIncome = createAsyncThunk(
  'incomes/update',
  async ({ id, data }: { id: string; data: any }) => {
    const res = await api.put(`/incomes/${id}`, data)
    return res.data.income
  }
)

const slice = createSlice({
  name: 'incomes',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchIncomes.pending, (s) => { s.loading = true })
    b.addCase(fetchIncomes.fulfilled, (s, a) => {
      s.loading = false
      s.items = a.payload
    })
    b.addCase(fetchIncomes.rejected, (s, a) => {
      s.loading = false
      s.error = a.error.message || 'Failed'
    })

    b.addCase(addIncome.fulfilled, (s, a) => {
      s.items.unshift(a.payload)
    })

    b.addCase(deleteIncome.fulfilled, (s, a) => {
      s.items = s.items.filter(i => i._id !== a.payload)
    })

    b.addCase(updateIncome.fulfilled, (s, a) => {
      s.items = s.items.map(i => (i._id === a.payload._id ? a.payload : i))
    })
  }
})

export default slice.reducer
