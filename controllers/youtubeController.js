const yts = require("yt-search");
const fetch = require("node-fetch");
const cheerio = require("cheerio");

const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/;

function post(url, formdata) {
  return fetch(url, {
    method: "POST",
    headers: {
      accept: "*/*",
      "accept-language": "en-US",
      "content-type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams(Object.entries(formdata))
  });
}


const ytSearch = async (req, res) => {
  try {
    let resp = await yts(req.query.q);
    res.json(resp.videos.slice(0, 3));
  } catch (e) {
    console.log(e);
  }
};

const ytAudio = async (req, res) => {
  try {
    let ytId = ytIdRegex.exec(req.query.url);
    if (!ytId) return res.status(400).json({
      error: "please provide a valid parameter!"
    });
    let url = 'https://youtu.be/' + ytId[1];
    let resp = await post("https://www.y2mate.com/mates/en68/analyze/ajax", {
      url,
      q_auto: 0,
      ajax: 1
    });
    const json = await resp.json();
    const $ = cheerio.load(json.result);
    let thumbnail = $("div").find(".thumbnail.cover > a > img").attr("src");
    let title = $("div").find(".thumbnail.cover > .caption > b").text();
    let quality = $("div").find("#mp3 > table > tbody > tr > td:nth-child(3) > a").attr("data-fquality");
    let type = $("div").find("#mp3 > table > tbody > tr > td:nth-child(3) > a").attr("data-ftype");
    let size = $('div').find('#mp3 > table > tbody > tr > td:nth-child(2)').text();
    let id = /var k__id = "(.*?)"/.exec(json.result)[1];

    const getDownloadUrl = await post(`https://www.y2mate.com/mates/en68/convert`, {
      type: 'youtube',
      _id: id,
      v_id: ytId[1],
      ajax: '1',
      token: '',
      ftype: type,
      fquality: 64
    });
    const resp2 = await getDownloadUrl.json();
    const $2 = cheerio.load(resp2.result);
    let link = $2('div').find('a').attr('href');

    res.json({
      thumbnail, title, quality, type, size, link
    });
  } catch (e) {
    console.log(e);
  }
};

const ytVideo = async (req, res) => {
  try {
    let ytId = ytIdRegex.exec(req.query.url);
    if (!ytId) return res.status(400).json({
      error: "please provide a valid parameter!"
    });
    let url = 'https://youtu.be/' + ytId[1];
    let resp = await post("https://www.y2mate.com/mates/en68/analyze/ajax", {
      url,
      q_auto: 0,
      ajax: 1
    });
    const json = await resp.json();
    const $ = cheerio.load(json.result);
    let thumbnail = $("div").find(".thumbnail.cover > a > img").attr("src");
    let title = $("div").find(".thumbnail.cover > .caption > b").text();
    let quality = $("#mp4 > table > tbody > tr:nth-child(4) > td:nth-child(3) > a").attr("data-fquality");
    let type = $("#mp4 > table > tbody > tr:nth-child(4) > td:nth-child(3) > a").attr("data-ftype");
    let size = $('div').find('#mp4 > table > tbody > tr:nth-child(4) > td:nth-child(2)').text();
    let id = /var k__id = "(.*?)"/.exec(json.result)[1];

    const getDownloadUrl = await post(`https://www.y2mate.com/mates/en68/convert`, {
      type: 'youtube',
      _id: id,
      v_id: ytId[1],
      ajax: '1',
      token: '',
      ftype: type,
      fquality: quality
    });
    const resp2 = await getDownloadUrl.json();
    const $2 = cheerio.load(resp2.result);
    let link = $2('div').find('a').attr('href');

    res.json({
      thumbnail, title, quality, type, size, link
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  ytSearch,
  ytAudio,
  ytVideo
};