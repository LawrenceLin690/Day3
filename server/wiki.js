const express = require('express');
const router = express.Router();
const rp = require('request-promise');
const $ = require('cheerio'); //HTML parser
const url =
  'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

const potusParse = function(url) {
  return rp(url).then(function(html) {
    return {
      name: $('.firstHeading', html).text(),
      birthday: $('.bday', html).text(),
    };
  });
};

router.get('/', async (req, res, next) => {
  try {
    rp(url)
      .then(function(html) {
        const wikiUrls = [];
        // console.log($('big > a', html));=
        for (let i = 0; i < 45; i++) {
          wikiUrls.push($('big > a', html)[i].attribs.href);
        }
        return Promise.all(
          wikiUrls.map(function(url) {
            return potusParse('https://en.wikipedia.org' + url);
          })
        );
      })
      .then(function(presidents) {
        res.json(presidents);
      });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
