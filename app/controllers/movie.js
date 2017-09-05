var Movie = require('../models/movie.js')
var Comment = require('../models/comment.js')
var Store = require('../models/store.js')
var _ = require('underscore')

//detail page
exports.detail = function(req, res){
  var id = req.params['id']
  //const movieId = req.params.id
    Movie.update({_id: id}, {$inc: {pv: 1}}, function(err) {
      if (err) {
        console.log(err)
      }
    })

    Movie.findById(id, function(err, movie){
      Comment
       .find({movie:id})
       .populate('from','name')
       .populate('reply.from reply.to','name')
       .exec(function(err,comments){
        console.log(comments)
        res.render('detail',{
          title:movie.title + '  tracking detail page  ',
          movie: movie,
          comments:comments
        })
    })
  })
}

exports.new = function(req, res) {
  Store.find({}, function(err,stores){
    res.render('admin',{
      title:'admin page',
      stores:stores,
      movie:{}
    })
  })
}

exports.update = function(req, res){
  var id = req.params.id

  if(id){
    Movie.findById(id, function(err, movie){
      Store.find({}, function(err,stores){
        res.render('admin',{
          title:'Admin update page',
          movie: movie,
          stores:stores
        })
      })
    })
  }
}
exports.save = function(req, res){
  var id = req.body.movie._id
  var movieObj = req.body.movie
  var _movie

  if (id){
    Movie.findById(id, function(err, movie){
      if(err){
        console.log(err)
      }

      _movie = _.extend(movie, movieObj)
      _movie.save(function(err, movie){
        if(err){
          console.log(err)
        }
        res.redirect('/movie/' + movie._id)
      })
    })
  }
  else{
    _movie = new Movie(movieObj)

    var storeId = movieObj.store

    _movie.save(function(err, movie){
      if(err){
        console.log(err)
      }
      if(storeId){
        Store.findById(storeId, function(err, store){
          store.movies.push(movie._id)

          store.save(function(err, store){
                  res.redirect('/movie/' + movie._id)
          })
        })
      }
    })
  }
}

exports.list = function(req, res) {
  Movie.fetch(function(err, movies){
    if(err){
      console.log(err)
   }
    res.render('list',{
      title:'list',
      movies:movies
    })
  })
}
exports.del = function(req,res){
  var id = req.query.id

  if(id){
    Movie.remove({_id:id},function(err, movie){
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
