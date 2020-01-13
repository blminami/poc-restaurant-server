var express = require('express');
var router = express.Router();
let models = require('../models/')
var NodeGeocoder = require('node-geocoder');


var options = {
    provider: 'google',
    httpAdapter: 'https' // Default
}

var geocoder = NodeGeocoder(options);


models.restaurant.hasMany(models.order);

//Get all restaurants
router.get('/', (req, res, next) => {
    models.restaurant.findAll()
        .then((restaurants) => res.status(200).json(restaurants))
        .catch((err) => next(err));
});

//Get restaurant by ID including orders
router.get('/:id', (req, res, next) => {
    models.restaurant.findById(req.params.id, { include: [models.order] })
        .then((restaurant) => {
            if (restaurant) {
                res.status(200).json(restaurant);
            }
            else {
                res.status(404).send('not found');
            }
        })
        .catch((err) => next(err));
});

//Add a new record in restaurant table
router.post('/', (req, res, next) => {
 
    var stringAddress = req.body.streetNumber + " " + req.body.street + " " + req.body.city;
    console.log(stringAddress);
    geocoder.geocode(stringAddress)
        .then((address) => {
            
           var objRestaurant = {};
           objRestaurant.city = req.body.city;
           objRestaurant.street = req.body.street;
           objRestaurant.streetNumber = req.body.streetNumber;
           objRestaurant.longitude = address[0].longitude;
           objRestaurant.latitude = address[0].latitude;
           
          
            models.restaurant.create(objRestaurant)
                .then((post) => res.status(200).json(post))
                .catch((err) => next(err));
        })
        .catch((err) => console.log(err))

});

//Update existing restaurants -> get by ID
router.put('/:id', (req, res, next) => {
    models.restaurant.findById(req.params.id)
        .then((restaurant) => {
            if (restaurant) {
                return restaurant.update(req.body, { fields: ['street', 'streetNumber', 'longitude', 'latitude'] })
            }
            else {
                res.status(404).send('not found');
            }
        })
        .then(() => {
            if (!res.headersSent) {
                res.status(201).send('modified');
            }
        })
        .catch((err) => next(err));

});

//Delete a restaurant by ID
router.delete('/:id', (req, res, next) => {

    models.restaurant.findById(req.params.id)
        .then((restaurant) => {
            if (restaurant) {
                return restaurant.destroy();
            }
            else {
                res.status(404).send('not found');
            }
        })
        .then(() => {
            if (!res.headersSent) {
                res.status(201).send('destroyed');
            }
        })
        .catch((err) => next(err));
});


module.exports = router;
