/*
<div class="eduintgd-chat">
	<div className="header">
		<div className="title"></div>
		<div className="options"></div>
	</div>
	<div className="messages">
		<div className="chats"></div>
		<div className="write"></div>
	</div>
</div>
*/



var EduIntGD_WorkTogether = {
	_arBlockListOfUsers: [],
	createListOfUsers: function(infoJsonListOfUsers)
	{
		this.createFooterTooles();
		var newListOfUsers = new this.ListOfUsers(infoJsonListOfUsers);
		return this._arBlockListOfUsers[this._arBlockListOfUsers.length] = newListOfUsers;
	},
	_arChats: [],
	create: function(machineName, infoJSON)
	{
		if(this._arChats[machineName]===undefined)
		{
			this.createFooterTooles();
			var newChat = new this.Chat(machineName, infoJSON);
			return this._arChats[machineName] = newChat;
		}
		else
		{
			return this._arChats[machineName];
		}
	},
	createFooterTooles: function(){
		if(this.footer_tooles===undefined)
		{
			this.body = document.getElementsByTagName("BODY")[0];
				this.footer_tooles = document.createElement('section');
				this.footer_tooles.className = 'footer_tooles-chat';
				this.footer_tooles.style.position = 'fixed';
				this.footer_tooles.style.left = '0px';
				this.footer_tooles.style.bottom = '0px';
				this.footer_tooles.style.width = '100%';
				this.footer_tooles.style.height = '1px';
				this.footer_tooles.style.textAlign = 'right';
				this.body.appendChild(this.footer_tooles);
		}
	},
	ListOfUsers: function(infoJsonListOfUsers)
	{
		this.infoJsonListOfUsers=infoJsonListOfUsers;

		this.container = document.createElement('div');
		this.container.style.display = 'inline-block';
		this.container.style.height = '300px';
		this.container.style.marginTop = '-300px';
		this.container.className='eduintgd-listofusers';
			this.header = document.createElement('header');
			this.header.className='header';
			this.container.appendChild(this.header);
				this.title = document.createElement('div');
				this.title.className='title';
				this.title.innerHTML=infoJsonListOfUsers.title;
				this.header.appendChild(this.title);
				this.options = document.createElement('div');
				this.options.className='options';
				this.header.appendChild(this.options);
					this.close = document.createElement('div');
					this.close.className='close';
					this.close.innerHTML='X';
					this.options.appendChild(this.close);
					this.minimize = document.createElement('div');
					this.minimize.className='minimize';
					this.minimize.innerHTML='_';
					this.options.appendChild(this.minimize);
					this.moreoptions = document.createElement('div');
					this.moreoptions.className='moreoptions';
					this.moreoptions.innerHTML='+';
					this.options.appendChild(this.moreoptions);

			this.content = document.createElement('div');
			this.content.className='content';
			this.container.appendChild(this.content);
				this.messages = document.createElement('div');
				this.messages.className='messages';
				this.messages.style.overflow='auto';
				this.content.appendChild(this.messages);

		EduIntGD_WorkTogether.footer_tooles.appendChild(this.container);

		this.arUsers=[];
		this.accAddUsers = function(user)
		{
			var message = document.createElement('div');
			message.className = 'message';
			message.user = user;
			message.onclick=function(){
				EduIntGD_WorkTogether.create(this.user.uid,this.user);
			};
			this.arUsers[this.arUsers-length] = message;
			message.innerHTML = '<div class="photo"><img width="50" height="50" src="'+user.profilePhotoUrl+'" alt="Photo of '+user.name+' '+user.lastname+'" /></div><div class="message_text"><div class="name">'+user.name+':</div></div>';
			this.messages.appendChild(message);
		}
	},
	Chat: function(machineName, infoJSON)
	{
		this.machineName=machineName;
		this.infoJSON=infoJSON;

		this.container = document.createElement('div');
		this.container.style.display = 'inline-block';
		this.container.style.height = '300px';
		this.container.style.marginTop = '-300px';
		this.container.className='eduintgd-chat';
			this.header = document.createElement('header');
			this.header.className='header';
			this.container.appendChild(this.header);
				this.title = document.createElement('div');
				this.title.className='title';
				this.title.innerHTML='<div class="profilephoto"><img width="50" height="50" src="'+infoJSON.profilePhotoUrl+'" alt="Photo of '+infoJSON.name+' '+infoJSON.lastname+'" /></div><div class="profilepname">'+infoJSON.name+' '+infoJSON.lastname+'</div>';
				this.header.appendChild(this.title);
				this.options = document.createElement('div');
				this.options.className='options';
				this.header.appendChild(this.options);
					this.close = document.createElement('div');
					this.close.className='close';
					this.close.innerHTML='X';
					this.close.container=this.container;
					this.close.machineName=this.machineName;
					this.close.onclick = function()
					{
						this.container.style.display='none';
						this.container.parentNode.removeChild(this.container);
						EduIntGD_WorkTogether._arChats.splice(EduIntGD_WorkTogether._arChats[this.machineName],1);
					}
					this.options.appendChild(this.close);
					this.minimize = document.createElement('div');
					this.minimize.className='minimize';
					this.minimize.innerHTML='_';
					this.options.appendChild(this.minimize);
					this.moreoptions = document.createElement('div');
					this.moreoptions.className='moreoptions';
					this.moreoptions.innerHTML='+';
					this.options.appendChild(this.moreoptions);

			this.content = document.createElement('div');
			this.content.className='content';
			this.container.appendChild(this.content);
				this.messages = document.createElement('div');
				this.messages.className='messages';
				this.messages.style.overflow='auto';
				this.content.appendChild(this.messages);
				this.write = document.createElement('div');
				this.write.className='write';
				this.content.appendChild(this.write);
					this.input = document.createElement('textarea');
					this.input.className='input';
					this.write.appendChild(this.input);
					this.send = document.createElement('div');
					this.send.className='send';
					this.send.style.display='table';
					this.write.appendChild(this.send);
						this.sub_send = document.createElement('div');
						this.sub_send.className='sub-send';
						this.sub_send.innerHTML='>';
						this.sub_send.input = this.input;
						this.sub_send.style.display='table-cell';
						this.sub_send.style.verticalAlign='middle';
						this.sub_send.style.textAlign='center';
						this.sub_send.onclick=function(){
							if(this.input.value!=='')
							{
								firebase.database().ref('chat/'+user.username+'/jdgp77').push({ username: user.username, valor: this.input.value });
								this.input.value='';
							}
						};
						this.send.appendChild(this.sub_send);

		EduIntGD_WorkTogether.footer_tooles.appendChild(this.container);

		this.arMessages=[];
		this.accAddMessage = function(value,infoJson)
		{
			var message = document.createElement('div');
			message.className = 'message '+(infoJson.bnOther?'other':'mine');
			this.arMessages[this.arMessages-length] = message;
			if(infoJson.bnOther)
			{
				message.innerHTML = '<div class="photo"><img src="" alt="" /></div><div class="message_text"><div class="name">'+infoJson.name+':</div><div class="message-sent">'+value+'</div></div>';
			}
			else
			{
				message.innerHTML = '<div class="message_text"><div class="name">'+infoJson.name+':</div><div class="message-sent">'+value+'</div></div>';
			}
			this.messages.appendChild(message);
			this.messages.scrollTop=9999;
		}
	}
};

user = {
	uid: 1,
	username: 'Julian Guerrero',
};

var starCountRef = firebase.database().ref('chat/'+user.username+'/jdgp77');
starCountRef.on('child_added', function(snapshot) {
  Chat = EduIntGD_WorkTogether._arChats["Chat con Julian Guerrero"]
  Chat.accAddMessage(snapshot.val().valor,{ bnOther: (snapshot.username===user.username?true:false), name: snapshot.val().username });
});