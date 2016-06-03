var request = require('request');

function MessageSender(page_key){
  this.page_key = page_key;
  self = this;
  this.sendMessage = function(recipient, message){
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:self.page_key},
      method: 'POST',
      json: {
        recipient: {id:recipient},
        message: {text: message},
      }
    }, function(error, response, body) {
      if (error) {
        console.log('Error sending message: ', error);
      } else if (response.body.error) {
        console.log('Error: ', response.body.error);
      }
    });
  }
}


module.exports = MessageSender;