import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ApiNews, News } from '../../types';

export const fetchNews = createAsyncThunk<News[]>('news/fetchAll', async () => {
  const { data: news } = await axiosApi.get<News[]>('/news');
  return news;
});

export const createNews = createAsyncThunk<void, ApiNews>(
  'news/create',
  async (apiNews) => {
    const formData = new FormData();
    formData.append('title', apiNews.title);
    formData.append('text', apiNews.text);

    if (apiNews.image) {
      formData.append('image', apiNews.image);
    }

    await axiosApi.post('/news', formData);
  },
);

export const fetchOneNews = createAsyncThunk<News, string>(
  'news/fetchOne',
  async (id) => {
    const { data: news } = await axiosApi.get<News>(`/news/${id}`);
    return news;
  },
);

export const deleteNews = createAsyncThunk<void, number>(
  'news/delete',
  async (id) => {
    await axiosApi.delete(`/news/${id}`);
  },
);
