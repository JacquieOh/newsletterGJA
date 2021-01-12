const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/signup.html');
});

app.post("/", function(req, res) {

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.Email;


  const data = {
    members : [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us7.api.mailchimp.com/3.0/lists/f082deb1e9"

  const options = {
    method: "POST",
    auth: "jacquie1:19c41142aeb34181c5a29a843a771a9e-us7"
  }

  const request =  https.request(url, options, function(response) {

    if(response.statusCode === 200) {
      res.sendFile(__dirname + "/sucess.html")
    }   else {
      res.sendFile(__dirname + "/failure.html");
    };

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req,res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running");
});


// API key Mailchimp 19c41142aeb34181c5a29a843a771a9e-us7?

// List ID f082deb1e9
