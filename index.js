var express = require("express");
var app = express();
var parser = require("body-parser");
var compliments = require("./compliment");
var colors = require("./color");
app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(parser.urlencoded({extended: true}));

function getRandomCompliment(compliment){
  var complimentIndex = Math.floor(Math.random()*compliment.length);
  var randomCompliment = compliment[complimentIndex];
  return randomCompliment
};

function getRandomColor(color){
  var colorIndex = Math.floor(Math.random()*color.length);
  var randomColor = color[colorIndex];
  return randomColor
};

app.get("/", function(req, res){
  res.render("index.hbs", {compliment: getRandomCompliment(compliments), color: getRandomColor(colors)})
})

app.get("/:name", function(req, res){
  res.render("name.hbs", {compliment: getRandomCompliment(compliments), color:getRandomColor(colors), name: req.params.name})
})

app.post("/:name/new", function(req, res){
  compliments.push(req.body.name);
  var name = req.params.name
  res.redirect('/' + name);
});

app.listen(4000, function(){
  console.log("listening on http://localhost:4000")
})
