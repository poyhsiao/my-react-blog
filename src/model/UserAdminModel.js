/**
 *
 * User model
 *
 * Author: Kim Hsiao
 *
 */

import Sequelize from 'sequelize';

export default class {
  constructor(app) {
    this.app = app;
    this.sequelize = app.get('SQL');
  }

  admin() {
    const User = this.sequelize.define('user', {
      /** user name */
      user_name: {
        type: Sequelize.STRING,
        allowNull: false,
        // unique: true,
        validate: {
          len: {
            args: [3, 100],
            msg: 'ERR_USER_NAME_LENGTH',
          },
        },
      },

      /** login name */
      display_name: {
        type: Sequelize.STRING,
        allowNull: false,
        // unique: 'user_unique',
        validate: {
          len: {
            args: [3, 100],
            msg: 'ERR_DISPLAY_NAME_LENGTH',
          },
        },
      },

      /** user email */
      email: {
        type: Sequelize.STRING,
        // unique: 'user_unique',
        allowNull: false,
        validate: {
          isEmail: {
            msg: 'ERR_INVALID_EMAIL',
          },
        },
      },

      /** gender */
      gender: {
        type: Sequelize.ENUM,
        values: ['female', 'male', 'other'],
        defaultValue: 'male',
        allowNull: false,
        validate: {
          isIn: {
            args: [['female', 'male', 'other']],
            msg: 'ERR_GENDER_TYPE',
          },
        },
      },

      /** if the user is enabled */
      enabled: {
        type: Sequelize.ENUM,
        values: ['true', 'false'],
        defaultValue: 'false',
        allowNull: false,
        validate: {
          isIn: {
            args: [['true', 'false']],
            msg: 'ERR_ENABLED_TYPE',
          },
        },
      },

      /** password of the user (md5 with username/password) */
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [32],
            msg: 'ERR_PASSWORD_LENGTH',
          },
        },
      },
    }, {
      indexes: [
        {
          name: 'user_admin_user_name',
          where: {
            status: 'public',
          },
          fields: [
            'user_name',
            'display_name',
            'email',
            'gender',
            'enabled',
          ],
        },
      ],
    });

    return User;
  }
}
