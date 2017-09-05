var Movie = require('../models/movie.js')
var Store = require('../models/store.js')

//index page
exports.index = function(req, res) {
    console.log('user in session: ')
    console.log(req.session.user)

    Store
      .find({})
      .populate({path: 'movies', options:{limit:5}})
      .exec(function(err, stores){
        if(err){
          console.log(err)
        }
      res.render('index',{
        title:'Customers list',
        stores:stores
      })
    })
}
