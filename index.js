

const express = require("express");
const app = express();

//to parse information that we send from post request.
app.use(express.urlencoded({extended: true})) //parse data that comes from html form
app.use(express.json()) //to parse the incoming requests with json payloads

app.get("/", function(request,response){
    console.log(request);
    response.send("hello world");
});

app.post("/", function(req,res){
    res.send("It is working");
})

app.listen(3000, function(){
    console.log("server is running on port 3000");
})