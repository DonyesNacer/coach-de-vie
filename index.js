import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from 'url'; 
import router from "./routers/routes.js";

import router from "./routers/articlerouter.js";

const app = express(); 


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json()); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use("/user", router);
app.use("/quiz", router);


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
