const db = require('../libs/db');
const mapper = require('../mappers/contact.mapper');

module.exports.get = async (ctx) => {
  const contact = await _getContact(ctx.params.id);
  if (!contact) {
    ctx.throw(404, 'contact not found');
  }
  ctx.status = 200;
  ctx.body = mapper(contact);
};

module.exports.getAll = async (ctx) => {
  const contacts = ctx.query?.search
    ? await _getSearchContacts(ctx.query?.search)
    : await _getAllContacts();
  ctx.status = 200;
  ctx.body = contacts.map((contact) => mapper(contact));
};

module.exports.add = async (ctx) => {
  const contact = await _addContact(ctx.request.body);
  ctx.status = 201;
  ctx.body = mapper(contact);
};

module.exports.update = async (ctx) => {
  const contact = await _updateContact(ctx.params.id, ctx.request.body);
  if (!contact) {
    ctx.throw(404, 'contact not found');
  }
  ctx.status = 200;
  ctx.body = mapper(contact);
};

module.exports.delete = async (ctx) => {
  const contact = await _deleteContact(ctx.params.id);
  if (!contact) {
    ctx.throw(404, 'contact not found');
  }
  ctx.status = 200;
  ctx.body = mapper(contact);
};

async function _getContact(id) {
  return db.query('SELECT * FROM contacts WHERE id=$1', [id])
    .then((res) => res.rows[0]);
}

async function _getAllContacts() {
  return db.query('SELECT * FROM contacts')
    .then((res) => res.rows);
}

async function _getSearchContacts(search) {
  return db.query(`SELECT * FROM contacts 
    WHERE 
      LOWER(title) LIKE '%' || $1 || '%'
      OR LOWER(products) LIKE '%' || $1 || '%'
      OR LOWER(name) LIKE '%' || $1 || '%'
      OR LOWER(info) LIKE '%' || $1 || '%'
  `, [search.toLowerCase()])
    .then((res) => res.rows);
}

async function _addContact(data) {
  return db.query(`INSERT INTO contacts 
    (title, products, contract, payment, site, email, name, info, phone) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
    RETURNING *
    `, [
    data.title,
    data.products,
    data.contract,
    data.payment,
    data.site,
    data.email,
    data.name,
    data.info,
    data.phone,
  ])
    .then((res) => res.rows[0]);
}

async function _updateContact(id, data) {
  return db.query(`UPDATE contacts 
    SET
      title=$2,
      products=$3,
      contract=$4,
      payment=$5,
      site=$6,
      email=$7,
      name=$8,
      info=$9,
      phone=$10
    WHERE id=$1
    RETURNING *
    `, [
    id,
    data.title,
    data.products,
    data.contract,
    data.payment,
    data.site,
    data.email,
    data.name,
    data.info,
    data.phone,
  ])
    .then((res) => res.rows[0]);
}

async function _deleteContact(id) {
  return db.query(`DELETE FROM contacts 
    WHERE id=$1
    RETURNING *
    `, [id])
    .then((res) => res.rows[0]);
}
