const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const api = require("./routes/index.js")
const app = express()

app.use(bodyParser.urlencoded( { extended: false }))
app.use(bodyParser.json())

app.use(express.static("src/public"))

app.get("/", function(req, res){
    res.redirect("/gui");
});


// Graphic User Interface for easily testing the api endpoints
app.use("/gui", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/views/gui.html" ))
})

// Routing to the api
app.use("/api", api)

module.exports = app