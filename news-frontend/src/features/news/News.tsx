import { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Modal,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ApiNews } from '../../types';
import AddIcon from '@mui/icons-material/Add';
import {
  selectDeleteNewsLoading,
  selectNews,
  selectNewsCreating,
  selectNewsFetching,
} from './newsSlice';
import { createNews, fetchNews } from './newsThunks';
import NewsForm from './components/NewsForm';
import { toast } from 'react-toastify';
import NewsOneItem from './components/NewsOneItem';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const News = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const news = useAppSelector(selectNews);
  const isCreating = useAppSelector(selectNewsCreating);
  const isFetching = useAppSelector(selectNewsFetching);
  const deleteLoading = useAppSelector(selectDeleteNewsLoading);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFormSubmit = async (ApiNews: ApiNews) => {
    await dispatch(createNews(ApiNews));
    await dispatch(fetchNews());
    handleClose();
  };

  const deleteNews = async (id: number) => {
    try {
      if (window.confirm('Are you sure you want to delete?')) {
        await dispatch(deleteNews(id)).unwrap();
        await dispatch(fetchNews());
        toast.success('News deleted!');
      }
    } catch (e) {
      toast.error('Could not delete news!');
    }
  };

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2} sx={{ pb: 3 }}>
      <Grid
        item
        container
        justifyContent="end"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <Typography color="text.secondary" variant="h6" sx={{ mr: 2 }}>
          Add news
        </Typography>
        <IconButton
          onClick={handleOpen}
          sx={{
            bgcolor: 'grey',
            color: 'white',
            width: '50px',
            height: '50px',
          }}
        >
          <AddIcon />
        </IconButton>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add news
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 3 }}>
                <NewsForm
                  onSubmit={onFormSubmit}
                  isLoading={isCreating}
                  onClose={handleClose}
                />
              </Typography>
            </Box>
          </Modal>
        </div>
      </Grid>
      <Grid item container spacing={1}>
        {isFetching ? (
          <Grid container item sx={{ justifyContent: 'center' }}>
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container sx={{ mt: 1 }} spacing={3}>
            {news.length !== 0 ? (
              news
                .slice()
                .reverse()
                .map((news) => (
                  <NewsOneItem
                    key={news.id}
                    oneNews={news}
                    onDelete={() => deleteNews(news.id)}
                    deleteLoading={deleteLoading}
                  />
                ))
            ) : (
              <Typography
                variant="h6"
                color="text.secondary"
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: '15%',
                }}
              >
                No news
              </Typography>
            )}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default News;
