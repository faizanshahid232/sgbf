import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import InvoiceServices from '../API/InvoiceServices';

export const initialState = {
  data: [],
  loading: 'idle',
  error: null,
  message: null,
};

export const CreateInvoice = createAsyncThunk('invoice/createInvoice', async (data) => {
  try {
    const res = await InvoiceServices.createInvoice(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getAllInvoices = createAsyncThunk('invoice/getAllInvoices', async () => {
  try {
    const res = await InvoiceServices.getAllInvoice();
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getUserInvoices = createAsyncThunk('invoice/getUserInvoice', async () => {
  try {
    const res = await InvoiceServices.getUserInvoice();
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getOrgInvoices = createAsyncThunk('invoice/getOrganizationInvoice', async () => {
  try {
    const res = await InvoiceServices.getOrganizationInvoice();
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getInvoicebyId = createAsyncThunk('invoice/getInvoicebyId', async (id) => {
  try {
    const res = await InvoiceServices.getInvoicebyId(id);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const deleteInvoice = createAsyncThunk('invoice/deleteInvoice', async (data) => {
  try {
    const res = await InvoiceServices.deleteInvoice(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});
export const editInvoice = createAsyncThunk('invoice/editInvoice', async (data) => {
  try {
    const res = await InvoiceServices.editInvoice(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const invoicesSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateInvoice.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(CreateInvoice.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(CreateInvoice.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getAllInvoices.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllInvoices.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
    });
    builder.addCase(getAllInvoices.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getUserInvoices.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getUserInvoices.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
    });
    builder.addCase(getUserInvoices.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getOrgInvoices.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getOrgInvoices.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
    });
    builder.addCase(getOrgInvoices.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(deleteInvoice.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(deleteInvoice.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(deleteInvoice.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(editInvoice.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(editInvoice.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(editInvoice.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getInvoicebyId.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getInvoicebyId.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(getInvoicebyId.rejected, (state, action) => {
      state.loading = 'rejected';
    });
  },
});

export default invoicesSlice.reducer;
