const textmaker = require('free-textmaker-alpha')
const styles = require('./styles.json')

global.text_required

function textpro(style, text1, text2) {
	if (styles.hasOwnProperty(style)) {
	    let web_url = styles[style].url
	    let text = text2 === undefined ? text1 : [text1, text2]
	    text_required = styles[style].hasOwnProperty("text_required") ? styles[style].text_required : 1
        if (text1 === undefined || text1 === "") return {"error": "pastikan parameter sudah benar!"}
        if ((text2 === undefined || text2 === "") && text_required === 2) return {"error": "style ini membutuhkan 2 text!"}
        return new Promise(async(resolve, reject) => {
	        textmaker.textpro(web_url, text).then(async(data) => {
	            try {
		            return resolve({
			            "url": data
		            })
	            } catch (e) {
	                return reject({
			            "error": e
		            })
	            }
	        })
        })
	} else {
	    return {"error": "style tidak ditemukan!"}
	}
}

module.exports.textpro = textpro 