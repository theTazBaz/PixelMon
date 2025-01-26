// Importing required modules
const express = require('express');
const app = express();
const PORT = 3000;

// Sample array
const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];

// Define an endpoint
app.get('/random-item', (req, res) => {
    // Choose a random item
    const randomIndex = Math.floor(Math.random() * items.length);
    const randomItem = items[randomIndex];

    // Return the random item as a response
    res.json({ item: randomItem });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
