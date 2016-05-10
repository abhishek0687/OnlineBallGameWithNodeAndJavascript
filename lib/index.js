module.exports= function(io){
	//var io = require('socket.io').listen(server);
	io.on('connection',function(socket){
		console.log('connected to socket');	
		socket.on('msg', function(data){
			var mes = data.msg;
			console.log('connected to socket inside message: '+mes);	
			socket.emit('new msg',{data:mes});	
		});
		socket.on('IpAddr',function(data){
			console.log('connected to socket inside message');	
			console.log(data.Ip);
		})

	})
}


/*
module.exports= function(server,app){
	var io = require('socket.io').listen(server,{log:false});//need to search for what is log here
	io.on('connection',function(socket){
		
		socket.on('msg', function(data){
			var mes = data.msg;
			io.sockets.emit('new msg,{data:mes});	
		});

	})
}*/
