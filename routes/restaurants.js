const express = require("express");
const uuid = require("uuid");

const resData = require("../util/restaurant-data");
const router = express.Router();

router.get("/restaurants", function (req, res) {
  // accessing query parameter - order = asc/desc
  // req.body comes when we use POST method
  let order = req.query.order;
  let nextOrder = 'desc';

  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }

  if (order === 'desc') {
      nextOrder = 'asc';
  }

  const storedRestaurants = resData.getStoredRestaurants();
  // sort the restaurants - resA and resB
  storedRestaurants.sort(function (resA, resB) {
    if (
      (order === "asc" && resA.name > resB.name) ||
      (order === "desc" && resB.name > resA.name)
    ) {
      return 1; // if return a value > 0, items will be flipped
    }
    return -1; // return < 0, hence items will retain their order
  });

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
    nextOrder: nextOrder
  });
});

// Dynamic route to each restaurant page
router.get("/restaurants/:id", function (req, res) {
  //  /restaurants/r1
  const restaurantID = req.params.id;
  const storedRestaurants = resData.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantID) {
      return res.render("restaurant-detail", { restaurant: restaurant });
    }
  }

  res.status(404).render("404");
});

////////// GET and POST methods of recommend /////////
router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body;
  // creating and assigning a unique id to the restaurant
  restaurant.id = uuid.v4(); // Note that id parameter doesn't exists, but JS will create it for us
  const restaurants = resData.getStoredRestaurants();

  restaurants.push(restaurant);
  resData.storeNewRestaurant(restaurants);

  // After storing user data, redirect to new page
  res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
