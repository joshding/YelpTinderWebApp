const app = require('./server');

const KEY = require('../config.js');
const yelp = require('yelp-fusion');
const client = yelp.client(KEY.YELP_API_KEY);



app.get('/yelp', (req, res) => {
  client.search({
    location: 'san jose, ca',
    limit:50
  }).then(response => {
    //console.log(response.jsonBody.businesses[0]);

    const listings = response.jsonBody.businesses.map((business, index) => {
    const {name, image_url, url, review_count, categories, rating, location, price, display_phone}= business

    const listing = generateListing(index+1, url, [image_url], `${location.address1}, ${location.city}, ${location.state}, ${location.zip_code}`, rating, price, review_count, name, display_phone);
    return listing;
    });

    //console.log('here is listing: ', listings[0])
    db.Business.insertMany(listings).then(() => console.log('inserted many'));

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