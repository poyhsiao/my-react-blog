/**
 *
 * Relative utilities for express or service
 *
 * Author: Kim Hsiao
 *
 */

import morgan from 'morgan';
import * as FileStreamRotator from 'file-stream-rotator';
import Sequelize from 'sequelize';

import { join as pjoin } from 'path';
import settings from './global.js';

/** Data model generator */
import { userModel } from './../model/user.js';

const SETTINGS = settings();

export function logger(app) {
  const accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYY-MM-DD',
    filename: pjoin(SETTINGS.path.log, 'access_%DATE%.log'),
    frequency: 'daily',
    verbose: false,
  });

  app.use(morgan('combined', { stream: accessLogStream }));
}

export function sequelize(app, option = SETTINGS.db) {
  const {
    sqluser: user,
    sqlpassword: password,
    sqldatabase: database,
    sql: opt,
  } = option;

  return new Sequelize(database, user, password, opt);
}

export function initialModel(app, forceUpdate = false, callback) {
  userModel(app, forceUpdate);
  if (callback) {
    return callback();
  }
  return true;
}

export default {};
