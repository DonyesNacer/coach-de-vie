import express from "express";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import router from "./routers/routes.js";
import articleRouter from "./routers/articlerouter.js";
import cors from "cors";

// Middleware to handle CORS


const app = express();
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from 'public/lifecoach-master'
app.use(express.static(path.join(__dirname, 'public', 'lifecoach-master')));

// Middleware to parse JSON request bodies
app.use(express.json());
// Serve images from the 'public/lifecoach-master/images' directory
app.use('/articles/images', express.static(path.join(__dirname, 'public', 'lifecoach-master', 'images')));

// Serve the index.html file on the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'lifecoach-master', 'index.html'));
});

// Route to retrieve the list of images
app.get('/images-list', (req, res) => {
    const imagesDir = path.join(__dirname, 'public', 'lifecoach-master', 'images');

    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            console.error('Erreur lors de la lecture des fichiers :', err);
            return res.status(500).json({ message: 'Erreur serveur' });
        }

        // Filter only image files (jpg, jpeg, png, gif)
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        res.json(imageFiles);
    });
});

// Route configurations
app.use("/user", router);
app.use("/article", articleRouter);

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/coach")
    .then(() => {
        console.log("DB connection established.");
    })
    .catch((err) => {
        console.error("DB connection error:", err);
    });

// Start the server
app.listen(7500, () => {
    console.log('Server running on port 7500...');
});
