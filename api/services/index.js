const axios = require('axios');
const cheerio = require('cheerio');

// Need to grab this from React Front End
const url = 'https://en.wikipedia.org/wiki/Cheerio';
const searchTerm = 'Cheerio';

axios.get(url)
    .then(response => {
        console.log(getCount(response.data, searchTerm));
    })
    .catch(error => {
        console.log(error);
    });

let getCount = (html, searchTerm) => {
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
