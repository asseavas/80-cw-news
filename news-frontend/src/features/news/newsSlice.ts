import { News } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createNews, deleteNews, fetchNews, fetchOneNews } from './newsThunks';

export interface NewsState {
  items: News[];
  oneNews: News | null;
  itemsFetching: boolean;
  oneFetching: boolean;
  isCreating: boolean;
  deleteLoading: false | number;
}

const initialState: NewsState = {
  items: [],
  oneNews: null,
  itemsFetching: false,
  oneFetching: false,
  isCreating: false,
  deleteLoading: false,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(fetchNews.fulfilled, (state, { payload: news }) => {
        state.itemsFetching = false;
        state.items = news;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.itemsFetching = false;
      });

    builder
      .addCase(createNews.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createNews.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createNews.rejected, (state) => {
        state.isCreating = false;
      });

    builder
      .addCase(fetchOneNews.pending, (state) => {
        state.oneNews = null;
        state.oneFetching = true;
      })
      .addCase(fetchOneNews.fulfilled, (state, { payload: oneNews }) => {
        state.oneNews = oneNews;
        state.oneFetching = false;
      })
      .addCase(fetchOneNews.rejected, (state) => {
        state.oneFetching = false;
      });

    builder
      .addCase(deleteNews.pending, (state, { meta: { arg: newsId } }) => {
        state.deleteLoading = newsId;
      })
      .addCase(deleteNews.fulfilled, (state) => {
        state.oneFetching = false;
      })
      .addCase(deleteNews.rejected, (state) => {
        state.oneFetching = false;
      });
  },
  selectors: {
    selectNews: (state) => state.items,
    selectNewsFetching: (state) => state.itemsFetching,
    selectNewsCreating: (state) => state.isCreating,
    selectOneNews: (state) => state.oneNews,
    selectOneNewsFetching: (state) => state.oneFetching,
    selectDeleteNewsLoading: (state) => state.deleteLoading,
  },
});

export const newsReducer = newsSlice.reducer;

export const {
  selectNews,
  selectNewsFetching,
  selectNewsCreating,
  selectOneNews,
  selectOneNewsFetching,
  selectDeleteNewsLoading,
} = newsSlice.selectors;
