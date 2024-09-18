/****************************************************************************
* I declare that this assignment is my own work in accordance with the Seneca Academic 
* Policy. No part of this assignment has been copied manually or electronically from 
* any other source (including web sites) or distributed to other students.
* 
* Assignment: 2247 / 1
* Student Name:  Yachna Dineshkumar Patel
* Student Email: ydpatel8@myseneca.ca
* Course/Section: WEB422/ZAA
* Deployment URL: https://web422-peach.vercel.app/
*****************************************************************************/

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const listingRoutes = require('./routes/listingRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// this is the root which is define in listingRoutes.js
app.use('/api', listingRoutes);

// this set up the get request to the root URL of the application
app.get('/', (req, res) => {
    res.json({ message: "API Listening" });
});

// this is the MongoDB connection setup
mongoose.connect(process.env.MONGODB_CONN_STRING, {
    
})
    .then(() => {
        console.log("Connected to MongoDB successfully");

        // this Starts the server only after DB is connected
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("Error connecting to MongoDB: ", err);
    });
