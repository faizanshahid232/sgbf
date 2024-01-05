import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import EventsServices from '../API/EventsServices';

export const initialState = {
    data: [],
    eventDetails: {},
    loading: 'idle',
    error: null,
    message: null,
};

export const getAllRegisteredUser = createAsyncThunk('event/getAllgetAllRegisteredUser', async (id) => {
    try {
        const res = await EventsServices.getAllRegisteredUser(id);
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
        return error.message;
    }
});

export const deleteRegisteredUser = createAsyncThunk('event/deletegetAllRegisteredUser', async (id) => {
    try {
      const res = await EventsServices.deleteRegisteredUser(id);
      if (res.data) {
        toast.success(res.data.message);
      }
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return error.message;
    }
  });

export const eventRegisteredUser = createSlice({
    name: 'eventRegisteredUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllRegisteredUser.pending, (state) => {
            state.loading = 'pending';
        });
        builder.addCase(getAllRegisteredUser.fulfilled, (state, action) => {
            state.loading = 'idle';
            state.data = action.payload;
        });
        builder.addCase(getAllRegisteredUser.rejected, (state, action) => {
            state.loading = 'rejected';
            state.message = action.payload;
        });

        builder.addCase(deleteRegisteredUser.pending, (state) => {
            state.loading = 'pending';
          });
          builder.addCase(deleteRegisteredUser.fulfilled, (state) => {
            state.loading = 'idle';
          });
          builder.addCase(deleteRegisteredUser.rejected, (state, action) => {
            state.loading = 'rejected';
            state.message = action.payload;
          });
    },
});

export default eventRegisteredUser.reducer;
