io = require('socket.io').listen(3000);
admin = require("firebase-admin");
app_users = {};
arSocketIdByUserCode = {};

usersDataTemp = [];
usersDataTemp['gerencia@educacioninteractiva.com.co'] = { friends: ['jdgp77@gmail.com','jdgp17@gmail.com'] };
usersDataTemp['jdgp77@gmail.com'] = { friends: ['gerencia@educacioninteractiva.com.co','jdgp17@gmail.com'] };

MiAyudante = {
    //  Une dos diferentes json para añadir las opciones por defecto
    //  { nombre: 'juan', instituto: 'ssa' } <= defaultOptions({ nombre: 'juan' },{ nombre: '', instituto: 'ssa' })
    defaultJson: function(newJson,defaultJson)
    {
        //  Si no efxisten nuevos datos retorna el defaultJson
        if(newJson===undefined) { return defaultJson; }
        for(keyDefaultJson in defaultJson) { if(newJson[keyDefaultJson]===undefined) { newJson[keyDefaultJson] = defaultJson[keyDefaultJson]; } }
        return newJson;
    },
    userDefaultData: {
    	name: 'undefined',
    	photoUrl: 'paco.png'
    },
    arUsers: [],
    u: function(email){
    	if(MiAyudante.arUsers[email]===undefined)
    	{
    		var user = new MiAyudante.User();
    		MiAyudante.arUsers[email] = user;
    		return user;
    	}
    	else
    	{
        return MiAyudante.arUsers[email];
      }
    },
    User: function(data)
    {
  		//	Retorna la información de un usuario con el email
  		this.getData = function()
  		{
  			return { 
            socketid: this.socketid,
      			email: this.email,
      			name: this.name,
      			photoUrl: this.photoUrl
      		};
  		};
      this.getId = function(){
        return this.socketid;
      };
  		this.setData = function(data)
  		{
  	    	data = MiAyudante.defaultJson(data,MiAyudante.userDefaultData);
  	    	data = MiAyudante.defaultJson(data,{ email: this.email, name: this.name, photoUrl: this.photoUrl });
  	    	//	Asigna los valores de usuario
          this.socketid=data.socketid;
  	    	this.email=data.email;
  	    	this.name=data.name;
  	    	this.photoUrl=data.photoUrl;

  		}; this.setData(data);
  		this.getArAmigosInDomine = function(email,domine)
  		{
  			return usersDataTemp[email].friends;
  		};
  		this.qstnThisUserCanTalkWithThisFriend = function(email)
  		{
  			var bnIsFriend = false;
  			for(var countFriends=0;countFriends<usersDataTemp[this.email].friends.length;countFriends++)
  			{
  				if(usersDataTemp[this.email].friends[countFriends]==email)
  				{
  					bnIsFriend=true;
  					return bnIsFriend;
  				}
  			}
  			return bnIsFriend;
  		};
      this.emit = function(name,value)
      {
        io.sockets.sockets[this.socketid].emit(name,value);
      };
      this.sendToChat = function(email, value)
      {
        MiAyudante.u(email).emit('sendChatMessage',{  });
      };
    },
    arChats: [],
    c: function(code)
    {
      if(arChats[code]===undefined)
      {
        var chat = new this.Chat(code);
        this.arChats[code] = chat;
        return chat;
      }
      else
      {
        return this.arChats[code];
      }
    },
    Chat: function(code){

    },  
};
u=MiAyudante.u.bind(MiAyudante);

io.sockets.on('connection', function(socket){
  console.log('conectado');
  console.log(socket.id);
  socket.on('conect_user', function(user){
    console.info('conect_user');
  	u(user.email).setData(user);
  	u(user.email).socketid=user.socketid;
  });
  socket.on('newChat', function(name){
    console.info('Name Chat: '+name)
  });


  //socket.emit('getMyFriends')

  socket.on('disconnect', function(){
    console.log('disconnected');
    delete app_users[socket.store.id];
  });
});