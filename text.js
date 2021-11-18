const puppeteer = require('puppeteer')
const fs = require('fs-extra')
const styles = require('./styles.json')

global.text_required
/*
    ====== todo =====
    
    https://textpro.me/80-s-retro-neon-text-effect-online-979.html
    https://textpro.me/happ-new-year-card-firework-gif-959.
    https://textpro.me/create-text-logo-3d-metal-online-957.html
    https://textpro.me/create-artistic-black-and-white-status-and-quote-with-your-photos-1021.html
    
    =================
*/
async function textpro(style, text1, text2) {
	return new Promise(async (resolve, reject) => {
		const browser = await puppeteer.launch(
		   { args: ["--no-sandbox", "--disable-setuid-sandbox"] }
		)
		const page = await browser.newPage()
		let style_url
		if (styles.hasOwnProperty(style)) {
		    style_url = styles[style].url
		    text_required = styles[style].hasOwnProperty("text_required") ? styles[style].text_required : 1
		    if (text2 === null && text_required === 2) {
		        resolve(JSON.stringify({"status": "error", "result": "second parameter is empty!"}, undefined, 4))
		        browser.close()
		    }
		} else {
		    resolve(JSON.stringify({"status": "error", "result": "style not found!"}, undefined, 4))
		    browser.close()
		}
		await page
		.goto(style_url, {
			waitUntil: "networkidle2"
		})
		.then(async () => {
			await page.type("#text-0", text1)
			if (text2 != null && global.text_required == 2) await page.type("#text-1", text2)
			await page.click("#submit")
			await new Promise(resolve => setTimeout(resolve, 5000))
			const element = await page.$('div[class="btn-group"] > a')
			const text = await (await element.getProperty("href")).jsonValue()
			resolve(JSON.stringify({
			    "status": 200,
			    "result": text
			}, undefined, 4))
			browser.close()
		})
		.catch((err => {
			reject({
			    "status": "error",
			    "result": "none"
			})
		}))
	})
}

module.exports.textpro = textpro 