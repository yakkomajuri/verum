const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs-extra');


const url = 'https://g1.globo.com/fato-ou-fake/';


var dataArray = [];

rp(url)
  .then(function(html){
    for (var i = 0; i < $('div > div > div > a', html).length; i++) {
        var data = $('div > div > div > a', html)[i].children[0].data;
        if (data == undefined  || data[2] != '#') {
            continue;
        }
        else {
            var words = data.split(' ');
            var selectedWords = words.slice(3, words.length);
            for (var j = 0; j < selectedWords.length; j++) {
                selectedWords[j] = selectedWords[j].toLowerCase();
                if (j == (selectedWords.length - 1)) {
                    if (words[1] == "#FAKE") {
                        dataArray.push([selectedWords, 0]);
                    }
                    else if (words[1] == "#FATO") {
                        dataArray.push([selectedWords, 1]);
                    }
                }
            }

        }
    }

    fs.writeFile('./headlines.json', JSON.stringify(dataArray));
  })
  .catch(function(err){
    throw err;
  });

setTimeout(function() {
    console.log(dataArray);
},2000)