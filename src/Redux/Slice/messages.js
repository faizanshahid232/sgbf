import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import MessagesServices from '../API/MessagesServices';

export const initialState = {
  data: [],
  loading: 'idle',
  error: null,
  message: null,
};

export const CreateMessage = createAsyncThunk('message/CreateMessage', async (data) => {
  try {
    const res = await MessagesServices.createMessage(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getAllMessages = createAsyncThunk('message/getAllMessages', async () => {
  try {
    const res = await  MessagesServices.getAllMessages();
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const deleteMessages = createAsyncThunk('message/deleteMessages', async (data) => {
  try {
    const res = await MessagesServices.deleteMessage(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});
export const editMessages = createAsyncThunk('message/editMessages', async (data) => {
  try {
    const res = await  MessagesServices.editMessages(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});


export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateMessage.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(CreateMessage.fulfilled, (state) => {
      state.loading = 'idle';
      // state.data = action.payload;
      // state.message = action.payload.message;
    });
    builder.addCase(CreateMessage.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getAllMessages.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllMessages.fulfilled, (state,action) => {
      state.loading = 'idle';
      state.data = action.payload;
      // state.message = action.payload.message;
    });
    builder.addCase(getAllMessages.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(deleteMessages.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(deleteMessages.fulfilled, (state) => {
      state.loading = 'idle';
      // state.data = action.payload;
      // state.message = action.payload.message;
    });
    builder.addCase(deleteMessages.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(editMessages.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(editMessages.fulfilled, (state) => {
      state.loading = 'idle';
      // state.data = action.payload;
      // state.message = action.payload.message;
    });
    builder.addCase(editMessages.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });
  },
});


export default messageSlice.reducer;
