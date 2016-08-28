/**
 *
 * Relative utilities for express or service
 *
 * Author: Kim Hsiao
 *
 */

// import util from 'util';
import morgan from 'morgan';
import moment from 'moment';
// import * as FileStreamRotator from 'file-stream-rotator';
import Sequelize from 'sequelize';

import { join as pjoin } from 'path';
import settings from './global.js';

/** Data model generator */
import { userModel } from './../model/user.js';

const SETTINGS = settings();

export function logger(app) {
  const today = moment().format('YYYY-MM-DD');
  const logStyle = moment().format('YYYY-MM-DD kk:mm:ss:SSS');
  const winston = app.get('LOGGER');
  const log = new winston.Logger({
    transports: [
      new winston.transports.File({
        level: 'info',
        filename: pjoin(SETTINGS.path.log, `access_${today}.log`),
        handleExceptions: true,
        logstash: true,
        maxsize: 5242880, // 5MB
        maxFiles: 62,
        colorize: false,
      }),

      new winston.transports.Console({
        level: 'silly',
        handleExceptions: true,
        timestamp: () => logStyle,
        colorize: true,
        prettyPrint: true,
        humanReadableUnhandledException: true,
      }),
    ],
    exitOnError: false,
  });

  log.stream = {
    write: (message) => {
      log.info(message);
    },
  };

  /** save all system log into log file */
  app.use(morgan('combined', { stream: log.stream }));

  /** replace all console.* to winston style */
  console.info = log.info;
  console.log = log.info;
  console.warn = log.warn;
  console.error = log.error;
  console.debug = log.error;
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
