import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import OrganizationServices from '../API/OrganizationServices';

export const initialState = {
  data: [],
  loading: 'idle',
  error: null,
  message: null,
};

export const CreateOrganization = createAsyncThunk('organization/CreateOrganization', async (data) => {
  try {
    const res = await OrganizationServices.createOrganization(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getAllOrganization = createAsyncThunk('organization/getAllOrganization', async () => {
  try {
    const res = await OrganizationServices.getAllOrganization();
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getOrganizationbyId = createAsyncThunk('organization/getOrganizationbyId', async (id) => {
  try {
    const res = await OrganizationServices.getOrganizationbyId(id);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const deleteOrganization = createAsyncThunk('organization/deleteOrganization', async (data) => {
  try {
    const res = await OrganizationServices.deleteOrganization(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});
export const editOrganization = createAsyncThunk('organization/editOrganization', async (datas) => {
  try {
    const {id, data} = datas
    const res = await OrganizationServices.editOrganization(id,data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateOrganization.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(CreateOrganization.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(CreateOrganization.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getAllOrganization.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllOrganization.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
    });
    builder.addCase(getAllOrganization.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(deleteOrganization.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(deleteOrganization.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(deleteOrganization.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(editOrganization.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(editOrganization.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(editOrganization.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getOrganizationbyId.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getOrganizationbyId.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(getOrganizationbyId.rejected, (state, action) => {
      state.loading = 'rejected';
    });
  },
});

export default organizationSlice.reducer;
