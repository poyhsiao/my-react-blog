/**
 *
 * The real entrance of the app with es2017
 *
 * Author: Kim Hsiao
 *
 */
import express from 'express';

import settings from './config/global.js';

const SETTINGS = settings();
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!!');
});

app.listen(SETTINGS.port, () => {
  console.log(`server is listen to port #${SETTINGS.port}`);
});
