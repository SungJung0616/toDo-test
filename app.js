const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const indexRouter = require("./routes/index");


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api',indexRouter);

const mongoURI = `mongodb://localhost:27017/todo-demo`;

mongoose.connect(mongoURI,{ useNewUrlParser : true})
.then(()=>{
    console.log("mongoose connected");
})
.catch((err)=>{
    console.error("Mongoose connection error:", err);
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});