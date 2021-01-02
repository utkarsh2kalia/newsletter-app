
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

    const url = "https://us7.api.mailchimp.com/3.0/lists/adcc40df40";

    const options = {
        method: "POST",
        auth : "utkarsh:a94696d91932fb733fa1d8d33790d943-us7"
    }


    const request = https.request(url, options, function(response){


        if(response.statusCode === 200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else
        {
            res.sendFile(__dirname+"/failure.html");
    //    response.on("data", function(data){
    //         console.log(JSON.parse(data));
    //     })
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


// a94696d91932fb733fa1d8d33790d943-us7

// list id
// adcc40df40