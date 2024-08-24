import React, { useState } from 'react';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import { ApiComment } from '../../../types';

interface Props {
  onSubmit: (comment: ApiComment) => void;
  isLoading: boolean;
  onClose: React.MouseEventHandler;
}

const emptyState: ApiComment = {
  text: '',
  author: null,
};

const CommentsForm: React.FC<Props> = ({ onSubmit, isLoading, onClose }) => {
  const [state, setState] = useState<ApiComment>(emptyState);
  const [error, setError] = useState<string | null>(null);

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!state.text.trim()) {
      setError('Text cannot be empty or just whitespace.');
      return;
    }
    setError(null);
    onSubmit({ ...state });
    setState(emptyState);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Stack
      spacing={3}
      component="form"
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      onSubmit={submitFormHandler}
    >
      <TextField
        label="Author"
        id="author"
        name="author"
        value={state.author}
        onChange={inputChangeHandler}
        error={!!error}
        helperText={error}
      />
      <TextField
        required
        multiline
        label="Text"
        id="text"
        name="text"
        value={state.text}
        onChange={inputChangeHandler}
        error={!!error}
        helperText={error}
      />
      <Grid container alignItems="center" justifyContent="space-between" pt={3}>
        <Grid item>
          <Button variant="outlined" color="warning" onClick={onClose}>
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <LoadingButton
            sx={{
              width: '90px',
              height: '36px',
              backgroundColor: error ? 'red' : 'primary.main',
              '&:hover': {
                backgroundColor: error ? 'darkred' : 'primary.dark',
              },
            }}
            type="submit"
            loading={isLoading}
            endIcon={<AddIcon />}
            variant="contained"
          >
            Add
          </LoadingButton>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default CommentsForm;
