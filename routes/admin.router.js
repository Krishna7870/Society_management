const AdminBro = require('admin-bro');
const AdminBroExpress = require('admin-bro-expressjs');
const mongoose = require('mongoose');
const members = require('../models/members');
const carpenters = require('../models/carpenter');
const barbers = require('../models/barber');
const notification = require('../models/notification');
const AdminBroMongoose = require('admin-bro-mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
})

const router = AdminBroExpress.buildRouter(adminBro);
module.exports=router;