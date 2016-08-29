/**
 *
 * User register
 *
 * Author: Kim Hsiao
 *
 */
import UserAdminModel from './../../model/user.js';

export default class {
  constructor(app) {
    this.app = app;
  }

  newer(req, res, next) {
    res.json({
      status: 'newer',
    });

    return next();
  }

  modifier(req, res, next) {
    res.json({
      status: 'modifier',
    });

    return next();
  }

  deleter(req, res, next) {
    res.json({
      status: 'deleter',
    });

    return next();
  }

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

        return next || true;
      })
      .catch(err => {
        console.error(err);
      })
      .asCallback(next);
  }
}
