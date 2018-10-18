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
var itemOne = Todo({ item: "buy flowers" }).save(function(err) {
  if (err) throw err;
  console.log("item saved");
});

var urlencodedparser = bodyParser.urlencoded({ extended: false });

var data = [{ item: "get milk" }, { item: "walk dog" }, { item: "kick ass" }];
module.exports = function(app) {
  app.get("/todo", function(req, res) {
    res.render("todo", { todos: data });
  });

  app.post("/todo", urlencodedparser, function(req, res) {
    data.push(req.body);
    res.json(data);
  });

  app.delete("/todo/:item", function(req, res) {
    data = data.filter(function(todo) {
      return todo.item.replace(/ /g, "-") !== req.params.item;
    });
    res.json(data);
  });
};
