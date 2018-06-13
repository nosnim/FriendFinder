var friends = require('../data/friends.js');

module.exports = function (app) {

  app.get("/api/friends", function (req, res) {
    res.json(friendsData)
  })

  app.post("/api/friends", function (req, res) {
    //console.log(req.body)
     var bestMatch = {
       name: "",
       photo: "",
       friendDifference: Infinity
     };

     // Here we take the result of the user"s survey POST and parse it.
     var userData = req.body;
     var userScores = userData.answers;

     // This variable will calculate the difference between the user"s answers and the answers of
     // each user in the database
     var totalDifference;

     // Here we loop through all the friend possibilities in the database.
     for (var i = 0; i < friends.length; i++) {
       var currentFriend = friends[i];
       totalDifference = 0;

       //console.log(currentFriend.name);

       // We then loop through all the answers of each friend
       for (var j = 0; j < currentFriend.answers.length; j++) {
         var currentFriendScore = currentFriend.answers[j];
         var currentUserScore = userScores[j];

         // We calculate the difference between the scores and sum them into the totalDifference
         totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
       }

       // If the sum of differences is less then the differences of the current "best match"
       if (totalDifference <= bestMatch.friendDifference) {
         // Reset the bestMatch to be the new friend.
         bestMatch.name = currentFriend.name;
         bestMatch.photo = currentFriend.photo;
         bestMatch.friendDifference = totalDifference;
       }
     }

     // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
     // the database will always return that the user is the user's best friend).
     friends.push(userData);

     // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
     res.json(bestMatch);
     //console.log(json(bestMatch));
  })

  
}