var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/todos",
  { useNewUrlParser: true }
);

var todoSchema = new mongoose.Schema({
  item: String
});
var Todo = mongoose.model("todo", todoSchema);

var urlencodedparser = bodyParser.urlencoded({ extended: false });

// var data = [{ item: "get milk" }, { item: "walk dog" }, { item: "kick ass" }];
module.exports = function(app) {
  app.get("/todo", function(req, res) {
    Todo.find({}, function(err, data) {
      if (err) throw err;
      res.render("todo", { todos: data });
    });
  });

  app.post("/todo", urlencodedparser, function(req, res) {
    var itemOne = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      console.log("item saved");
      res.json(data);
    });
  });

  app.delete("/todo/:item", function(req, res) {
    // data = data.filter(function(todo) {
    //   return todo.item.replace(/ /g, "-") !== req.params.item;
    // });
    Todo.find({ item: req.params.item.replace(/-/g, " ") }).remove(function(
      err,
      data
    ) {
      if (err) throw err;
      res.json(data);
    });
  });
};
