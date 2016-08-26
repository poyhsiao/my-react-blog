/**
 *
 * The real entrance of the app with es2017
 *
 * Author: Kim Hsiao
 *
 */
import express from 'express';

import settings from './config/global.js';
import route from './config/route.js';

const SETTINGS = settings();
const app = express();

route(app);

app.listen(SETTINGS.port, () => {
  console.log(`server is listen to port #${SETTINGS.port}`);
  console.log({ route });
});
