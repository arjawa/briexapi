const textmaker = require('free-textmaker-alpha');
const styles = require('../textpro.json');


const textpro = async (req, res) => {
  let style = req.params.style;
  let text1 = req.query.text1;
  let text2 = req.query.text2;

  if (styles.hasOwnProperty(style)) {
    let web_url = styles[style].url;
    let text = text2 === undefined ? text1: [text1,
      text2];
    let text_required = styles[style].hasOwnProperty("text_required") ? styles[style].text_required: 1;
    if (text1 === undefined || text1 === "") return res.status(400).send("Parameter is missing or invalid");
    if ((text2 === undefined || text2 === "") && text_required === 2) return res.status(400).send("Second parameter is missing or invalid");

    await textmaker.textpro(web_url, text).then(async(data) => {
      try {
        return res.json({
          "url": data
        });
      } catch (e) {
        return res.status(500).send("Oops... something has broke when trying to process your request");
      }
    });
  } else {
    return res.status(404).send("Style does not exists");
  }
};

module.exports = {
  textpro
};