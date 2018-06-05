const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const db = require("../db/models");
const request = require("request");

router.get("/update", (req, res) => {
  request("https://www.technewsworld.com/", (error, response, body) => {
    if (error) {
      console.log(error);
      res.json({ error: "Can't get to the website :(" });
    } else {
      var $ = cheerio.load(body);

      $("div.story-list").each((i, e) => {
        var content = {};

        content.title = $(e)
          .children("div.title")
          .children("a")
          .text();

        content.link =
          "https://www.technewsworld.com/" +
          $(e)
            .children("div.title")
            .children("a")
            .attr("href");

        content.teaser = $(e)
          .children("div.teaser")
          .text();

        if (content.title.length > 1) {
          db.Article.find({ title: content.title })
            .then(result => {
              if (result.length === 0) {
                return db.Article.create(content);
              }
              return 0;
            })
            .catch(err => {
              return res.json(err);
            });
        }
      });
    }
    res.sendStatus(201);
  });
});

module.exports = router;
