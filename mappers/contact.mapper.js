module.exports = (data) => ({
  id: data.id,
  title: data.title,
  phone: data.phone,
  createdat: data.createdat,
  updatedat: data.updatedat,
  products: data.products || '',
  contract: !!data.contract,
  payment: data.payment || '',
  site: data.site || '',
  email: data.email || '',
  name: data.name || '',
  info: data.info || '',
});
