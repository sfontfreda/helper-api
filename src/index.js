const mongoose = require("mongoose")
const app = require("./app")
require('dotenv').config()

// Connection to the mongo DB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("🟢 Connected to the database")) 
    .catch(err => console.log(`🔴 Could not connect to database, ERROR: ${err}`));   

// Application starter
app.listen(process.env.PORT, () => {
    console.log(`🟢 App running in ${process.env.PORT} ! 🚀`)
});
