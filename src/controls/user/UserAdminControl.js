/**
 *
 * User register
 *
 * Author: Kim Hsiao
 *
 */
import md5 from 'md5';
import _ from 'lodash';

import UserAdminModel from './../../model/UserAdminModel.js';

export default class {

  /**
   * newer - Add a new user (/user/admin) (POST)
   *
   * @param  {Object} req  express http request object
   * @param  {Object} res  express http response object
   * @param  {Function} next express route callback function
   * @return {void}      no return required but callback function
   */
  newer(req, res, next) {
    const app = req.app;
    const userAdminModel = new UserAdminModel(app);
    const User = userAdminModel.admin();
    const sql = app.get('SQL');

    const {
      user_name: userName,
      display_name: displayName,
      email,
      gender,
      enabled,
      password,
      ...payload,
    } = req.body;

    const pwd = md5(userName & password);

    return sql.transaction(t => {
      return User.findOrCreate({
        where: {
          $or: [
            { user_name: userName },
            { display_name: displayName },
            { email },
          ],
        },
        defaults: {
          user_name: userName,
          display_name: displayName,
          email,
          gender,
          enabled,
          password: pwd,
        },
        transaction: t,
      });
    })
    .spread((result, newer) => {
      const { id } = result.dataValues;
      /** check if the user create new one */
      if (true === newer) {
        res.json({
          status: 'new',
          body: {
            id,
            user_name: userName,
            display_name: displayName,
            email,
            gender,
            enabled,
            password,
            payload,
          },
        });
      } else {
        res.json({
          status: 'exists',
          body: {
            id,
            user_name: userName,
            display_name: displayName,
            email,
            gender,
            enabled,
            password: pwd,
            payload,
          },
        });
      }
    })
    .asCallback(next)
    .catch(err => {
      console.error({ err });
      return res.json({
        status: 'error',
        msg: err,
      });
    });
  }

  /**
   * modifier - Modify user data (/user/admin) (put)
   *
   * @param  {Object} req  express http request object
   * @param  {Object} res  express http response object
   * @param  {Function} next express route callback function
   * @return {void}      no return required but callback function
   */
  modifier(req, res, next) {
    const app = req.app;
    const userAdminModel = new UserAdminModel(app);
    const User = userAdminModel.admin();
    const sql = app.get('SQL');

    const {
      id,
      ...payload,
    } = req.body;

    User
      .findById(id)
      .then(result => {
        /** Not valid user id */
        if (_.isNull(result)) {
          res.json({
            status: 'modifier',
            msg: 'NO_VALID_USER',
          });

          return next();
        }

        return _.pick(result, Object.keys(payload));
      })
      /** NEED TO MODIFY */
      .then(data => {
        return sql.transaction(t => {
          User.update({
            data,
          }, {
            where: {
              id,
            },
            transaction: t,
          });
        });
      })
      /** */
      .then(result => {
        console.info({ result });
      })
      .catch(err => {
        console.error({ err });
      })
      .asCallback(next);

    // return next();
  }


  /**
   * deleter - Delete user according to user id (/user/admin) (delete)
   *
   * @param  {Object} req  express http request object
   * @param  {Object} res  express http response object
   * @param  {Function} next express route callback function
   * @return {void}      no return required but callback function
   */
  deleter(req, res, next) {
    res.json({
      status: 'deleter',
    });

    return next();
  }

  /**
   * query - Query all user info (/user/admin) (get)
   *
   * @param  {Object} req  express http request object
   * @param  {Object} res  express http response object
   * @param  {Function} next express route callback function
   * @return {void}      no return required but callback function
   */
  query(req, res, next) {
    const app = req.app;
    const userAdminModel = new UserAdminModel(app);
    const User = userAdminModel.admin();
    User.findAll()
      .then(users => {
        res.json({
          status: 'ok',
          method: 'query',
          users,
        });
      })
      .catch(err => {
        console.error(err);
      })
      .asCallback(next);
  }
}
