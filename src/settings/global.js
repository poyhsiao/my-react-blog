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
      controls: pjoin(proot, 'src', 'controls'),
    },
    token: {
      algorithm: 'HS512',  // default is HS256
      secret: 'helloAlliamkimhsiao',
      expiresIn: '1d',  // 2 days
    },
    db: {
      sqluser: 'kimhsiao',
      sqlpassword: 'hsia0@123',
      sqldatabase: 'my_react_blog',
      sql: {
        host: '172.16.58.130',
        dialect: 'mariadb',
        pool: {
          max: 10,
          min: 0,
          idle: 10000,
        },
        define: {
          underscored: false,
          freezeTableName: false,
          syncOnAssociation: true,
          charset: 'utf8mb4',
          collate: 'utf8mb4_unicode_ci',
        },
        // storage: pjoin(proot, 'storage', 'database.sqlite'),
      },
    },
    mydb: {
      user: 'kimhsiao',
      password: 'hsia0@123',
      portocol: 'mysql',
      port: 3306,
      database: 'my_react_blog',
      query: {
        pool: true,
        debug: false,
        timezone: 'local',
        strdates: false,
      },
    },
  };

  return conf;
};
