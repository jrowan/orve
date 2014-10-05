var http = require("http");
var https = require("https");

/**
 * getJSON:  REST get request returning JSON object(s)
 * @param accessToken: a valid access token
 * @param lastRequestTime: a UTC Date that indicates the last time we checked for stuff
 * @param amou
 */


exports.getJSON = function(accessToken, lastRequestTime)
{
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
        'after': String(lastRequest);
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
            var obj = JSON.parse(output);
			//here we do what we were planning to do to begin with!
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();
};