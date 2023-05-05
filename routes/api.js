var express = require('express');
const Transcripter = require('../src/transcripter');
var router = express.Router();

router.post('/video', async function(req,res) {
    let {body} = req;
    let {searchTerm,ytURL} = body;
    let transcripts = await Transcripter(ytURL);
    let response = getTimestamps(searchTerm.toLowerCase(),ytURL, transcripts);
    res.send(response);
})

function getTimestamps(searchTerm, ytURL, transcripts){
    let urls = [];
    let result = transcripts.filter(q => q.text.toLowerCase().includes(searchTerm))
    urls = result.map(respon => {
        let time = Math.floor(respon.offset/1000);
        let url = `${ytURL}&t=${time}`
        return url
    })
    return urls
}
module.exports = router;