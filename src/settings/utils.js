/**
 *
 * Relative utilities for express or service
 *
 * Author: Kim Hsiao
 *
 */

import morgan from 'morgan';
import * as FileStreamRotator from 'file-stream-rotator';
import { join as pjoin } from 'path';

export const logger = (app, settings) => {
  const accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYY-MM-DD',
    filename: pjoin(settings.path.log, 'access_%DATE%.log'),
    frequency: 'daily',
    verbose: false,
  });

  app.use(morgan('combined', { stream: accessLogStream }));
};

export default {};
