import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { News } from '../../../types';
import imageNotFound from '../../../assets/images/image-not-found.webp';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

interface Props {
  oneNews: News;
  onDelete: VoidFunction;
  deleteLoading: false | number;
}

const NewsOneItem: React.FC<Props> = ({ oneNews, onDelete, deleteLoading }) => {
  let cardImage = imageNotFound;

  if (oneNews.image) {
    cardImage = `http://localhost:8000/${oneNews.image}`;
  }

  return (
    <Grid item xs={3}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          image={cardImage}
          sx={{ height: '100px', paddingTop: '56.25%' }}
        />
        <CardContent>
          <Typography variant="h5" component="h6" sx={{ fontWeight: 'bold' }}>
            {oneNews.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={2}>
            {dayjs(oneNews.created_at).format('DD.MM.YYYY HH:mm')}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            marginTop: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            paddingInline: '20px',
          }}
        >
          <button
            color="error"
            onClick={onDelete}
            disabled={deleteLoading ? deleteLoading === oneNews.id : false}
            style={{
              border: 'none',
              background: 'none',
              color: 'grey',
              fontSize: '14px',
              textTransform: 'uppercase',
            }}
          >
            {deleteLoading && deleteLoading === oneNews.id && (
              <CircularProgress />
            )}
            Удалить
          </button>
          <Button component={Link} to={`/news/${oneNews.id}`}>
            Читать полностью
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default NewsOneItem;
