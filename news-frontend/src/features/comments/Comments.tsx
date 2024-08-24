import {
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useAppSelector } from '../../app/hooks';
import {
  selectComments,
  selectCommentsFetching,
  selectDeleteCommentsLoading,
} from './commentsSlice';
import React from 'react';

interface Props {
  onDelete: VoidFunction;
}

const Comments: React.FC<Props> = ({ onDelete }) => {
  const comments = useAppSelector(selectComments);
  const commentsFetching = useAppSelector(selectCommentsFetching);
  const commentDeleteLoading = useAppSelector(selectDeleteCommentsLoading);

  return (
    <Grid item component={Typography} variant="h6" fontWeight={'bold'}>
      <Typography variant="h5" component="h5" sx={{ mt: 2, mb: 3 }}>
        Комментарии
      </Typography>
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
    </Grid>
  );
};

export default Comments;
