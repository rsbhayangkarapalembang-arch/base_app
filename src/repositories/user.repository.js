const prisma = require('../config/prisma');

const create = (data) => prisma.user.create({ data });
const findByEmail = (email) => prisma.user.findUnique({ where: { email } });
const findById = (id) => prisma.user.findUnique({ where: { id } });
const findAll = () => prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
const updateById = (id, data) => prisma.user.update({ where: { id }, data });
const deleteById = (id) => prisma.user.delete({ where: { id } });

module.exports = {
  create,
  findByEmail,
  findById,
  findAll,
  updateById,
  deleteById,
};
