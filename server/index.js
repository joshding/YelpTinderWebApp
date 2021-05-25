// Import the express framework for our node server
const express = require('express');
// Import the path module from node to create absolute file paths for express static
const path = require('path');
const { ModuleFilenameHelpers } = require('webpack');

// Instantiate the express server
const app = express();


const KEY = require('../config.js');
const yelp = require('yelp-fusion');
const client = yelp.client(KEY.YELP_API_KEY);
// Set a constant for the port that our express server will listen on
const PORT = 3000;

// Serve static files. Any requests for specific files will be served if they exist in the provided folder
app.use(express.static(path.join(__dirname, '../client/dist')));
// Start the server on the provided port
app.listen(PORT, () => console.log('Listening on port: ' + PORT));
module.exports = app;
app.get('/yelp/:loc', (req, res) => {
  //let offset = Math.floor(Math.random() * 15);
  let offset = 0;
  client.search({
    location: req.params.loc,
    limit:50,
    "sort_by":"rating",
    //"categories":"food"
    //offset:offset*50
  }).then(response => {
    //console.log(response.jsonBody.businesses[0]);

    const listings = response.jsonBody.businesses.map((business, index) => {
    const {name, image_url, url, review_count, categories, rating, location, price, display_phone}= business

    const listing = generateListing(index+1, url, [image_url], `${location.address1}, ${location.city}, ${location.state}, ${location.zip_code}`, rating, price, review_count, name, display_phone);
    return listing;
    });

    //console.log('here is listing: ', listings[0])
    // db.Business.insertMany(listings).then(() => console.log('inserted many'));

    res.send(listings);

  }).catch(e => {
    console.log(e);
  });
  const generateRandomBoolean = () => {
    return Math.floor(Math.random() * 6) %2 === 0;
  }
  const generateDistance = () => {
    return (Math.random() * 9).toFixed(1).toString()
  }

  const generateListing = (businessId, yelpURL, images, address, rating, price, reviewCount, name, phoneNumber) => {
    const listing = {businessId, rating, price, yelpURL, images, address, reviewCount,name, phoneNumber};
    listing.isOpenNow = generateRandomBoolean();
    listing.isFavorite = false;
    listing.distance = generateDistance();
    listing.isClaimed = generateRandomBoolean();
    return listing;
  }
})