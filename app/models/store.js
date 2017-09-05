var mongoose = require('mongoose')
var StoreSchema = require('../schemas/store.js')
var Store = mongoose.model('Store', StoreSchema)

module.exports = Store
