import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import EducationService from '../API/EducationService';

export const initialState = {
  data: [],
  loading: 'idle',
  error: null,
  message: null,
};

export const CreateEducation= createAsyncThunk('education/createeducation', async (data) => {
  try {
    const res = await EducationService.create(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getAllEducation = createAsyncThunk('education/getAlleducation', async () => {
  try {
    const res = await EducationService.getAll();
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getAllEducationPublic = createAsyncThunk('education/getAlleducationPublic', async () => {
  try {
    const res = await EducationService.getAllPublic();
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getEducationbyId = createAsyncThunk('education/geteducationbyId', async (id) => {
  try {
    const res = await EducationService.getbyId(id);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const deleteEducation= createAsyncThunk('education/deleteeducation', async (data) => {
  try {
    const res = await EducationService.deletes(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});
export const editEducation = createAsyncThunk('education/editeducation', async (data) => {
  try {
    const { id, edit } = data;
    const res = await EducationService.edit(id, edit);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateEducation.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(CreateEducation.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(CreateEducation.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getAllEducation.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllEducation.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
    });
    builder.addCase(getAllEducation.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(deleteEducation.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(deleteEducation.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(deleteEducation.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(editEducation.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(editEducation.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(editEducation.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getEducationbyId.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getEducationbyId.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(getEducationbyId.rejected, (state, action) => {
      state.loading = 'rejected';
    });

    builder.addCase(getAllEducationPublic.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllEducationPublic.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
    });
    builder.addCase(getAllEducationPublic.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });
  },
});

export default educationSlice.reducer;
