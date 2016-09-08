/**
 *
 * The real entrance of the app with es2017
 *
 * Author: Kim Hsiao
 *
 */
import express from 'express';
import winston from 'winston';
import promise from 'bluebird';
import _ from 'lodash';

import settings from './settings/global.js';
import route from './settings/route.js';
import Utils from './settings/utils.js';

global.Promise = promise;
global._ = _;

/**
 * System global setting
 * @type {Object}
 */
const SETTINGS = settings();

/**
 * Express object
 * @type {Object}
 */
const app = express();

/** initial putils */
const putils = new Utils(app);

/** set settings as global variable */
app.set('SETTINGS', SETTINGS);
/** set PUTILS as global function */
app.set('PUTILS', putils);
/** put winston as logger into LOGGER */
app.set('LOGGER', winston);
/** Database connction */
app.set('SQL', putils.sequelize());

/** Log setting */
putils.logger();

/** routing rule setting */
route(app);

app.listen(SETTINGS.port, SETTINGS.server, () => {
  console.log(`server is listen to ${SETTINGS.server} with port #${SETTINGS.port}`);
});
