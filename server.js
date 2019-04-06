const express = require('express');
const path = require('path');
const app = express();

const axios = require('axios');
const cheerio = require('cheerio');

// Need to grab this from React Front End
const url = 'https://en.wikipedia.org/wiki/Cheerio';
const searchTerm = 'Cheerio';

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/scrape', (req,res) => {
    // url = req.body.url;
    // searchTerm = req.body.string;
    axios.get(url)
        .then(response => {
            const count = getCount(response.data, searchTerm);
            // const jsonBody = { count: count, date: new Date(), string: searchTerm, url: url};
            const jsonBody = [count, new Date(), searchTerm, url];
            res.json(jsonBody);
        })
        .catch(error => {
            console.log(error);
        });

    getCount = (html, searchTerm) => {
        let count = 0;
        const $ = cheerio.load(html);
        // $('*').contents.each((i, elem) => {
        //     console.log(String($(this).text()));
        //     count += getCountWithinText($(this).text(), searchTerm);
        // });
        const urlElems = $('body *');
        for (let i = 0; i < urlElems.length; i++) {
            const elementText = $(urlElems[i]).text();
            if (elementText.length > 0){
                count += getCountWithinText(elementText, searchTerm);
                //console.log(count);
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
