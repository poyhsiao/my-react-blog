/**
 *
 * Express routing rule settings
 *
 * Author: Kim Hsiao
 *
 */

// import express from 'express';
import * as bodyParser from 'body-parser';
import multer from 'multer';

export default app => {
  const upload = multer();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.route('/')
    .get((req, res) => {
      const { query } = req;
      console.log({ query });
      res.json({ query });
    })
    .post(upload.array(), (req, res) => {
      const { body } = req;
      console.log({ body });
      res.json({ body });
    })
    .put(upload.array(), (req, res) => {
      const { body, query } = req;
      console.log({ body, query });
      res.json({ body, query });
    });
};
