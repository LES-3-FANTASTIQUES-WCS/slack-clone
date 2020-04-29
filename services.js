const fetch = require('node-fetch');
const cheerio = require('cheerio');

const dataAccess = require('./data-access');

const getUrl = message => {
  const match = message.match(/\bhttps?:\/\/\S+/gi);
  if (!match) {
    return '';
  }
  return match[0];
};
const fetchHtml = async url => {
  const response = await fetch(url);
  const html = response.text();
  return html;
};
const scrapeExtraInfo = html => {
  const $ = cheerio.load(html);
  const title = $('title').text();
  const description = $('meta[name="description"]').attr('content');
  return { title, description };
};

const getExtraInfoFromMessage = async message => {
  const url = getUrl(message);

  if (!url) {
    return {}; // sort de la fonction, n'atteint pas l'instruction suivante
  }
  const html = await fetchHtml(url);
  return { ...scrapeExtraInfo(html), url }; // ... pour ajouter un nouvel attribut (url) à un objet déjà existant (scrapeExtraInfo(html)).
};

const createChannelAndGetId = async name => {
  await dataAccess.createChannel(name);
  const channel = await dataAccess.getChannelByName(name);

  return channel.id;
};

module.exports = {
  createChannelAndGetId,
  getExtraInfoFromMessage,
};
