import express from 'express';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(cors());

// Server static files
app.use(express.static("public"));

// Home route
app.get("/", (req, res) => {
    res.sendFile(path.join("public", "index.html"));
});

// Books route
app.use('/api/v1/books', booksRoute);

mongoose
    .connect(process.env.mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(process.env.PORT, () => {
            console.log(`App is listening to port: ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
