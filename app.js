import express from "express";
import mongoose from "mongoose"; //for database
import dotenv from "dotenv"; //to keep secrets 
import cors from "cors"; //for request
import TodoRouter from "./routes/todotask.js";

//the Setup
const app = express();
app.use(express.json());
dotenv.config();
const port = process.env.PORT || 3000;
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/todotask", TodoRouter);
//getting the response; to check if we're getting the response 
app.get("/", (req, res) => {
    res.send("Welcome!");
});


//CONNECTION OF THE DATABSE=
mongoose
    .connect(process.env.MONGOURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("db connection success");
        app.listen(port, () => console.log("server starting: ", port));
    })
    .catch((error) => console.log(error));