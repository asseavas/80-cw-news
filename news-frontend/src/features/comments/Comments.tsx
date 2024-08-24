import {
  Box,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  Modal,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectComments,
  selectCommentsCreating,
  selectCommentsFetching,
  selectDeleteCommentsLoading,
} from './commentsSlice';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CommentsForm from './components/CommentsForm';
import { createComment, fetchComments } from './commentsThunks';
import { ApiComment } from '../../types';

interface Props {
  onDelete: VoidFunction;
  id: string;
}

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

const Comments: React.FC<Props> = ({ onDelete, id }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const commentsFetching = useAppSelector(selectCommentsFetching);
  const commentCreating = useAppSelector(selectCommentsCreating);
  const commentDeleteLoading = useAppSelector(selectDeleteCommentsLoading);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFormSubmit = async (ApiComment: ApiComment) => {
    await dispatch(createComment(ApiComment));
    await dispatch(fetchComments(parseInt(id)));
    handleClose();
  };

  return (
    <Grid item component={Typography} variant="h6" fontWeight={'bold'}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBlock: '30px',
        }}
      >
        <Typography variant="h5" component="h5">
          Комментарии
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
      </div>
      {commentsFetching && (
        <Grid item>
          <CircularProgress />
        </Grid>
      )}
      {comments.length !== 0 ? (
        comments.map((comment) => (
          <Card key={comment.id} sx={{ mb: 2, width: '100%' }}>
            <CardContent>
              {comment.author ? (
                <Typography variant="h5" component="div">
                  {comment.author}
                </Typography>
              ) : (
                <Typography variant="h5" component="div">
                  Anonymous
                </Typography>
              )}
              <Typography
                variant="body2"
                component="div"
                mb={2}
                mt={2}
                color="text.secondary"
              >
                {dayjs(comment.created_at).format('DD.MM.YYYY HH:mm:ss')}
              </Typography>
              <Typography variant="h6" component="div">
                {comment.text}
              </Typography>
            </CardContent>
            <CardActions>
              <button
                onClick={onDelete}
                disabled={
                  commentDeleteLoading
                    ? commentDeleteLoading === comment.id
                    : false
                }
                style={{
                  border: 'none',
                  background: 'none',
                  color: 'grey',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                }}
              >
                {commentDeleteLoading &&
                  commentDeleteLoading === comment.id && <CircularProgress />}
                Удалить
              </button>
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography
          color="text.secondary"
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '15%',
          }}
        >
          No comments
        </Typography>
      )}
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
            <CommentsForm
              onSubmit={onFormSubmit}
              isLoading={commentCreating}
              onClose={handleClose}
            />
          </Typography>
        </Box>
      </Modal>
    </Grid>
  );
};

export default Comments;
