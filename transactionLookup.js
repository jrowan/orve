var http = require("http");
var https = require("https");

/**
 * looks up all transactions and compares to what we already have
 * getJSON:  REST get request returning JSON object(s)
 * @param accessToken a valid access token
 * @param previousTransactions a json containing the result of a database lookup of previous transactions
 */


exports.getJSON = function(accessToken, previousTransactions)
{
	//developed with the help of looking at Bryan Mac's answer on stackexchange here:
	//http://stackoverflow.com/questions/9577611/http-get-request-in-node-js-express
	//these are the settings for get requests to payments in the venmo api
	var get_options = {
		host: 'api.venmo.com',
		port: '443',
		path: '/v1/payments',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}; 
	
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
            var current = JSON.parse(output);
			var previous = JSON.parse(previousTransactions);
			//here we do what we were planning to do to begin with: compare to the database lookup of previous results			
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();
};