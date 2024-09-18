const express = require('express');
const router = express.Router();
const ListingsDB = require('../modules/listingsDB'); // Import the ListingsDB class

const db = new ListingsDB();

// Initialize the database connection
db.initialize(process.env.MONGODB_CONN_STRING);

//  Add a new listing

router.post('/listings', async (req, res) => {
    try {
        const result = await db.addNewListing(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create listing', error: err.message });
    }
});
//  Retrieve all listings with optional pagination and name filter
router.get('/listings', async (req, res) => {
    try {
        const { page = 1, perPage = 10, name = '' } = req.query;
        const listings = await db.getAllListings(Number(page), Number(perPage), name);
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: "Failed to get listings", error: error.message });
    }
});

//  Retrieve a listing by its ID
router.get('/listings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await db.getListingById(id);
        if (listing) {
            res.status(200).json(listing);
        } else {
            res.status(404).json({ message: "Listing not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to get listing", error: error.message });
    }
});


//  Update a listing by its ID
router.put('/listings/:id', async (req, res) => {
    console.log('Received ID:', req.params.id);
    console.log('Request Body:', req.body);

    try {
        const id = req.params.id;
        const updatedListing = await db.updateListingById(req.body, id);
        if (updatedListing) {
            res.status(200).json(updatedListing);
        } else {
            res.status(404).json({ message: 'Listing not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to update listing', error: err.message });
    }
});

//  Delete a listing by its ID
router.delete('/listings/:id', async (req, res) => {
    try {
        const result = await db.deleteListingById(req.params.id);
        if (result) {
            res.status(204).send(); // No content
        } else {
            res.status(404).json({ message: 'Listing not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete listing', error: err.message });
    }
});

module.exports = router;
