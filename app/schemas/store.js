var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var StoreSchema = new Schema({
  code: String,
  name: String,
  movies: [{type:ObjectId, ref:'Movie'}],
  meta: {
    createAt:{
      type: Date,
      default: Date.now()
    },
    updateAt:{
      type: Date,
      default: Date.now()
    }
  }
})

StoreSchema.pre('save',function(next) {
  if(this.isNew){
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }
  next()
})

StoreSchema.statics = {
  fetch: function(cb) {
    return this
    .find({})
    .sort('meta.updateAt')
    .exec(cb)
  },
  findById: function(id, cb) {
    return this
    .findOne({_id: id})
    .sort('meta.updateAt')
    .exec(cb)
  }
}

module.exports = StoreSchema
