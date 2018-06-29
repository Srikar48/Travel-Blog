const express = require('express');
const app = express();

var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/travelblog');

//Schema for Users
var UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    collection: 'users'
});

//Schema for BlogPosts
var PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    }
}, {
    collection: 'blogposts'
});

//Models for interaction with DB
var PostModel = mongoose.model("PostModel", PostSchema);
var UserModel = mongoose.model("UserModel", UserSchema);

//Set path for static files
app.use(express.static(__dirname + '/public'));

//Body parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Server routes
app.get("/",getLoginPage);
app.post("/api/user/signup",postUser);
app.post("/api/user/login",getUser);
app.post("/api/getUser", getUserData)
app.put("/api/user/update", updateUser);
app.post("/api/blogPost", postBlog);
app.get("/api/blogPost", getAllPosts);
app.post("/api/myPost", getMyPosts);
app.post("/api/getPost/:id", getPost);
app.put("/api/editPost", editPost);
app.delete("/api/deletePost/:id", deletePost);
app.put("/api/blogPost/likePost/:id", likePost);
app.put("/api/blogPost/dislikePost/:id", dislikePost);

function getLoginPage(req, res){

    res.sendFile(path.join(__dirname+'/public/app/index.html'));

}

function postUser(req, res) {

    var user = req.body;
    //take in user and create a model to be submitted to DB
    UserModel.create(user).then(function(userObj) {
        res.json(200);
    }, function(err) {
        console.log(err);
        res.sendStatus(400);
    });

}

function getUser(req, res) {

    var user = req.body;
    UserModel.findOne({mail: user.mail, password: user.password}).then(function(userFound) {
        res.json(userFound);
    }, function(err) {
        console.log(err);
        res.sendStatus(400);
    });

}

function getUserData(req, res) {

    var user = req.body;
    UserModel.findOne({name: user.name}).then(function(userFound) {
        res.json(userFound);
    }, function(err) {
        console.log(err);
        res.sendStatus(400);
    });

}

function updateUser(req, res) {

    var user = req.body;
    UserModel.update({_id: user._id},{name: user.name, phone: user.phone, mail: user.mail, password: user.password}).then(function(status) {
        res.sendStatus(200);
    }, function () {
        res.sendStatus(400);
    });

}

function postBlog(req, res) {

    var post = req.body;
    //take in post and create a model to be submitted to DB
    PostModel.create(post).then(function(postObj) {
        res.json(200);
    }, function(err) {
        console.log(err);
        res.sendStatus(400);
    });

}

function getAllPosts(req, res) {

    PostModel.find().then(function(posts) {
        res.json(posts);
    }, function(err) {
        console.log(err);
        res.sendStatus(400);
    });

}

function getMyPosts(req, res) {

    var user = req.body;
    PostModel.find({author: user.name}).then(function(posts) {
        res.json(posts);
    }, function(err) {
        console.log(err);
        res.sendStatus(400);
    });

}

function getPost(req, res) {

    var postId = req.params.id;
    PostModel.findOne({_id: postId}).then(function(postFound) {
        res.json(postFound);
    }, function(err) {
        console.log(err);
        res.sendStatus(400);
    });

}


function deletePost(req, res) {

    var postId = req.params.id;
    PostModel.remove({_id: postId}).then(function(status) {
        res.sendStatus(200);
    }, function () {
        res.sendStatus(400);
    });

}

function editPost(req, res) {

    var post = req.body;
    PostModel.update({_id: post._id},{title: post.title, url: post.url, body: post.body, time: post.time}).then(function(status) {
        res.sendStatus(200);
    }, function () {
        res.sendStatus(400);
    });

}

function likePost(req, res) {

    var postId = req.params.id;
    PostModel.update({_id: postId},{$inc: {likes: 1}}).then(function(status) {
        res.sendStatus(200);
    }, function () {
        res.sendStatus(400);
    });

}

function dislikePost(req, res) {

    var postId = req.params.id;
    PostModel.update({_id: postId},{$inc: {dislikes: 1}}).then(function(status) {
        res.sendStatus(200);
    }, function () {
        res.sendStatus(400);
    });

}

//Start server
app.listen(3000, function(){

    console.log('Travel-Blog listening on port 3000!');

});