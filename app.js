const { deleteTask, loadFile, addFile } = require("./utils/tdl");
const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const app = express();

app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const options = {
    layout: "layouts/main",
    title: "Simple To Do List - Home",
  };
  res.render("home", options);
});

app.get("/start", (req, res) => {
  const data = loadFile();
  const option = {
    layout: "layouts/main",
    title: "Simple To Do List - Start",
    msg1: req.flash("msg"),
    msg2: req.flash("delMsg"),
    data,
  };

  res.render("start", option);
});

app.get("/delete/:task", (req, res) => {
  const { task } = req.params;
  deleteTask(task);

  req.flash("delMsg", "Task has been deleted");
  res.redirect("/start");
});

app.post("/start", (req, res) => {
  const task = req.body;
  addFile(task);
  console.log(task);

  req.flash("msg", "Task has been added");
  res.redirect("/start");
});

app.get("/about", (req, res) => {
  const option = {
    layout: "layouts/main",
    title: "Simple To Do List - About",
  };
  res.render("about", option);
});

app.listen(3000, () => console.log("To Do List running on http://localhost:3000"));
