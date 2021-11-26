const fetch = require("node-fetch");


const search = async (req, res) => {
    let query = req.query.q;
    if (!query) return res.json({error: "please provide a valid parameter!"});
    let url = `https://id.wikipedia.org/w/api.php?action=opensearch&search=${query}&format=json`;
    let data = await fetch(url);
    console.log(await data.json())
}

module.exports = { search }