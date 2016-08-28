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
import * as putils from './settings/utils.js';

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

/** set settings as global variable */
app.set('SETTINGS', SETTINGS);
/** set PUTILS as global function */
app.set('PUTILS', putils);

/** Database connction */
app.set('SQL', putils.sequelize(app));

/** Log setting */
putils.logger(app, SETTINGS);
/** routing rule setting */
route(app);

app.listen(SETTINGS.port, SETTINGS.server, () => {
  console.log(`server is listen to ${SETTINGS.server} with port #${SETTINGS.port}`);
  console.log(app.get('SQL'));
});
