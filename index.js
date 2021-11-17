const { textpro } = require('./text')
const express = require('express')
const app = express()
app.set("port", process.env.PORT || 5000)


app.get('/', async (req, res) => {
	res.send('Hello World!')
})

app.get('/api/textpro/glitch', async (req, res) => {
	let text1 = req.query.text1
	let text2 = req.query.text2
	res.send({"result": await textpro(text1, text2)})
})

app.listen(app.get("port"), () => {
	console.log(`Example app listening at http://localhost:${app.get("port")}`)
})