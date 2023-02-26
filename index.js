// $(document).ready(function(){
//     alert('doc working')
// });

// console.log('doc working')
// const countryNameGenerator = require("country-name-generator")
// console.log(countryNameGenerator.firstName(false,'ma'));

const express = require("express");

const app = express();

app.get("/", function(request,response){
    console.log(request);
    response.send("hello world");
});

app.listen(3000, function(){
    console.log("server is running on port 3000");
})