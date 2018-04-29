// app.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app); 
var port =  process.env.port || 4200;
var boolAnimationRunning = false;

app.use(express.static(__dirname + '/node_modules'));  
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});
app.get('/control', function(req, res,next) {  
    res.sendFile(__dirname + '/control/controler.html');
});
	
server = app.listen(port, function () {
  var addr = server.address();
  console.log('   app listening on http://' + addr.address + ':' + addr.port);
});  
var io = require('socket.io')(server);

io.on('connection', function(client) {  
	client.on('join', function(data) {
			console.log(data);
			io.emit('message', 'Hello from the Server');
		});
	client.on('controller', function(data) {
			switch (data) {
				default:
					console.log('Unknown command from controller');
				case 'start':
					console.log('Start from controller');
					io.emit('command', 'start');
					break;
				case 'stop':
					console.log('Stop from controller');
					io.emit('command', 'stop');		
					break;
				case 'torchon':
					io.emit('command', 'torchon');
					break;
				case 'torchoff':
					io.emit('command', 'torchoff');		
					break;
			}
		});
    });
