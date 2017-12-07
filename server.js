//Express
let express = require("express");
let app = express();
let morgan = require("morgan");
const path = require("path");

app.use(morgan('dev'));

//Sratic Folder
app.use(express.static(__dirname + '/public/dist'));

//Body Parser
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Mongo Database
let mongoose = require("mongoose");
mongoose.set('debug', true);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/usersSchema', {useMongoClient: true});
let UserShema = new mongoose.Schema({
     first_name: { type: String, require: true },
     last_name: { type: String, require: true },
     email: { type: String, require: true },
     editable: { type: Boolean, require: true },
})
mongoose.model("User", UserShema);
let User = mongoose.model("User");




//Routes
// Get Users
app.get("/users", (req, res, next) => {
    console.log("app.get: /users");
    User.find({}, (err, users)=>{
        return res.json(users);
    })
})
// Create User
app.post("/users", (req, res, next) => {
    console.log("app.post: /users" + JSON.stringify(req.body));
    delete req.body._id;
    console.log("app.post: /users" + JSON.stringify(req.body));
    User.create(req.body, (err, user) => {
        if (err) return res.json(err)
        else return res.json(user)
    })
})
// Destroy User
app.delete("/users/:id", (req, res, next) => {
    console.log("Server > DELETE '/users/:id ' > id ", req.params.id);
    User.deleteOne({_id: req.params.id}, (err, data) => {
        if (err) return res.json(err)
        else return res.json(true)
    })
})
// Edit User
app.put("/users/:id", (req, res, next) => {

    console.log("Server > PUT '/users/:id' > id ", req.params.id);
    console.log("Server > PUT '/users/:id' > user ", req.body);
    User.update({_id: req.params.id}, req.body, (err, rawData) => {
        if (err) return res.json(err)
        else return res.json(true)
    })
})
app.all("*", (req,res,next) => {
    console.log("*");
    res.sendfile(path.resolve("./public/dist/index.html"));
})

//Server Listening @ 5000
app.listen(5000, () => console.log("Server running at 5000"))