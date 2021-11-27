const textmaker = require('free-textmaker-alpha');
const styles = require('../textpro.json');


function textpro(style, text1, text2) {
	if (styles.hasOwnProperty(style)) {
	    let web_url = styles[style].url
	    let text = text2 === undefined ? text1 : [text1, text2]
	    let text_required = styles[style].hasOwnProperty("text_required") ? styles[style].text_required : 1
        if (text1 === undefined || text1 === "") return { status: 400, result: { error: "pastikan parameter sudah benar!" }}
        if ((text2 === undefined || text2 === "") && text_required === 2) return { status: 400, result: { error: "style ini membutuhkan 2 text!" }}
        return new Promise(async(resolve, reject) => {
	        textmaker.textpro(web_url, text).then(async(data) => {
	            try {
		            return resolve({
		                status: 200,
		                result: {
			                "url": data
		                }
		            })
	            } catch (e) {
	                return reject({
	                    status: 500,
	                    result: {
			                "error": e
	                    }
		            })
	            }
	        })
        })
	} else {
	    return { status: 404, result: { error: "style tidak ditemukan!" }}
	}
}


const createText = async (req, res) => {
    let style = req.params.style;
    let text1 = req.query.text1;
    let text2 = req.query.text2;

    let result = await textpro(style, text1, text2);
    res.header("Content-Type","application/json");
    res.status(result.status).json(result.result);
}

module.exports = { createText }