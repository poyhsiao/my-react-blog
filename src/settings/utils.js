/**
 *
 * Relative utilities for express or service
 *
 * Author: Kim Hsiao
 *
 */

import _ from 'lodash';
import morgan from 'morgan';
import moment from 'moment';
import camelCase from 'camelcase-keys';
import snakeCase from 'snakecase-keys';
// import * as FileStreamRotator from 'file-stream-rotator';
import Sequelize from 'sequelize';

import { join as pjoin } from 'path';
import settings from './global.js';

/** Data model generator */
import UserAdminModel from './../model/UserAdminModel.js';

const SETTINGS = settings();

export default class {
  constructor(app) {
    this.app = app;
  }

  /**
   * setting log system and replace console.* to wiston style
   */
  logger() {
    const today = moment().format('YYYY-MM-DD');
    const logStyle = moment().format('YYYY-MM-DD kk:mm:ss:SSS');
    const winston = this.app.get('LOGGER');
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
    this.app.use(morgan('combined', { stream: log.stream }));

    /** replace all console.* to winston style */
    console.info = log.info;
    console.log = log.info;
    console.warn = log.warn;
    console.error = log.error;
    console.debug = log.error;
  }

  /**
   * Connect to database
   * @type {object} which is the database connection object
   */
  sequelize(option = SETTINGS.db) {
    const {
      sqluser: user,
      sqlpassword: password,
      sqldatabase: database,
      sql: opt,
    } = option;

    return new Sequelize(database, user, password, opt);
  }

  /**
   * initial model (database schema)
   * @type {Boolean}
   */
  initialModel(app, force = false, callback) {
    const userAdminModel = new UserAdminModel(app);

    return userAdminModel.admin()
            .sync({ force })
            // .catch(err => {
            //   console.error({ err });
            // })
            .then(() => {
              userAdminModel.indexes();
            })
            .asCallback(callback);
  }

  convertCase(obj, type = 'camel') {
    try {
      if (_.isString(obj)) {
        return ('camel' === type) ? _.camelCase(obj) : _.snakeCase(obj);
      }

      return ('camel' === type) ? camelCase(obj) : snakeCase(obj);
    } catch (err) {
      console.warn({ err });
      return obj;
    }
  }
}
