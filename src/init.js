/**
 *
 * The real entrance of the app with es2017
 *
 * Author: Kim Hsiao
 *
 */
import express from 'express';

import settings from './settings/global.js';
import route from './settings/route.js';
import { logger, sequelize, initialModel } from './settings/utils.js';

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

/** Database connction */
app.set('SQL', sequelize(app));
/** initial all model */
initialModel(app);

/** Log setting */
logger(app, SETTINGS);
/** routing rule setting */
route(app);

app.listen(SETTINGS.port, SETTINGS.server, () => {
  console.log(`server is listen to ${SETTINGS.server} with port #${SETTINGS.port}`);
  console.log(app.get('SQL'));
});
