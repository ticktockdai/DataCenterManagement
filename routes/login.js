var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models/User');


/* GET login page. */


module.exports.requireAuthentication = function(req,res,next){
  if(req.path == '/login'){
    next();
    return;
  }
  if(req.cookies!=undefined){
    if(req.cookies["userName"]!=undefined){
      next();
      return;
  }
  }
  

  res.redirect('/login');
  
};

module.exports.form = function(req,res){  
  var fileName = path.join(__dirname,'../views/login.html');
  res.sendFile(fileName);
};



module.exports.submit = function(req,res,next){
  var data = req.body;
  console.log(data.uId);
  User.findOne({where:{uId:data.uId}}).then(user=>{
    console.log(JSON.stringify(user));
    if(user.upassword == data.upassword){
      res.cookie('userName', user.uname);
      console.log('Loing in successfully');
      //res.render('welcome',{title:"Tony"}); 
      //res.render(path.join(__dirname,'../views/welcome'),{title:user.uname});
      res.redirect('/welcome');
    }
    else{
      res.redirect('/reject');
      console.log('Loing in failed');
    }
  });
};
