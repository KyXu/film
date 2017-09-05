var mongoose = require('mongoose')
var BPSchema = require('../schemas/BP.js')
var BP = mongoose.model('BP', BPSchema)

module.exports = BP
