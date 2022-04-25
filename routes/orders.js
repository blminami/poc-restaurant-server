var express = require('express');
var router = express.Router();
let models = require('../models/');

models.order.belongsTo(models.user);
models.order.belongsTo(models.restaurant);

//Get all orders
router.get('', (req, res) => {
  models.order
    .findAll()
    .then((orders) => res.status(200).json(orders))
    .catch((err) => {
      console.log(err);
      res.status(500).send('oups...');
    });
});

//Get order by ID
router.get('/:id', (req, res, next) => {
  models.order
    .findById(req.params.id)
    .then((order) => {
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).send('not found');
      }
    })
    .catch((err) => next(err));
});

//If trigger === 'restaurants' => get all orders where restaurantId = id
//If trigger === 'users' => get all orders where userId = id
router.get('/:trigger/:id', (req, res) => {
  if (req.params.trigger === 'restaurants') {
    models.order
      .findAll({
        where: {
          restaurantId: req.params.id
        }
      })
      .then((orders) => res.status(200).json(orders))
      .catch((err) => {
        console.log(err);
        res.status(500).send('oups...');
      });
  } else if (req.params.trigger === 'users') {
    models.order
      .findAll({
        where: {
          userId: req.params.id
        }
      })
      .then((orders) => res.status(200).json(orders))
      .catch((err) => {
        console.log(err);
        res.status(500).send('oups...');
      });
  }
});

//Create new order
router.post('/restaurant/:rid/user/:uid', (req, res, next) => {
  var trigger = false;
  models.user
    .findById(req.params.uid)
    .then((user) => {
      if (user) {
        models.restaurant
          .findById(req.params.rid)
          .then((restaurant) => {
            if (restaurant) {
              let order = req.body;
              order.userId = req.params.uid;
              order.restaurantId = req.params.rid;

              return models.order.create(order);
            } else {
              res.status(404).send('Restaurant not found');
              trigger = true;
            }
          })
          .then((post) => {
            console.log(post);
            if (trigger === false) {
              res.status(200).send(post.dataValues);
            }
          });
      } else {
        if (!res.headers) {
          res.status(404).send('User not found');
        }
      }
    })

    .catch((err) => next(err));
});

//Update order: statusOrder
router.put('/:id', (req, res, next) => {
  models.order
    .findById(req.params.id)
    .then((order) => {
      if (order) {
        return order.update(req.body, { fields: ['statusOrder'] });
      } else {
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

//Delete order if statusOrder === 'pending'
router.delete('/:id', (req, res, next) => {
  models.order
    .findById(req.params.id)
    .then((order) => {
      if (order && order.statusOrder === 'Pending') {
        return order.destroy();
      } else {
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
