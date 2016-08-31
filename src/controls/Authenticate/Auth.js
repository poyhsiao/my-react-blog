/**
 *
 * Authentication handler
 *
 * Author: Kim Hsiao
 */

import _ from 'lodash';
import md5 from 'md5';
import * as jwt from 'jsonwebtoken';

import UserAdminModel from './../../model/UserAdminModel.js';

export default class {

  /**
   * signIn - sign into service and get token
   *
   * @param  {Object} req  express http request object
   * @param  {Object} res  express http response object
   * @param  {Function} next express route callback function
   * @return {void}      no return required but callback function
   */
  signIn(req, res, next) {
    const app = req.app;
    const SETTINGS = app.get('SETTINGS');
    const { algorithm, secret, expiresIn } = SETTINGS.token;

    const userAdminModel = new UserAdminModel(app);
    const User = userAdminModel.admin();

    const { user_name: userName, password, ...payload } = req.body;
    const pwd = md5(userName && password);

    User.findOne({
      where: {
        user_name: userName,
        password: pwd,
      },
    }).then((user) => {
      /** no valid user */
      if (_.isEmpty(user)) {
        throw new Error({ error: 'NO_VALID_USER' });
      }

      const userInfo = user.dataValues;
      const token = jwt.sign(userInfo, secret, { expiresIn, algorithm });

      return res.json({
        status: 'OK',
        msg: `${userName} is logged in`,
        token,
        body: {
          user_name: userName,
          payload,
        },
      });
    }).catch(error => {
      res.json({
        status: 'ERROR',
        msg: 'NO_VALID_USER',
        error,
      });
    }).asCallback(next);
  }


  /**
   * verify - Verify user token (jwt)
   *
   * @param  {Object} req  express http request object
   * @param  {Object} res  express http response object
   * @param  {Function} next express route callback function
   * @return {void}      no return required but callback function
   */
  verify(req, res, next) {
    const app = req.app;
    const SETTINGS = app.get('SETTINGS');
    const { algorithm, secret } = SETTINGS.token;
    const token = req.query.token || req.body.token || req.headers['x-access-token'];

    jwt.verify(token, secret, { algorithms: algorithm }, (error, decoded) => {
      /** not valid token */
      if (error) {
        return res.json({
          status: 'FAIL',
          msg: 'NOT_VALID_USER_AUTH',
          error,
        });
      }

      /** the token is valid */
      res.json({
        status: 'OK',
        msg: 'LOGIN_SUCCESS',
        info: decoded,
      });

      return next();
    });
  }
}
