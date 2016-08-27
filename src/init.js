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
import { logger } from './settings/utils.js';

const SETTINGS = settings();
const app = express();

logger(app, SETTINGS);
route(app);

app.listen(SETTINGS.port, () => {
  console.log(`server is listen to port #${SETTINGS.port}`);
  console.log({ route });
});
