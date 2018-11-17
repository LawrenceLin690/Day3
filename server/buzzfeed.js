const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = 'https://www.buzzfeed.com';

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
        let buzzfeedArr = [];
        $('h1', html).each(function() {
          buzzfeedArr.push($(this).text());
        });
        $('h2', html).each(function() {
          buzzfeedArr.push($(this).text());
        });
        res.json(buzzfeedArr);
      });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
