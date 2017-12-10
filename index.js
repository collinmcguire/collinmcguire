// Dependencies
var express = require('express');
var app = express();
var https = require('https');
var less = require('less-middleware');

// Config
app.use(less(__dirname + 'public/stylesheets/less',{
  dest: __dirname + 'public/stylesheets/css'},
  {},
  {compress: 'auto'})
);
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// Routing
app.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
})

app.get('/blog', function(req, res){
  var url = 'https://public-api.wordpress.com/rest/v1.1/sites/collinmcguire.wordpress.com/posts/?number=2&pretty=true';

  // Get blog posts from WordPress REST API
  https.get(url,(response)=>{
    var posts= {};

    response.setEncoding("utf8");

    let body = "";

    response.on("data", function(data){
      body += data;
    });

    response.on("end", function(){
      body = JSON.parse(body);
      posts = body.posts;

      res.render('blog',{
        title: 'Blog',
        posts: posts
      });
    });
  });
})

app.get('/about', function(req, res){
  res.render('about', {
    title: 'About'
  });
})

app.get('/contact', function(req, res){
  res.render('contact', {
    title: 'Contact'
  });
})


app.get('/projects', function(req, res){
  res.render('projects', {
    title: 'Projects'
  });
})

// Listener
app.listen(3000);
