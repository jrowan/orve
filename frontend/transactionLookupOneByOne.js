var http = require("http");
var https = require("https");

/**
 * looks up individual pending transactions
 * getJSON:  REST get request returning JSON object(s)
 * @param accessToken a valid access token
 * @param pendingTransactions a database lookup of pending transactions
 * @param userCollection the db collection containing the database of user info to compare to
 */

 
 
exports.getJSON = function(accessToken, userCollection)
{
	//we get a collection of all the pending transactions
	var pending = userCollection.find({"status" : "pending"});
	
	//iterate through the transactions
	for (var i = 0, len = pending.length; i < len ++i){
		var transactionID = pending[i].transID; //NB: we may need to change this name depending what database calls it
		//process that transaction

		//actually perform the request
		var r = request.get('https://api.venmo.com/'+transactionID, function(err, httpResponse, body) {
			//console.log("made it into the request");
			var transactionDetails = JSON.parse(body); //should be a list of Payment objects, we'll extract ids from them
			//console.log(transactionsDetails);
			
			//we could also in the future when we cover multiple performances include information
			//about itemization so that we can decrement ticket counter of the right performance
			
			//it should look something like this
			var transactionIDs = [];
			var transactionStatuses = [];
			// transactionIDs[i] = transactionsDetails[i].data[7]; //stored in json in weird way 
			transactionStatus = transactionsDetails.data.status; //only checks one status
			//if this transaction is settled according to venmo but not our database, update the database
			if((userCollection.count({ "transID" : transactionID, "status" : "settled"}) == 0) && (transactionStatus == "settled")) { //it has to be settled too
				userCollection.insert({ "transID" : transactionID}, {"status" : "settled") //also add other info like which showing it was once we have that
			}
		
		var form = r.form();
		form.append('access_token', accessToken);

	});
};
		
		//this is the string of arguments we'll pass to the api GET request
		// var get_data = querystring.stringify({
			// 'access_token' : String(accessToken),
		// });
		
		    //console.log("rest::getJSON");

	//actually perform the request
		// var req = https.request(options, function(res)
		// {
			// var output = '';
			// console.log(options.host + ':' + res.statusCode);
			// res.setEncoding('utf8');

			// res.on('data', function (chunk) {
				// output += chunk;
			// });

			// res.on('end', function() {
				// var current = JSON.parse(output); //look at an individual
				// if (current.data.status == "completed"){
				//	if the transaction is completed, change the DB value to "completed" and decrement the counter
				// }
				
			// });
		// });

		// req.on('error', function(err) {
		//	res.send('error: ' + err.message);
		// });

		// req.end();
	
	//do stuff after having parsed data?
	
	// }

//};