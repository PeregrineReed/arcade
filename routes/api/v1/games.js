var express = require("express");
var router = express = express.Router();
var Game = require('../../../models').Game;

router.get("/", function(req, res, next) {
  Game.findAll()
    .then(games => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(games));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
});

router.get('/:gameId', function(req, res) {
  Game.findByPk(req.params.gameId)
    .then(game => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(game));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
});

router.post("/", function(req, res, next) {
  Game.create({
    title: req.body.title,
    price: req.body.price,
    releaseYear: req.body.releaseYear,
    active: req.body.active
  })
  .then(game => {
    res.setHeader("Content-Type", "application/json");
    res.status(201).send(JSON.stringify(game));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({ error });
  });
});

router.put('/:gameId', function(req, res, next) {
  Game.update({
      title: req.body.title,
      price: req.body.price,
      releaseYear: req.body.releaseYear,
      active: req.body.active
    },
    {
      returning: true,
      where: {
        id: parseInt(req.params.gameId)
      }
    })
    .then(([rowsUpdate, [updatedGame]]) => {
      res.setHeader("Content-Type", "application/json");
      res.status(202).send(JSON.stringify(updatedGame));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error })
  });
});

router.delete('/:gameId', function(req, res, next) {
  Game.destroy({
    where: {
      id: req.params.gameId
    }
  })
  .then(deletedGame => {
    res.setHeader("Content-Type", "application/json");
    res.status(204);
  })
  .catch(error => {
    resHeader("Content-Type", "application/json");
    res.status(500).send({ error })
  })
});

module.exports = router;
