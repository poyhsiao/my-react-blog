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
import UserAdminControl from './../controls/user/UserAdminControl.js';

export default app => {
  const upload = multer();
  const putils = app.get('PUTILS');

  const {
    newer: userNewer,
    modifier: userModifier,
    deleter: userDeleter,
    query: userQuery,
} = new UserAdminControl();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  /**
   *
   * Installtion of the DB schema
   *
   * if query / body is "clean" and the value is '1' will clean up all table and set tables
   *
   * if query / body is "clean" and the value is not equal '1' will set tables without any data lost
   *
   */
  app.route('/installDB')
    .post((req, res) => {
      if ('clean' in req.body) {
        if ('1' === req.body.clean) {
          putils.initialModel(true, () => {
            res.json({
              status: 'OK',
              msg: 'Initial model completed (all data has already cleaned)',
            });
          });
        } else {
          putils.initialModel(false, () => {
            res.json({
              status: 'OK',
              msg: 'Initial model completed (all data is preserved)',
            });
          });
        }
      } else {
        res.json({
          status: 'OK',
          msg: 'Please ask administrator to handle this',
        });
      }
    })
    .get((req, res) => {
      if ('clean' in req.query) {
        if ('1' === req.query.clean) {
          putils.initialModel(true, () => {
            res.json({
              status: 'OK',
              msg: 'Initial model completed (all data has already cleaned)',
            });
          });
        } else {
          putils.initialModel(false, () => {
            res.json({
              status: 'OK',
              msg: 'Initial model completed (all data is preserved)',
            });
          });
        }
      } else {
        res.json({
          status: 'OK',
          msg: 'Please ask administrator to handle this',
        });
      }
    });

  app.route('/user/admin')
    .get(userQuery)
    .post(userNewer)
    .put(userModifier)
    .delete(userDeleter);

  /** default route rule */
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
