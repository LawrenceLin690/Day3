const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = 'https://www.reddit.com';

router.get('/', async (req, res, next) => {
  try {
    puppeteer
      .launch()
      .then(function(browser) {
        return browser.newPage();
      })
      .then(function(page) {
        return page.goto(url).then(function() {
          return page.content();
        });
      })
      .then(function(html) {
        let redditArray = [];
        $('h2', html).each(function() {
          redditArray.push($(this).text());
        });
        res.json(redditArray);
      });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
