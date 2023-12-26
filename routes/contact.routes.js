const Router = require('koa-router');
const { koaBody } = require('koa-body');

const validator = require('../middleware/validators/contact.params.validator');
const accessCheck = require('../middleware/access.check');
const controller = require('../controllers/contact.controller');

const router = new Router({ prefix: '/api/contact' });

// router.use(accessCheck);
router.get('/:id', validator.id, controller.get);
router.get('/', controller.getAll);
router.post('/', accessCheck, koaBody({ multipart: true }), validator.title, controller.add);
router.patch('/:id', accessCheck, koaBody({ multipart: true }), validator.id, validator.title, controller.update);
router.delete('/:id', accessCheck, validator.id, controller.delete);

module.exports = router.routes();
