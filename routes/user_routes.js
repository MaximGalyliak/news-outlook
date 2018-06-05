const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const db = require("../db/models");

router.get("/", (req, res) => {
  db.Article.find({})
    .populate("comments")
    .then(articles => {
      res.render("index", { articles: articles });
    })
    .catch(error => {
      res.json(error);
    });
});

router.post("/comments/:id", (req, res) => {
  db.Comment.create(req.body)
    .then(comment => {
      return db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { comments: comment._id } },
        { new: true }
      );
    })
    .then(article => {
      res.json(article);
    })
    .catch(err => {
      console.log(err);
      res.send("Comments currently unavailable");
    });
});

router.get("/articles", (req, res) => {});
module.exports = router;
