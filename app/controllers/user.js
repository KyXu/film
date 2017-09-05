var User = require('../models/user.js')

//sign up
//userlist
exports.showSignup = function(req, res) {

    res.render('signup',{
      title:'Sign Up Page'
  })
}
exports.showSignin = function(req, res) {

    res.render('signin',{
      title:'Sign In Page'
  })
}

exports.signup = function(req,res){
  var _user = req.body.user
  User.findOne({name:_user.name}, function(err,user){
    if(err){
      console.log(err)
    }
    if(user){
      console.log('User exists!')
      return res.redirect('/signin')
    }

    else {
      var user = new User(_user)
      user.save(function(err,user){
        if(err){
            console.log(err)
        }
      res.redirect('/')
     })
     }
  })
}
//user sign in
exports.signin = function(req,res){
  var _user = req.body.user
  var name = _user.name
  var password = _user.password

  User.findOne({name:name}, function(err, user){
    if(err){
      console.log(err)
    }
    if(!user){
      console.log('User does not exist!')
      return res.redirect('/signup')
    }

    user.comparePassword(password, function(err, isMatch){
      if(err){
        console.log(err)
      }
      if(isMatch){
        console.log('Password is matched')
        req.session.user = user
        return res.redirect('/')
      }
      else{
        console.log('Password is not matched')
        return res.redirect('/signin')
      }
    })
  })
}
//logout
exports.logout = function(req,res) {
  delete req.session.user
  //delete app.locals.user
  res.redirect('/')
}

//userlist
exports.list = function(req, res) {

    User.fetch(function(err, users){
      if(err){
        console.log(err)
     }
      res.render('userlist',{
        title:'user list',
        users:users
      })
    })
}
//midware for user
exports.signinRequired = function(req, res, next) {
    var user = req.session.user

    if(!user) {
      return res.redirect('/signin')
    }
    next()
}
exports.adminRequired = function(req, res, next) {
    var user = req.session.user
    console.log(req.session.user)
    if(user.role <= 10) {
      return res.redirect('/signin')
    }
    next()
}
