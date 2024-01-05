import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import EventAgendaServices from '../API/EventAgendaServices';

export const initialState = {
  data: [],
  loading: 'idle',
  error: null,
  message: null,
};

export const CreateEventAgenda = createAsyncThunk('eventAgenda/CreateEventAgenda', async (data) => {
  try {
    console.log('data==>', data);
    const res = await EventAgendaServices.createEventAgenda(data);
    console.log('res==>', res);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getAllEventAgenda = createAsyncThunk('eventAgenda/getAllEventAgenda', async () => {
  try {
    const res = await EventAgendaServices.getAllEventAgenda();
    console.log('res==>', res);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getEventAgendabyId = createAsyncThunk('eventAgenda/getEventAgendabyId', async (id) => {
  try {
    const res = await EventAgendaServices.getEventAgendabyId(id);
    console.log('res==>', res);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const deleteEventAgenda = createAsyncThunk('eventAgenda/deleteEventAgenda', async (data) => {
  try {
    console.log('data==>', data);
    const res = await EventAgendaServices.deletEeventAgenda(data);
    console.log('res==>', res);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});
export const editEventAgenda = createAsyncThunk('eventAgenda/editEventAgenda', async (datas) => {
  try {
    const { id, data } = datas;
    const res = await EventAgendaServices.editEventAgenda(id, data);
    console.log('res==>', res);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const eventAgendasSlice = createSlice({
  name: 'eventAgenda',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateEventAgenda.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(CreateEventAgenda.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(CreateEventAgenda.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getAllEventAgenda.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllEventAgenda.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
    });
    builder.addCase(getAllEventAgenda.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(deleteEventAgenda.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(deleteEventAgenda.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(deleteEventAgenda.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(editEventAgenda.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(editEventAgenda.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(editEventAgenda.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getEventAgendabyId.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getEventAgendabyId.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(getEventAgendabyId.rejected, (state, action) => {
      state.loading = 'rejected';
    });
  },
});

export default eventAgendasSlice.reducer;
