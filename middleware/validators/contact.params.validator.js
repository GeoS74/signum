const { validate: uuidValidate } = require('uuid');

module.exports.id = async (ctx, next) => {
  if (!_uuidValidate(ctx.params.id)) {
    ctx.throw(400, 'invalid id');
  }
  await next();
};

module.exports.title = async (ctx, next) => {
  if (!_checkTitle(ctx.request.body?.title)) {
    ctx.throw(400, 'invalid title');
  }
  await next();
};

function _uuidValidate(id) {
  return uuidValidate(id);
}

function _checkTitle(title) {
  return title && (title.length > 3);
}
