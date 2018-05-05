var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

require('./models/todo.model')
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
mongoose
    .connect(
        "mongodb://Korotin:11223344q4@ds111390.mlab.com:11390/todo_list"
    )
    .then(() => console.log("MongoDB has started"))
    .catch(e => console.log(e));
const Todo = mongoose.model("todo_schema");


app.get('/', function (req, res) {
    res.send('Hello Worlds!');
});

app.get("/getlist", function (req, res) {
    Todo.find({})
        .then(data => {
            res.send(data);
        });
})
app.post("/addtodo", (req, res) => {
    let todo = new Todo(req.body);
    todo.save()
        .then(res.send(req.body))
        .catch(res.send('Ошибка в добавлении записи'))
})

app.post('/deletetodo', (req, res) => {
    Todo.deleteOne({id: req.body.id})
        .then(res.send(req.body))
        .catch(err => console.err(err));   
  });

  app.post('/complete', (req, res) => {
       let isComp = req.body.completed;

        Todo.where( { id: req.body.id } ).update( { completed: !isComp } )
            .then(res.send(req.body))
            .catch(err => console.err(err));
  });

app.listen(3000, function () {
    console.log("listening on port 300")
});