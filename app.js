const express = require('express');
// const ejs = require('ejs');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const port = process.env.PORT;

const homeStartingContent = "welcome to my blog website, stay calm as we serve you intresting content"
const aboutContent = "Read about us here"
const contactContent = "contact Us here"

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.render("pages/home", {homeStartingContent: homeStartingContent})
});

app.get("/about", function(req, res) {
    res.render("pages/about", {aboutContent:aboutContent});
})

app.get("/contact", function(req, res){
    res.render("pages/contact", {contactContent: contactContent})
})

app.listen(port, function () {
    console.log(`serving on port ${port}`);
})