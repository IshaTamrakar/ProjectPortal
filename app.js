const express = require("express");

const mongoose = require('mongoose')
main().catch(err=> console.log(err));

const app = express();

app.set("view engine" , "ejs")

//to parse information that we send from post request.
app.use(express.urlencoded({extended: true})) //parse data that comes from html form
app.use(express.json()) //to parse the incoming requests with json payloads

//to access static files
app.use(express.static("public"))

///////////////////////////////////////////////////////////////////
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/portalDB');
}
console.log("Server connected");

const studentSchema = new mongoose.Schema({
    _id: String,
    // enrolmentNumber:{
    //     type: String,
    //     unique: true,
    //     index: true,
    //     required: true
    // },
    name: {
        type: String,
        required: true
    },
    Department: {
        type: String,
        enum: ['Computer Science Engineering', 'Electronics and Communication Engineering' , 'Electrical Engineering' , 'Chemical Engineering' , 'Information Technology' , 'Mechanical Engineering' , 'Metallurgical and Materials Science' , 'Civil Engineering']
    },
    Batch: {
        type: Number,
        enum: [2019,2020,2021,2022]
    },
    currentStatus: {
        type: String,
        enum: ['Permanently blocked' , 'Blocked till L-U' , 'Blocked till L-11' , 'Unblocked']
    },
    emailID: String,
    resumeLink: String,
    contactnumber: Number
})

const Student = new mongoose.model('Student' , studentSchema);

const demo = new Student({
    _id: "2019BCSE047",
    name: "Isha Tamrakar",
    Department: "Computer Science Engineering",
    Batch: 2019,
    currentStatus: "Unblocked",
    emailID: "ishatamrakar54@gmail.com",
    resumelink: "",
    contactnumber: 6263272143
})

// demo.save()

app.get("/", function(req,res){
    res.render('home');
});

app.post("/", function(req,res){
    
})

app.listen(3000, function(){
    console.log("server is running on port 3000");
})