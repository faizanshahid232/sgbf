import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import ArticalServices from '../API/ArticalServices';

export const initialState = {
  data: [],
  loading: 'idle',
  error: null,
  message: null,
};

export const CreateArticle = createAsyncThunk('artical/createArticle', async (data) => {
  try {
    const res = await ArticalServices.createArticle(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getAllArticles = createAsyncThunk('artical/getAllArticles', async () => {
  try {
    const res = await ArticalServices.getAllArticle();
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getAllArticlesPublic = createAsyncThunk('artical/getAllArticlesPublic', async () => {
  try {
    const res = await ArticalServices.getAllArticlePublic();
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const getArticalbyId = createAsyncThunk('artical/getArticalbyId', async (id) => {
  try {
    const res = await ArticalServices.getArticlebyId(id);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});

export const deleteArticle = createAsyncThunk('artical/deleteArticle', async (data) => {
  try {
    const res = await ArticalServices.deleteArticle(data);
    if (res.data) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.message;
  }
});
export const editArtical = createAsyncThunk('artical/editArtical', async (data) => {
  try {
    console.log('data==>', data);
    const { id, edit } = data;
    const res = await ArticalServices.editArticle(id, edit);
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

export const articalesSlice = createSlice({
  name: 'artical',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateArticle.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(CreateArticle.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(CreateArticle.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getAllArticles.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllArticles.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
    });
    builder.addCase(getAllArticles.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(deleteArticle.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(deleteArticle.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(deleteArticle.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(editArtical.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(editArtical.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(editArtical.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });

    builder.addCase(getArticalbyId.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getArticalbyId.fulfilled, (state) => {
      state.loading = 'idle';
    });
    builder.addCase(getArticalbyId.rejected, (state, action) => {
      state.loading = 'rejected';
    });

    builder.addCase(getAllArticlesPublic.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllArticlesPublic.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
    });
    builder.addCase(getAllArticlesPublic.rejected, (state, action) => {
      state.loading = 'rejected';
      state.message = action.payload;
    });
  },
});

export default articalesSlice.reducer;
