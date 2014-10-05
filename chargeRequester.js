var querystring = require(querystring);
var http = require(https);
var fs = require(rs);

// inputs: an accesstoken for an authenticated user (the group getting paid), a phone number for the customer, an amount, and a note
// requires that note is a valid url string and the userPhone is a 10-digit US phone number with no punctuation
// return: a valid link to charge the user an amount with the given note

function PostChargeRequest(accessToken, userPhone, amount, note) {
  // Build the string containing information
  // Adapted from an answer by user onteriea_ on stackoverflow, http://stackoverflow.com/questions/6158933/how-to-make-an-http-post-request-in-node-js
  // modified for our particular API
  var post_data = querystring.stringify({
      'access_token' : String(accessToken),
      'phone': String(userPhone),
	  'amount': '-' + String(amount),
	  'note': note
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: 'api.venmo.com',
	  port: '443',
      path: '/v1/payments',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Content-Length': post_data.length
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();

}