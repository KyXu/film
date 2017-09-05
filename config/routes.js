var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')
var Movie = require('../app/controllers/movie')
var Comment = require('../app/controllers/comment')
var Store = require('../app/controllers/store')
module.exports = function(app){

    //pre handle user
    app.use(function(req, res, next){
      var _user= req.session.user
      app.locals.user = _user
      next()
  })

    //index page
    app.get('/', Index.index)

    // User
    app.post('/user/signup', User.signup)
    app.post('/user/signin', User.signin)
    app.get('/signin', User.showSignin)
    app.get('/signup', User.showSignup)
    app.get('/logout', User.logout)
    app.get('/admin/userlist', User.signinRequired, User.adminRequired,User.list)

    //Product
    app.get('/movie/:id',Movie.detail)
    app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new)
    app.get('/admin/update/:id', User.signinRequired, User.adminRequired, Movie.update)
    app.post('/admin/movie', User.signinRequired, User.adminRequired, Movie.save)
    app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list)
    app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.del)

    //Comment
    app.post('/user/comment', User.signinRequired, Comment.save)

    //Store
    app.get('/admin/store/new', User.signinRequired, User.adminRequired, Store.new)
    app.post('/admin/store', User.signinRequired, User.adminRequired, Store.save)
    app.get('/admin/store/list', User.signinRequired, User.adminRequired, Store.list)


}
