var moment = require('moment');

var timeRegex = /^(!time|(Stefan,)*\s*what time is it\s*\?*){1}$/ ;

var tellTime = function(){	
	return ("The time is " + moment().utcOffset(7).format("HH:mm"));
}

var parse = function(message,sender){
	if(!message || !message.text) return "";
	if(message.text.match(timeRegex)){
		return tellTime();
	}
	return "";
}

module.exports = {
	parse: parse
}

