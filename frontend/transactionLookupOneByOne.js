var http = require("http");
var https = require("https");

/**
 * looks up individual pending transactions
 * getJSON:  REST get request returning JSON object(s)
 * @param accessToken a valid access token
 * @param pendingTransactions a json containing the result of a database lookup of pending transactions
 */


exports.getJSON = function(accessToken, pendingTransactions)
{
	//developed with the help of looking at Bryan Mac's answer on stackexchange here:
	//http://stackoverflow.com/questions/9577611/http-get-request-in-node-js-express
	//these are the settings for get requests to payments in the venmo api
	
	//we get the json object of all the pending transaction
	var pending = JSON.parse(pendingTransactions);
	//iterate through the transactions
	for (var i = 0, len = pending.length; i < len ++i){
		var transactionID = pending[i].txnID; //NB: we may need to change this name depending what database calls it
		//process that transaction
		var get_options = {
			host: 'api.venmo.com',
			port: '443',
			path: '/v1/payments/' + transactionID,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}
		
		//this is the string of arguments we'll pass to the api GET request
		var get_data = querystring.stringify({
			'access_token' : String(accessToken),
		});
		
		    //console.log("rest::getJSON");

	//actually perform the request
		var req = https.request(options, function(res)
		{
			var output = '';
			console.log(options.host + ':' + res.statusCode);
			res.setEncoding('utf8');

			res.on('data', function (chunk) {
				output += chunk;
			});

			res.on('end', function() {
				var current = JSON.parse(output); //look at an individual
				if (current.data.status == "completed"){
					//if the transaction is completed, change the DB value to "completed" and decrement the counter
				}
				
			});
		});

		req.on('error', function(err) {
			//res.send('error: ' + err.message);
		});

		req.end();
	
	//do stuff after having parsed data?
	
	}

};