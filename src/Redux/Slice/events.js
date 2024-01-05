import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import EventsServices from '../API/EventsServices';

export const initialState = {
  data: [],
  publicData: [],
  eventDetails: {},
  loading: 'idle',
  error: null,
  message: null,
};

export const CreateEvent = createAsyncThunk('event/CreateEvent', async (data) => {
  try {
    const res = await EventsServices.createEvent(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getAllEvents = createAsyncThunk('event/getAllEvents', async () => {
  try {
    const res = await EventsServices.getAllEvent();
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getAllEventsPublic = createAsyncThunk('event/getAllEventsPublic', async () => {
  try {
    const res = await EventsServices.getAllEventPublic();
    // if (res.data) {
    //   toast.success(res.data.message);
    // }
    return res.data;
  } catch (error) {
    console.error(error.response.data.message);
    return error.message;
  }
});

export const getEventbyId = createAsyncThunk('event/getEventbyId', async (id) => {
  try {
    const res = await EventsServices.getEventbyId(id);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});
export const getEventByTerm = createAsyncThunk('event/eventTerm', async (eventTerm) => {
  try {
    const res = await EventsServices.eventTerms(eventTerm);
    // if (res.data) {
    //   toast.success(res.data.message);
    // }
    return res.data;
  } catch (error) {
    console.error(error.response.data.message);
    return error.message;
  }
});

export const deleteEvent = createAsyncThunk('event/deleteEvent', async (data) => {
  try {
    const res = await EventsServices.deleteEvent(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});
export const editEvent = createAsyncThunk('event/editEvent', async (datas) => {
  try {
    const { id, data } = datas;
    const res = await EventsServices.editEvent(id, data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateEvent.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(CreateEvent.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(CreateEvent.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getAllEvents.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllEvents.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
    });
    builder.addCase(getAllEvents.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(deleteEvent.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(deleteEvent.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(deleteEvent.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(editEvent.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(editEvent.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(editEvent.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getEventbyId.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getEventbyId.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.eventDetails = action.payload;
    });
    builder.addCase(getEventbyId.rejected, (state, action) => {
      state.loading = 'rejected';
    });
    builder.addCase(getEventByTerm.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getEventByTerm.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.publicData = action.payload;
    });
    builder.addCase(getEventByTerm.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getAllEventsPublic.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllEventsPublic.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.publicData = action.payload;
    });
    builder.addCase(getAllEventsPublic.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });
  },
});

export default eventSlice.reducer;
