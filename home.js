const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

const templatePath = path.join(__dirname, './home.html')
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.get("/", (req, res) => {
    res.render("login");
})
app.get("/Signup", (req, res) => {
    res.render("Signup");
})
app.listen(3000, () => {
    console.log("port connected");
})