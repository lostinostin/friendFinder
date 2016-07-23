var friendsData 	= require('../data/friends.js');
var path 			= require('path');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app){

	// API GET Requests
	// Below code handles when users "visit" a page.
	// In each of the below cases when a user visits a link
	// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
	// ---------------------------------------------------------------------------

	app.get('/api/friends', function(req, res){
		res.json(friendsData);
	});

	// API POST Requests
	// Below code handles when a user submits a form and thus submits data to the server.
	// In each of the below cases, when a user submits form data (a JSON object)
	// ...the JSON is pushed to the appropriate Javascript array
	// (ex. User fills out a reservation request... this data is then sent to the server...
	// Then the server saves the data to the tableData array)
	// ---------------------------------------------------------------------------

	app.post('/api/friends', function(req, res){

		var currentUser = friendsData.length;
		var diffArr = [];
		var sum;
		var friendsArr = [];

		for (var i = friendsData.length; i > 0; i--) {
			for (var j = 0; j < friendsData.score.length; j++) {
				var diff = Math.abs(friendsData[currentUser].score[j] - friendsData[i].score[j]);
				diffArr.push(diff);
			}
			for (var j = 0; j < diffArr.length; i++) {
				sum += diffArr[j];
			}
			if (sum <= 20) {
				// friendsArr.push(friendsData[i]);
				friendsData[i].push(req.body);
				res.json(friendsArr);
			} else if (21 <= sum <= 60 ){
				friendsData[i].push(req.body);
				res.json(friendsData[i]);
			} else {
				friendsData[i].push(req.body);
				res.json(friendsData[i]);
			}
			
		}
		

		// Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
		// It will do this by sending out the value "true" have a table
		// if(tableData.length < 5 ){
		// 	tableData.push(req.body);
		// 	res.json(true); // KEY LINE
		// }

		// // Or false if they don't have a table
		// else{
		// 	waitListData.push(req.body);
		// 	res.json(false); // KEY LINE
		// }

	});

	// ---------------------------------------------------------------------------
	// I added this below code so you could clear out the table while working with the functionality.
	// Don't worry about it!

	app.post('/api/clear', function(req, res){
		// Empty out the arrays of data
		tableData = [];
		console.log(tableData);
	})
}

// module.exports = function(app) { 
//   app.get("/api/friends", function(req, res) {
//     res.sendFile(path.join(__dirname, "../data/friends.js"));
//   });

//   app.post("/api/friends", function(req, res) {
//     res.sendFile(path.join(__dirname, "../data/friends.js"));
    
//   });
// }
