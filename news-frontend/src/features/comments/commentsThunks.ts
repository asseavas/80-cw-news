import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ApiComment, Comment } from '../../types';

export const fetchComments = createAsyncThunk<Comment[], number>(
  'comments/fetchAll',
  async (id) => {
    const { data: comments } = await axiosApi.get<Comment[]>(
      `/comments?news_id=${id}`,
    );
    return comments;
  },
);

export const createComment = createAsyncThunk<void, ApiComment>(
  'comments/create',
  async (apiComm) => {
    await axiosApi.post('/comments', apiComm);
  },
);

export const deleteComment = createAsyncThunk<void, string>(
  'comments/delete',
  async (id) => {
    await axiosApi.delete(`/comments/${id}`);
  },
);
