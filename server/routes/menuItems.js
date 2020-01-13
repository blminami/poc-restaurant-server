var express = require('express');
var router = express.Router();
let models = require('../models/');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//Get all items
router.get('/', (req, res, next) => {
    models.menuItem.findAll()
        .then((items) => res.status(200).json(items))
        .catch((err) => next(err));
});


//Get item by ID
router.get('/:id', (req, res, next) => {
    var ids = req.params.id.split(',');
    var arrayIds = [];
    for( var i =0;i<ids.length; i++){
        arrayIds.push(ids[i]);
    }
    console.log(arrayIds);
    models.menuItem.findAll({
        where:{
            id:{in:arrayIds}
        }
    })
        .then((item) => {
            if (item) {
                res.status(200).json(item);
            }
            else {
                res.status(404).send('not found');
            }
        })
        .catch((err) => next(err));
});

//GET items by Category
router.get('/byCategory/:category', (req, res, next) => {
    models.menuItem.findAll({ where: { category: req.params.category } })
        .then((items) => res.status(200).json(items))
        .catch((err) => next(err));
});

//GET items by Category and price between x and y
router.get('/:category/:x/:y', (req, res, next) => {
    models.menuItem.findAll({
            where: {
                category: req.params.category,
                price: {
                    [Op.gt]: req.params.x,
                    [Op.lt]: req.params.y
                }
            }
        })
        .then((items) => res.status(200).json(items))
        .catch((err) => next(err));
});


//Create new item
router.post('/', (req, res, next) => {
    models.menuItem.create(req.body)
        .then(() => res.status(200).send('created'))
        .catch((err) => next(err));
});

//Update item: foodType, price, image, description (all except from category and id)
router.put('/:id', (req, res, next) => {
    models.menuItem.findById(req.params.id)
        .then((item) => {
            if (item) {
                return item.update(req.body, { fields: ['foodType', 'price', 'image', 'description'] })
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

//Delete item of th menu
router.delete('/:id', (req, res, next) => {

    models.menuItem.findById(req.params.id)
        .then((item) => {
            if (item) {
                return item.destroy();
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
