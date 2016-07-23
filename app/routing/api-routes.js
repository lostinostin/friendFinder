var friendsData 	= require('../data/friends.js');
var fs 				= require('fs');
var bodyParser 		= require('body-parser');
var path 			= require('path');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app){


	app.get('/api/friends', function(req, res){
		res.json(friendsData);
	});


	app.post('/api/friends', function(req, res){
		var user = req.body;
		var closestMatch = 100;
		var bestFriend;
		
		// var friendsArr = [];
		friendsData.users.forEach(function(item){
			var diff = 0;
			for (var i = 0; i < item.score.length; i++) {
				diff += Math.abs(item.score[i] - req.body.score[i]);
			}
			
			if (diff <= closestMatch) {
				closestMatch = diff;
				bestFriend = item
			}
			
		})

		// fs.writeFile('friendsData', req.body, (err) => {
		//   if (err) throw err;
		//   console.log('It\'s saved!');
		// });
		

		fs.appendFile('friendsData.users', req.body, 'utf8', function(err) {
			if (err) throw err;
			console.log("You've successfully written your data to the file");
		});

		res.json(bestFriend);
		console.log(req.body);
		//friendsData.push(user);

	});

	
}

// 	app.post('/api/clear', function(req, res){
// 		// Empty out the arrays of data
// 		tableData = [];
// 		console.log(tableData);
// 	})
// }