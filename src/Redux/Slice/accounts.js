import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import EventsServices from '../API/EventsServices';

export const initialState = {
  data: [],
  contacts:[],
  loading: 'idle',
  error: null,
  message: null,
};

export const getAllAccounts = createAsyncThunk('accounts/getAllAccounts', async () => {
  try {
    const res = await EventsServices.getAllAccounts();
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getAllContacts = createAsyncThunk('accounts/getAllContacts', async (data) => {
  try {
    const res = await EventsServices.getAllContacts(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});



export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAccounts.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllAccounts.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
      // state.message = action.payload.message;
    });
    builder.addCase(getAllAccounts.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getAllContacts.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllContacts.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.contacts = action.payload;
      // state.message = action.payload.message;
    });
    builder.addCase(getAllContacts.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

  },
});

export default accountsSlice.reducer;
