//console.log("yo");
//user going to click btn
$('#submitInfo').on("click", function (event) {
  // {
  //   name: "The Rock",
  //   photo: "http://cdn.onlyinyourstate.com/wp-content/uploads/2016/07/3630750300_f1cd14cdc3_b-700x875.jpg",
  //   answers: ["5", "5", "4", "2", "3", "1", "4", "5", "2", "5"]
  // }

  var userData = {
    name: $('#userName').val().trim(),
    photo: $('#inputGroupFile01').val().trim(),
    answers: []
  }
  //console.log(userData);

  //get all data from the option fields
  for (var i = 0; i < 10; i++) {
    // console.log(i);
    var optionVal = $('#inputGroupSelect' + i).val();
    // console.log(optionVal);
    userData.answers.push(optionVal)
  }

  //console.log(userData);

  $.ajax({
    method: "POST",
    url: '/api/friends',
    data: userData
  }).then(function (bestMatch) {
    $("#matchName") = "Your best match is " + bestMatch.name + "!!!";
    $("#matchPic").append("<img src=\" + bestMatch.photo + \" />"); 
    $("#matchScore") = "Your match score is:" + bestMatch.score +".";
  });


  //take data send to backend
  //user will get response from backend and it should be a friend obj
  //display a modal or popup that has the frienddata obj in it
});