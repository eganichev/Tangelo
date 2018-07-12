import express from 'express';
const router = express.Router();
import renderer from '../helpers/renderer';

/* GET home page. */
router.get('*', (req, res, next) => {
    const context = {};
    const content = renderer(req, context);

    if (context.url) {
      return res.redirect(301, context.url);
    }
    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
});

module.exports = router;
