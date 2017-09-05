var Movie = require('../models/movie.js')
var BP = require('../models/BP.js')
var mongoXlsx = require('mongo-xlsx')
/* Read xlsx file without a model */
/* The library will use the first row the key */


//index page
exports.index = function(req, res) {
    console.log('user in session: ')
    console.log(req.session.user)
    var model = null
    var xlsx  = 'BP.xlsx'
    mongoXlsx.xlsx2MongoData(xlsx, model, function(err, bps) {
      console.log(bps)
      res.render('index',{
        title:'Customers list',
        bps:bps
      })
    })


/*    BP.fetch(function(err, bps){
      if(err){
        console.log(err)
     }
     res.render('index',{
       title:'Customers list',
       bps:bps
     })

   })*/
}
