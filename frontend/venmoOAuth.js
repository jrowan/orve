// OAuth workflow: redirect user to: https://api.venmo.com/v1/oauth/authorize?client_id=YqNFqWY4q9v5neJ82euPbdFSNtCQ28n4&scope=make_payments%20access_feed%20access_profile%20access_email%20access_phone&response_type=code
// That will then redirect the user to  https://orve.herokuapp.com/venmo_oauth page, with
// the URL parameter "code". It then POSTs to Venmo using our client ID and the user's authorization code 

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

// We need this to build our post string
var querystring = require('querystring');
var http = require('https');
var fs = require('fs');
var AUTHCODE = getURLParameter('code'); // store this in the database entry for the user too

function PostCode() {
  // Build the post string from an object
  var post_data = querystring.stringify({
      'client_id' : 'YqNFqWY4q9v5neJ82euPbdFSNtCQ28n4',
      'client_secret': 'a9wMnByhdyEYuhYAmC3cmsnaMfLqaw4A',
      'code': AUTHCODE
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: 'api.venmo.com',
      port: '443',
      path: '/v1/oauth/access_token',
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
          console.log('Response: ' + chunk); // this is the venmo response.
          //save this token and you'll be able to do transactions
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();

}