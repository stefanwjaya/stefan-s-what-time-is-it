var express = require('express');
var bodyParser = require('body-parser');
var commandparser = require('./commandparser');
var MessageSender = require('./messagesender');

var app = express();
app.set('port',(process.env.PORT || 5000));
app.set('verify_token',process.env.SWTII);

var messagesender = new MessageSender(app.get('verify_token'));
	
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/webhook',function(req,res){
	if (req.query['hub.verify_token'] === app.get('verify_token')){
		res.send(req.query['hub.challenge']);
	}
	res.send("Error, wrong validation token, given is ",res.query['hub.verify_token']);
});

app.post('/webhook/',function(req,res){
	messaging_events = req.body.entry[0].messaging;
	for(i = 0; i< messaging_events.length;i++){
		event = req.body.entry[0].messaging[i];
		sender = event.sender.id;
		messageResponse = "";
		if(event.message){
			messageResponse = commandparser.parse(event.message,sender);
		}
		if(messageResponse.length>0){
			messagesender.sendMessage(sender,messageResponse);
		}
	}
	res.sendStatus(200);
});

app.listen(app.get('port'),function(){
	console.log("running on port", app.get('port'));
})