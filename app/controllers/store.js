var Store = require('../models/store.js')
var _ = require('underscore')

//admin new page
exports.new = function(req, res) {
  res.render('store_admin',{
    title:'store admin',
    store:{}
  })
}
//admin post Customers info
exports.save = function(req, res){
  
  console.log(req.body.store)
  var _store = req.body.store
  var store = new Store(_store)

   store.save(function(err, store){
     if(err){
       console.log(err)
     }
     res.redirect('/admin/store/list')
   })
}

//store list
exports.list = function(req, res) {

    Store.fetch(function(err, stores){
      if(err){
        console.log(err)
     }
      res.render('store_list',{
        title:'Customers list',
        stores: stores
      })
    })
}
exports.del = function(req,res){
  var id = req.query.id

  if(id){
    Store.remove({_id:id},function(err, movie){
      if(err){
        console.log(err)
        res.json({success:0})
      }
      else{
        res.json({success:1})
      }
    })
  }
}
