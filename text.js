const puppeteer = require('puppeteer')
const fs = require('fs-extra')


async function textpro(text1, text2) {
	return new Promise(async (resolve, reject) => {
		const browser = await puppeteer.launch(
		   { args: ["--no-sandbox", "--disable-setuid-sandbox"] }
		);
		const page = await browser.newPage();
		await page
		.goto("https://textpro.me/pornhub-style-logo-online-generator-free-977.html", {
			waitUntil: "networkidle2"
		})
		.then(async () => {
			await page.type("#text-0", text1)
			await page.type("#text-1", text2);
			await page.click("#submit");
			await new Promise(resolve => setTimeout(resolve, 5000));
			const element = await page.$(
				'div[class="btn-group"] > a'
				);
			const text = await (await element.getProperty("href")).jsonValue();
			const urlmp4 = ({
				url: text
			})
			resolve(text)
			browser.close();
		})
		.catch((err => {
			reject(err)
		}))
	})
}

module.exports.textpro = textpro 