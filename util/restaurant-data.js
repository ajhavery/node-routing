const fs = require('fs');
const path = require("path");
const filepath = path.join(__dirname, "..", "data", "restaurants.json");

function getStoredRestaurants() {  
  const filedata = fs.readFileSync(filepath);
  const storedRestaurants = JSON.parse(filedata);

  return storedRestaurants;
}

function storeNewRestaurant(restaurant) {
    fs.writeFileSync(filepath, JSON.stringify(restaurant));
}

// Add the functions below which you want to export
module.exports = {
    // variable name: function name
    getStoredRestaurants: getStoredRestaurants,
    storeNewRestaurant: storeNewRestaurant
}