import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOneNews, selectOneNewsFetching } from './newsSlice';
import { fetchOneNews } from './newsThunks';
import { useEffect } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';

const OneNews = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const oneNews = useAppSelector(selectOneNews);
  const isFetching = useAppSelector(selectOneNewsFetching);

  useEffect(() => {
    dispatch(fetchOneNews(id));
  }, [dispatch, id]);

  return (
    <Grid container direction="column" spacing={2}>
      {isFetching && (
        <Grid item>
          <CircularProgress />
        </Grid>
      )}
      {oneNews && (
        <>
          <Grid item component={Typography} variant="h4" fontWeight={'bold'}>
            {oneNews.title}
          </Grid>
          <Grid
            item
            component={Typography}
            variant="body1"
            color="text.secondary"
          >
            {dayjs(oneNews.created_at).format('DD.MM.YYYY HH:mm:ss')}
          </Grid>
          <Grid item component={Typography} variant="body1">
            {oneNews.text}
          </Grid>
          <Grid container>
            <Grid item component={Typography} variant="h6" fontWeight={'bold'}>
              Комментарии
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default OneNews;
