import express from "express";
import router from "./routers/routes.js";
import mongoose from "mongoose";

const app = express(); 


app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('Server is running ...');
});

app.use("/user", router);

mongoose.connect("mongodb://localhost:27017/coach")

    .then(() => {
        console.log("db connection well");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(7500, () => {
    console.log('Server running at 7500 ...');
});
