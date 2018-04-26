// app.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app); 
var port =  process.env.port || 4200;

app.use(express.static(__dirname + '/node_modules'));  
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});
	
server = app.listen(process.env.port, function () {
  var addr = server.address();
  console.log('   app listening on http://' + addr.address + ':' + addr.port);
});  
var io = require('socket.io')(server);

io.on('connection', function(client) {  
	console.log('Client connected...');
	client.on('join', function(data) {
		console.log(data);
		io.emit('messages', 'Hello from server');
		});
    });