// $(document).ready(function(){
    const express = require("express");

const mongoose = require('mongoose')
main().catch(err=> console.log(err));

const app = express();

app.set("view engine" , "ejs")

//to parse information that we send from post request.
app.use(express.urlencoded({extended: true})) //parse data that comes from html form
app.use(express.json()) //to parse the incoming requests with json payloads

//to access static files
app.use(express.static(__dirname + "/public"))

///////////////////////////////////////////////////////////////////
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/portalDB');
}
console.log("Server connected");

const studentSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    _enrollment:{
        type: String,
        unique: true,
        index: true,
        required: true
    },
    department: {
        type: String,
        enum: ['Computer Science Engineering', 'Electronics and Communication Engineering' , 'Electrical Engineering' , 'Chemical Engineering' , 'Information Technology' , 'Mechanical Engineering' , 'Metallurgical and Materials Science' , 'Civil Engineering']
    },
    batch: {
        type: String,
        enum: ["2019","2020","2021","2022"]
    },
    status: {
        type: String,
        enum: ['Permanently blocked' , 'Blocked till L-U' , 'Blocked till L-11' , 'Unblocked']
    },
    contact: String,
    email: String,
    offer: [{
        type: offerSchema
    }],
    resumeLink: String
})

const Student = new mongoose.model('Student' , studentSchema);

const demo = new Student({
    fname: "Isha",
    lname: "Tamrakar",
    _enrollment: "2019BCSE047",
    department: "Computer Science Engineering",
    batch: "2019",
    status: "Unblocked",
    contact: "6263272143",
    email: "ishatamrakar54@gmail.com",
    resumelink: ""
})


// demo.save();
/////////////////////////////////////////////////////////////////////////////////////////
const offerSchema = new mongoose.Schema({
    _offerID: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    CTC: {
        type: String,
        required: true
    },
    company: companySchema,
    offerReleaseDate: String
})

const Offer = new mongoose.model('offer' , offerSchema)

/////////////////////////////////////////////////////////////////////////////////////////
const companySchema = new mongoose.Schema({
    _companyID: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    CRC: {
        type: String,
        required: true
    },
    HRDetails: {
        type: String,
        required: true
    },
    date: String,
    jobCategory: [{
        type: jobDetailSchema
    }]
})

const Company = new mongoose.model('Company' , companySchema)

/////////////////////////////////////////////////////////////////////////////////////////
const jobDetailSchema = new mongoose.Schema({
    _jobID: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    CTC: String,
    role: String,
    jobDetails: String
})

const JobDetail = new mongoose.model('JobDetail' , jobDetailSchema)

////////////////////////////////////////////////////////////////////////////////////////


app.get("/", function(req,res){
    res.render("home");
});

app.post("/", function(req,res){
    
})

app.get("/studentData" , function(req,res){
    res.render("studentData",{message: ""})
})

app.post("/studentData" , function(req,res){
    console.log(req.body);
    var data = new Student(req.body);
    data.save() . then(item=>{
        res.render("studentData" , {message: "Student Data saved successfully"} );
    }) .catch (err=>{
        res.status(400).render("studentData", {message: "Enrollment already saved in database"});
    })
})

// $(".updateButton").click(function(){
//     alert("Update Button Clicked");
// })

document.getElementById("updateButton").addEventListener("click" , function(){
    alert("clicked update button");
})

app.listen(3000, function(){
    console.log("server is running on port 3000");
})
// });