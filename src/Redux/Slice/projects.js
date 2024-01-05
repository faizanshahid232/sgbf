import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import ProjectServices from '../API/ProjectServices';

export const initialState = {
  data: [],
  projectDetails: {},
  loading: 'idle',
  error: null,
  message: null,
};

export const CreateProjects = createAsyncThunk('projects/CreateProjects', async (data) => {
  try {
    const res = await ProjectServices.createProject(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getAllProjects = createAsyncThunk('projects/getAllProjects', async () => {
  try {
    const res = await ProjectServices.getAllProject();
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});
export const getAllProjectsPublic = createAsyncThunk('projects/getAllProjectsPublic', async () => {
  try {
    const res = await ProjectServices.getAllProjectPublic();
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getProjectsbyId = createAsyncThunk('projects/getProjectsbyId', async (id) => {
  try {
    const res = await ProjectServices.getProjectbyId(id);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const deleteProjects = createAsyncThunk('projects/deleteProjects', async (data) => {
  try {
    const res = await ProjectServices.deleteProject(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});
export const editProjects = createAsyncThunk('projects/editProjects', async (data) => {
  try {
    const res = await ProjectServices.editProject(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateProjects.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(CreateProjects.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(CreateProjects.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getAllProjects.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllProjects.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
    });
    builder.addCase(getAllProjects.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getAllProjectsPublic.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllProjectsPublic.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
    });
    builder.addCase(getAllProjectsPublic.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(deleteProjects.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(deleteProjects.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(deleteProjects.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(editProjects.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(editProjects.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(editProjects.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getProjectsbyId.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getProjectsbyId.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.projectDetails = action.payload;
    });
    builder.addCase(getProjectsbyId.rejected, (state, action) => {
      state.loading = 'rejected';
      state.error = action.payload;
    });
  },
});

export default projectsSlice.reducer;
