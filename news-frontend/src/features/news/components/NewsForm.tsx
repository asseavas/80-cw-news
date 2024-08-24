import React, { useState } from 'react';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import { ApiNews } from '../../../types';
import FileInput from '../../../UI/FileInput/FileInput';

interface Props {
  onSubmit: (news: ApiNews) => void;
  isLoading: boolean;
  onClose: React.MouseEventHandler;
}

const emptyState: ApiNews = {
  title: '',
  text: '',
  image: null,
};

const NewsForm: React.FC<Props> = ({ onSubmit, isLoading, onClose }) => {
  const [state, setState] = useState<ApiNews>(emptyState);
  const [error, setError] = useState<string | null>(null);

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!state.text.trim()) {
      setError('Text cannot be empty or just whitespace.');
      return;
    }
    if (!state.title.trim()) {
      setError('title cannot be empty or just whitespace.');
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

  const fileInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
        label="Title"
        id="title"
        name="title"
        value={state.title}
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
      <FileInput label="Image" name="image" onChange={fileInputChangeHandler} />
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

export default NewsForm;
