var http = require("http");
var https = require("https");

/**
 * looks up square transactions and compares with database of previous transactions
 * getJSON:  REST get request returning JSON object(s)
 * @param accessToken a valid access token
 * @param lastTimestamp a timestamp of the last time we compared the square database to ours
 * @param userCollection the db collection containing the database of user info to compare to
 */


exports.getJSON = function(accessToken, lastTimestamp, userCollection)
{
	//developed with the help of looking at Bryan Mac's answer on stackexchange here:
	//http://stackoverflow.com/questions/9577611/http-get-request-in-node-js-express
	//these are the settings for get requests to payments in the venmo api

	//we get the json object of all the previous transactions

	//set up options to grab all recent transactions
	var get_options = {
		host: 'connect.squareup.com',
		port: '443',
		path: '/v1/' + accessToken + '/payments',
		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + accessToken, //Mg3K9RsvfUduh8m9BSZPmg', //this needs to contain the accessToken in general
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	}

	// this is the string of arguments we'll pass to the square api GET request
	var get_data = querystring.stringify({
		'begin_time' : lastTimestamp,
	});

	//actually perform the request
	var r = request.get('https://connect.squareup.com/v1/'+'/payments', function(err, httpResponse, body) {
		//console.log("made it into the request");
		var transactionsDetails = JSON.parse(body); //should be a list of Payment objects, we'll extract ids from them
		//console.log(transactionsDetails);
		
		//we could also in the future when we cover multiple performances include information
		//about itemization so that we can decrement ticket counter of the right performance
		
		//it should look something like this
		var transactionIDs = [];
		for(int i = 0; i < transactionsDetails.length; ++i){
			transactionIDs[i] = transactionsDetails[i].id;
			//if this transaction isn't in the database yet, enter it
			if(userCollection.count({ "transID" : transactionIDs[i]}) == 0) {
				userCollection.insert({ "transID" : transactionIDs[i]}) //also add other info like which seciton it was once we have that
			}
		}
		//console.log(transactionIDs);
		
		//now we do something to the database with these
		
		//rough mongoDB command sketch
		
		//db.usersList.append(
		//return transactionIDs;
	});

	// var req = https.request(options, function(res)
	// {
		// var output = '';
		// console.log(options.host + ':' + res.statusCode);
		// res.setEncoding('utf8');

		// res.on('data', function (chunk) {
			// output += chunk;
		// });

		// res.on('end', function() {
			// var current = JSON.parse(output); // parse the json
			// for(var i = 0, len = current.length; i < len ++i)
				// // add new entries to db for this time to the database of transactions
				// // using something like this: current.data[i]
				// // not sure how square keys the data, will need to test
				// // also decrement the counter
			// }
			
		// });
	// });

	// req.on('error', function(err) {
			// //res.send('error: ' + err.message);
	// });

	// req.end();

	// change the lastTimestamp to be the timestamp now

};