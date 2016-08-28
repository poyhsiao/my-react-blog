/**
 *
 * User register
 *
 * Author: Kim Hsiao
 *
 */

export default class {
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
    res.json({
      status: 'query',
    });

    return next();
  }
}
