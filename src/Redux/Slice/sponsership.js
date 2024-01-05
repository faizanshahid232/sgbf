import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import SponsershipServices from '../API/SponsershipServices';

export const initialState = {
  data: [],
  loading: 'idle',
  error: null,
  message: null,
};

export const CreateSponsership = createAsyncThunk('Sponsership/CreateSponsership', async (data) => {
  try {
    const res = await SponsershipServices.createSponsership(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getAllSponsership = createAsyncThunk('Sponsership/getAllSponsership', async () => {
  try {
    const res = await SponsershipServices.getAllSponsership();
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getSponsershipbyId = createAsyncThunk('Sponsership/getSponsershipbyId', async (id) => {
  try {
    const res = await SponsershipServices.getSponsershipbyId(id);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const deleteSponsership = createAsyncThunk('Sponsership/deleteSponsership', async (data) => {
  try {
    const res = await SponsershipServices.deleteSponsership(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});
export const editSponsership = createAsyncThunk('Sponsership/editSponsership', async (datas) => {
  try {
    const { id, data } = datas;
    const res = await SponsershipServices.editSponsership(id, data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const sponsershipSlice = createSlice({
  name: 'Sponsership',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateSponsership.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(CreateSponsership.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(CreateSponsership.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getAllSponsership.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllSponsership.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
    });
    builder.addCase(getAllSponsership.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(deleteSponsership.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(deleteSponsership.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(deleteSponsership.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(editSponsership.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(editSponsership.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(editSponsership.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getSponsershipbyId.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getSponsershipbyId.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(getSponsershipbyId.rejected, (state, action) => {
      state.loading = 'rejected';
    });
  },
});

export default sponsershipSlice.reducer;
