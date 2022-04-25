const express = require('express');
const router = express.Router();
let models = require('../models');

models.order.belongsToMany(models.menuItem, { through: models.intermediate });
models.menuItem.belongsToMany(models.order, { through: models.intermediate });

//Get by OrderdId

router.get('/orders/:oid', (req, res, next) => {
  models.order
    .findById(req.params.oid)
    .then((order) => {
      if (order) {
        models.intermediate
          .findAll({
            where: {
              orderId: req.params.oid
            }
          })
          .then((ints) => {
            res.status(200).json(ints);
          });
      } else {
        res.status(404).send('not found');
      }
    })
    .catch((err) => next(err));
});

//Add new record
router.post('/order/:oid/menuItem/:mid', (req, res, next) => {
  const trigger = false;
  models.order
    .findById(req.params.oid)
    .then((order) => {
      if (order) {
        models.menuItem
          .findById(req.params.mid)
          .then((menuItem) => {
            if (menuItem) {
              let int = req.body;
              int.orderId = req.params.oid;
              int.menuItemId = req.params.mid;
              return models.intermediate.create(int);
            } else {
              res.status(404).send('menuItem not found');
              trigger = true;
            }
          })
          .then((post) => {
            if (trigger === false) {
              res.status(200).send(post);
            }
          });
      } else {
        if (!res.headers) {
          res.status(404).send('Order not found');
        }
      }
    })
    .catch((err) => next(err));
});

//Delete record
router.delete('/:oid/:mid', (req, res, next) => {
  models.intermediate
    .findOne({
      where: {
        orderId: req.params.oid,
        menuItemId: req.params.mid
      }
    })
    .then((int) => {
      if (int) {
        return int.destroy();
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
