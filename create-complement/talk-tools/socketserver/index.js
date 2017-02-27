var io = require('socket.io').listen(3000);
var admin = require("firebase-admin");
var app_users = {};

io.sockets.on('connection', function(socket){
  console.log('conectado');
  socket.on('user', function(user){
  	app_users[user.socketid]=user;
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});