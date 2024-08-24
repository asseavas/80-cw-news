import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOneNews, selectOneNewsFetching } from './newsSlice';
import { fetchNews, fetchOneNews } from './newsThunks';
import { CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { fetchComments } from '../comments/commentsThunks';
import { toast } from 'react-toastify';
import Comments from '../comments/Comments';
import imageNotFound from '../../assets/images/image-not-found.webp';

const OneNews = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const oneNews = useAppSelector(selectOneNews);
  const isFetching = useAppSelector(selectOneNewsFetching);

  let cardImage = imageNotFound;

  if (oneNews !== null) {
    cardImage = `http://localhost:8000/${oneNews.image}`;
  }

  const deleteComments = async (id: string) => {
    try {
      if (window.confirm('Вы уверены, что хотите удалить комментарий?')) {
        await dispatch(deleteComments(id)).unwrap();
        await dispatch(fetchNews());
        toast.success('Удален!');
      }
    } catch (e) {
      toast.error('Не удален!');
    }
  };

  useEffect(() => {
    dispatch(fetchOneNews(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchComments(parseInt(id)));
  }, [dispatch, id]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        {isFetching && (
          <Grid item>
            <CircularProgress />
          </Grid>
        )}
        {oneNews && (
          <Grid container spacing={3} direction="column">
            <Grid
              item
              xs={2}
              component={Typography}
              variant="h4"
              fontWeight={'bold'}
            >
              {oneNews.title}
            </Grid>
            <Grid
              item
              xs={2}
              component={Typography}
              variant="body1"
              color="text.secondary"
            >
              {dayjs(oneNews.created_at).format('DD.MM.YYYY HH:mm')}
            </Grid>
            <Grid item>
              <CardMedia
                component="img"
                sx={{ width: 400 }}
                image={cardImage}
                alt={oneNews.title}
              />
            </Grid>
            <Grid item component={Typography} variant="h6" xs={3}>
              {oneNews.text}
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={6} container>
        <Comments onDelete={() => deleteComments(id)} id={id} />
      </Grid>
    </Grid>
  );
};

export default OneNews;
