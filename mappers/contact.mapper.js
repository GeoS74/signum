module.exports = (data) => ({
  id: data.id,
  title: data.title,
  phone: data.phone,
  createdAt: data.createdat,
  updatedAt: data.updatedat,
  products: data.products || '',
  contract: !!data.contract,
  payment: data.payment || '',
  site: data.site || '',
  email: data.email || '',
  name: data.name || '',
  info: data.info || '',
});
