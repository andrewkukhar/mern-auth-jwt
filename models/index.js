const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.events = require("./event.model")(mongoose);

db.ROLES = [
    "user",
    "admin"
];

module.exports = db;