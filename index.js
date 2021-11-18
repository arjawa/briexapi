const { textpro } = require('./text')
const express = require('express')
const app = express()
app.set("port", process.env.PORT || 5000)


app.get('/', async (req, res) => {
	res.send('Hello World!')
})

app.get('/api/textpro/:style', async (req, res) => {
	let style = req.params.style
	let text1 = req.query.text1
	let text2 = req.query.text2 ? req.query.text2 : null
	
	res.header("Content-Type",'application/json')
	if (!style || !text1) res.send(JSON.stringify({"status": "error", "result": "invalid parameter!"}, undefined, 4))
	else res.send(await textpro(style, text1, text2))
})

app.listen(app.get("port"), () => {
	console.log(`API service running successfully!`)
})