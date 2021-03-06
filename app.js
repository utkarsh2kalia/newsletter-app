require("dotenv").config();
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{

    res.sendFile(__dirname+"/signup.html");
})

app.post("/", (req, res)=>{

    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    
    

    const options = {
        method: "POST",
        auth : process.env.AUTH
    }


    const request = https.request(process.env.URL, options, function(response){


        if(response.statusCode === 200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else
        {
            res.sendFile(__dirname+"/failure.html");
       response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    }
    })
    console.log(firstName, lastName, email );
    request.write(jsonData);
    request.end();

})

// app.get("/failure",(req, res) =>{
    // hello?

//     res.redirect("/");

// })

app.post("/failure",(req, res) =>{

    res.redirect("/");

})

app.listen(process.env.PORT || 3000,() =>{
    console.log("server is running on port 3000");
})


