import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import MarketPlaceService from '../API/MarketPlaceService';
// import MarketPlace from '../API/MarketPlaceService';

export const initialState = {
  data: [],
  marketData: {},
  loading: 'idle',
  error: null,
  message: null,
};

export const CreateMarketPlace = createAsyncThunk('marketPlace/createmarketPlace', async (data) => {
  try {
    const res = await MarketPlaceService.create(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getAllMarketPlace = createAsyncThunk('marketPlace/getAllmarketPlace', async () => {
  try {
    const res = await MarketPlaceService.getAll();
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getAllMarketPlacePublic = createAsyncThunk('marketPlace/getAllMarketPlacePublic', async () => {
  try {
    const res = await MarketPlaceService.getAllMarketPublic();
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getAllMarketPlacePublicById = createAsyncThunk('marketPlace/getAllMarketPlacePublicById', async (id) => {
  try {
    const res = await MarketPlaceService.getMarketPublicbyId(id);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const deleteMarketPlace = createAsyncThunk('marketPlace/deletemarketPlace', async (data) => {
  try {
    const res = await MarketPlaceService.deleteById(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const editMarketPlace = createAsyncThunk('marketPlace/editmarketPlace', async (data) => {
  try {
    const { id, edit } = data;
    const res = await MarketPlaceService.edit(id, edit);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const marketPlaceSlice = createSlice({
  name: 'marketPlace',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateMarketPlace.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(CreateMarketPlace.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(CreateMarketPlace.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getAllMarketPlace.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllMarketPlace.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
    });
    builder.addCase(getAllMarketPlace.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(deleteMarketPlace.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(deleteMarketPlace.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(deleteMarketPlace.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(editMarketPlace.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(editMarketPlace.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(editMarketPlace.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });
    builder.addCase(getAllMarketPlacePublic.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllMarketPlacePublic.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(getAllMarketPlacePublic.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getAllMarketPlacePublicById.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllMarketPlacePublicById.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.marketData = action.payload;
    });
    builder.addCase(getAllMarketPlacePublicById.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });
  },
});

export default marketPlaceSlice.reducer;
