/**
 *
 * Global settings
 *
 * Author: Kim Hsiao
 */

import { join as pjoin } from 'path';

export default () => {
  const proot = pjoin(__dirname, '..', '..');

  const conf = {
    server: '0.0.0.0',
    port: 30001,
    path: {
      root: proot,
      src: pjoin(proot, 'src'),
      log: pjoin(proot, 'log'),
      model: pjoin(proot, 'src', 'model'),
    },
    db: {
      sqluser: '',
      sqlpassword: '',
      sqldatabase: '',
      sql: {
        dialect: 'sqlite',
        pool: {
          max: 10,
          min: 0,
          idle: 10000,
        },
        storage: pjoin(proot, 'storage', 'database.sqlite'),
      },
    },
  };

  return conf;
};
