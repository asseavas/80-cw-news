import express from 'express';
import mysqlDb from '../mysqlDb';
import { ApiComment, Comment, News } from '../types';
import { ResultSetHeader } from 'mysql2';

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
  try {
    const ID = req.query.news_id;
    let query = 'SELECT * FROM comments';
    const queryParams: any[] = [];

    if (ID) {
      query += ' WHERE news_id = ?';
      queryParams.push(ID);
    }

    const result = await mysqlDb.getConnection().query(query, queryParams);
    const comments = result[0] as Comment[];
    return res.send(comments);
  } catch (e) {
    next(e);
  }
});

commentsRouter.post('/', async (req, res, next) => {
  try {
    const ID = req.query.news_id;
    if (!req.body.text || !ID) {
      return res.status(400).send({ error: 'Text and news_id are required!' });
    }

    const [newsRows] = await mysqlDb
      .getConnection()
      .query('SELECT * FROM news WHERE id = ?', [ID]);
    const news = newsRows as News[];

    if (news.length === 0) {
      return res
        .status(400)
        .send({ error: 'News with this id does not exist!' });
    }

    const comment: ApiComment = {
      news_id: parseInt(ID as string),
      author: req.body.author || null,
      text: req.body.text,
    };
    const insertResult = await mysqlDb
      .getConnection()
      .query('INSERT INTO comments (news_id, author, text) VALUES (?, ?, ?)', [
        comment.news_id,
        comment.author,
        comment.text,
      ]);
    const resultHeader = insertResult[0] as ResultSetHeader;
    const getNewResult = await mysqlDb
      .getConnection()
      .query('SELECT * FROM comments WHERE id = ?', [resultHeader.insertId]);
    const comments = getNewResult[0] as Comment[];
    return res.send(comments[0]);
  } catch (e) {
    next(e);
  }
});

commentsRouter.delete('/:id', async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const deleteResult = await mysqlDb
      .getConnection()
      .query('DELETE FROM comments WHERE id = ?', [commentId]);
    const resultHeader = deleteResult[0] as ResultSetHeader;

    if (resultHeader.affectedRows > 0) {
      return res.status(200).send({ message: 'Comment deleted successfully.' });
    } else {
      return res.status(404).send({ error: 'Comment not found.' });
    }
  } catch (error) {
    next(error);
  }
});

export default commentsRouter;
