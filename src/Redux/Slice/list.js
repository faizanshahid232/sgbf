import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import ListServices from '../API/ListServices';

export const initialState = {
  data: [],
  loading: 'idle',
  error: null,
  message: null,
};

export const CreateList = createAsyncThunk('list/CreateList', async (data) => {
  try {
    const res = await ListServices.createList(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getAllList = createAsyncThunk('list/getAllList', async () => {
  try {
    const res = await ListServices.getAllList();
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const deleteList = createAsyncThunk('list/deleteList', async (data) => {
  try {
    const res = await ListServices.deleteList(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});
export const editList = createAsyncThunk('list/editList', async (data) => {
  try {
    const res = await ListServices.editList(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const deleteSubscribers = createAsyncThunk('list/deleteSubscribers', async (data) => {
  try {
    const res = await ListServices.deleteSubscribers(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getListById = createAsyncThunk('list/getListById', async (data) => {
  try {
    const res = await ListServices.getListById(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const editSubscriberById = createAsyncThunk('list/editSubscriberById', async (data) => {
  try {
    const res = await ListServices.editSubscriberById(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});
export const deleteSubscriberById = createAsyncThunk('list/deleteSubscriberById', async (data) => {
  try {
    const res = await ListServices.deleteSubscriberById(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const automationDisableEnable = createAsyncThunk('list/automationDisableEnable', async (data) => {
  try {
    const res = await ListServices.toggeleAutomationSubscriber(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});



export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateList.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(CreateList.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(CreateList.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getAllList.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllList.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
    });
    builder.addCase(getAllList.rejected, (state, action) => {
   
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(deleteList.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(deleteList.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(deleteList.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(editList.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(editList.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(editList.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(deleteSubscribers.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(deleteSubscribers.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(deleteSubscribers.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });
    builder.addCase(getListById.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getListById.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(getListById.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });
    builder.addCase(editSubscriberById.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(editSubscriberById.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(editSubscriberById.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });
    builder.addCase(deleteSubscriberById.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(deleteSubscriberById.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(deleteSubscriberById.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(automationDisableEnable.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(automationDisableEnable.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(automationDisableEnable.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });
  },
});

export default listSlice.reducer;
