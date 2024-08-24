import express from 'express';
import { ApiNews, News } from '../types';
import { imagesUpload } from '../multer';
import mysqlDb from '../mysqlDb';
import { ResultSetHeader } from 'mysql2';

const newsRouter = express.Router();

newsRouter.get('/', async (req, res, next) => {
  try {
    const result = await mysqlDb
      .getConnection()
      .query('SELECT id, title, image, created_at FROM news');
    const news = result[0] as News[];
    return res.send(news);
  } catch (e) {
    next(e);
  }
});

newsRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await mysqlDb
      .getConnection()
      .query('SELECT * FROM news WHERE id = ?', [id]);
    const news = result[0] as News[];

    if (news.length === 0) {
      return res.status(404).send({ error: 'News not found' });
    }

    return res.send(news[0]);
  } catch (e) {
    next(e);
  }
});

newsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.text) {
      return res.status(400).send({ error: 'Title and text are required!' });
    }

    const apiNews: ApiNews = {
      title: req.body.title,
      text: req.body.text,
      image: req.file ? req.file.filename : null,
    };
    const insertResult = await mysqlDb
      .getConnection()
      .query('INSERT INTO news (title, text, image) VALUES (?, ?, ?)', [
        apiNews.title,
        apiNews.text,
        apiNews.image,
      ]);
    const resultHeader = insertResult[0] as ResultSetHeader;
    const getNewResult = await mysqlDb
      .getConnection()
      .query('SELECT * FROM news WHERE id = ?', [resultHeader.insertId]);
    const news = getNewResult[0] as News[];
    return res.send(news[0]);
  } catch (e) {
    next(e);
  }
});

newsRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteResult = await mysqlDb
      .getConnection()
      .query('DELETE FROM news WHERE id = ?', [id]);
    const resultHeader = deleteResult[0] as ResultSetHeader;

    if (resultHeader.affectedRows > 0) {
      return res.status(200).send({ message: 'News deleted successfully.' });
    } else {
      return res.status(404).send({ error: 'News not found.' });
    }
  } catch (error) {
    next(error);
  }
});

export default newsRouter;
