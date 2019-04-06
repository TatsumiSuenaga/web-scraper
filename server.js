const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const axios = require('axios');
const cheerio = require('cheerio');

let cache = require('memory-cache');
let url = '';
let searchTerm = '';

app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/scrape-init', (req,res) => {
    cache.put('url', req.body.url);
    cache.put('searchTerm', req.body.string);
    console.log('Successful caching of ' + cache.get('url') + ' and '+ cache.get('searchTerm'));
    res.location('/').sendStatus(200);
})

app.get('/scrape-url', (req,res) => {
    if (cache.size() > 0){
        url = cache.get('url');
        searchTerm = cache.get('searchTerm');
        console.log(url + " " + searchTerm);
        axios.get(url)
        .then(response => {
            const count = getCount(response.data, searchTerm);
            const jsonBody = [count, new Date(), searchTerm, url];
            res.json(jsonBody);
            console.log(JSON.stringify(jsonBody));
            cache.del('url');
            cache.del('searchTerm');
        })
        .catch(error => {
            console.log(error);
        });
    }

    getCount = (html, searchTerm) => {
        let count = 0;
        const $ = cheerio.load(html);
        const urlElems = $('*');
        for (let i = 0; i < urlElems.length; i++) {
            const elementText = $(urlElems[i]).text();
            if (elementText.length > 0){
                count += getCountWithinText(elementText, searchTerm);
            }
        }

        return count;
    }
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is running on port " + port);

//--------------------------------------------------------

/**
 * Counts occurrence of String searchTerm in String text
 * @param {String} text 
 * @param {String} searchTerm 
 * @returns {Number} number of occurrences
 */

function getCountWithinText(text, searchTerm) {
    let count = 0;
    if (text.length != 0){
        let searchIndex, foundIndex = 0;
        while((foundIndex = text.indexOf(searchTerm, searchIndex)) > -1){
            count++;
            searchIndex = foundIndex + text.length;
        }
    }
    return count;
}
