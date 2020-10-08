"use strict";

var cheerio = require("cheerio");
const got = require("got");

const SCRAPERS = [
  {
    id: "urubu",
    teamName: "Flamengo",
    description: "Scraper do site do Flamengo - só tem perna de pau :)",
  },
];

module.exports.getScrapers = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(SCRAPERS, null, 2),
  };
};

module.exports.scrape = async (event) => {
  var playersFound = [];

  const scraperId = event.pathParameters.scraperId;

  if (scraperId == "urubu") {
    const teamName = SCRAPERS.find((team) => team.id == scraperId).teamName;

    const response = await got(
      "https://www.flamengo.com.br/elencos/elenco-profissional"
    );

    var $ = cheerio.load(response.body);
    var playersUrls = [];
    $("div.elenco-atleta").each(function (i, element) {
      const cheerioElement = $(element);
      const urlAtleta = cheerioElement.find("a.1");
      playersUrls.push(urlAtleta.attr("href"));
    });

    for (const id in playersUrls) {
      const player = await scrapePlayerData(playersUrls[id]);
      player.currentTeam = teamName;
      playersFound.push(player);
    }

    return {
      statusCode: 200,
      body: JSON.stringify(playersFound, null, 2),
    };
  } else {
    return {
      statusCode: 404,
      body:
        "Scraper not available. Please double check available ones at /scrapers",
    };
  }
};

async function scrapePlayerData(url) {
  const response = await got(url);

  var $ = cheerio.load(response.body);
  const playerImageUrl = $("div.col-12.col-md-6.text-right")
    .find("img.img-fluid.d-none.d-md-inline-block.img-persona")
    .attr("src");
  const playerName = $("div.card-body.pl-10.p-relative.info-persona")
    .find("h2.text-white.text-uppercase")
    .text();
  var playerPosition = "";
  $("ul.list-unstyled.mb-1 li.text-white.text-uppercase").each((i, element) => {
    const cheerioElement = $(element);
    if (cheerioElement.text().indexOf("Posição:") >= 0) {
      playerPosition = cheerioElement.text().split(":")[1].trim();
    }
  });
  return {
    playerImageUrl: playerImageUrl,
    playerName: playerName,
    playerPosition: playerPosition,
  };
}
