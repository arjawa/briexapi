const axios = require("axios");
const cheerio = require("cheerio");


function igdl(link, type) {
  return new Promise(async(resolve, reject) => {
    let config = {
      'url': link,
      'submit': ''
    }
    axios(`https://downloadgram.org/${type}-downloader.php`, {
      method: 'POST',
      data: new URLSearchParams(Object.entries(config)),
      headers: {
        "cookie": "_ga=GA1.2.623704211.1625264926; __gads=ID=a078e4fc2781b47b-22330cd520ca006e:T=1625264920:RT=1625264920:S=ALNI_MYS-jyPCjNa94DU8n-sX4aNF-ODOg; __atssc=google%3B3; _gid=GA1.2.1953813019.1625397379; __atuvc=4%7C26%2C6%7C27; __atuvs=60e2ab6d67a322ec003",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    })
    .then(tod => {
      const $ = cheerio.load(tod.data)
      resolve({
        url: $('#downloadBox > a').attr('href')
      })
    })
  })
}

const igStalk = async (req, res) => {
  try {
    let {
      username
    } = req.query;
    if (!username) return res.status(400).send("Parameter is missing or invalid");
    let {
      data
    } = await axios.get('https://www.instagram.com/'+ username +'/?__a=1', {
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
          "cookie": "mid=YaGkAQALAAExs8Y_bI1vTIUORvlE; ig_did=DF37E73B-AF05-4A82-98F7-2E76C91CE058; csrftoken=poSc7PSIW0bEB34NWEGpvahLOMwrM2Y3; ds_user_id=49870162551; sessionid=49870162551%3AjQ20kYN149QwnM%3A14; shbid=\"8483\05449870162551\0541669519329:01f7fea9a8151937faf05f5c1bb0e73d76179b553bc7a781807370a0a42cbbc383c7f953\"; shbts=\"1637983329\05449870162551\0541669519329:01f749263a35b655d35bcd0cb066359b9865dd9ea9e700958f8b3e08bbcf1299dfbfde70\"; rur=\"CLN\05449870162551\0541669519484:01f79e0400adec23ae15049f5edfe3bf4764cb0a021d1ebbeede1bfb84277ab03691dce0\""
        }
      });
    const {
      user
    } = data.graphql;
    res.json({
      id: user.id,
      bio: user.biography,
      followers: user.edge_followed_by.count,
      following: user.edge_follow.count,
      fullName: user.full_name,
      highlightCount: user.highlight_reel_count,
      isBusinessAccount: user.is_business_account,
      isRecentUser: user.is_joined_recently,
      accountCategory: user.business_category_name,
      linkedFacebookPage: user.connected_fb_page,
      isPrivate: user.is_private,
      isVerified: user.is_verified,
      profilePicHD: user.profile_pic_url_hd,
      username: user.username,
      postsCount: user.edge_owner_to_timeline_media.count
    });
  } catch (e) {
    res.status(404).send("Username does not exists")
  }
}

const igFoto = async (req, res) => {
  let url = req.query.url;
  if (!url || !url.includes("http")) return res.status(400).send("Parameter is missing or invalid");
  const result = await igdl(url, "photo");
  res.json(result);
}

const igVideo = async (req, res) => {
  let url = req.query.url;
  if (!url || !url.includes("http")) return res.status(400).send("Parameter is missing or invalid");
  const result = await igdl(url, "video");
  res.json(result);
}

module.exports = {
  igStalk,
  igFoto,
  igVideo
}