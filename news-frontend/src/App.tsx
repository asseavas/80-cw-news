import AppToolbar from './UI/AppToolbar/AppToolbar';
import { Container, Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import News from './features/news/News';
import OneNews from './features/news/OneNews';

const App = () => {
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/news/:id" element={<OneNews />} />
          <Route
            path="*"
            element={<Typography variant="h1">Not found</Typography>}
          />
        </Routes>
      </Container>
    </>
  );
};

export default App;
