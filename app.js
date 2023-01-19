const express = require('express');
// const ejs = require('ejs');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const _ = require('lodash')
const port = process.env.PORT;

const homeStartingContent = "welcome to my blog website, stay calm as we serve you intresting content"
const aboutContent = "Read about us here"
const contactContent = "contact Us here"
const posts = [];
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.render("pages/home", { homeStartingContent: homeStartingContent, Posts: posts })
});

app.get("/about", function (req, res) {
    res.render("pages/about", { aboutContent: aboutContent });
})

app.get("/contact", function (req, res) {
    res.render("pages/contact", { contactContent: contactContent })
})

app.get("/compose", function (req, res) {
    res.render("pages/compose")
})

app.post("/compose", function (req, res) {
    const post = {
        title: req.body.postTitle,
        content: req.body.postContent
    };
    posts.push(post);
    // console.log(posts);
    res.redirect("/");
});

app.get("/post/:postName", function (req, res) {
    // console.log();
    const requestedPostName = _.lowerCase(req.params.postName);


    posts.forEach(function (post) {
        const postNameTitle = _.lowerCase(post.title);
        if (requestedPostName === postNameTitle) {
            res.render("pages/post", { 
                inComingPostTitle: post.title, 
                inComingPost: post.content
            });
        } else {
            console.log("match not found");
        }
    })
})

app.listen(port, function () {
    console.log(`serving on port ${port}`);
})