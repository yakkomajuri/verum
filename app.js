const Discord = require('discord.js');
const client = new Discord.Client();

var data = require('./headlines.json');
var config = require('./config.json');

var token = config['token'];

var responseMap = {
    0: "falsa.",
    1: "verdadeira."
}


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    /*
    if (msg.author.id != 608061775157657620) {
        var usr = msg.author.username;
        console.log(msg)
        var replyIndex = Math.floor((Math.random() * 2) + 1);
        msg.channel.send(possibleReplies[replyIndex] + ` ${msg.author}`);
    }
    */
   var query = msg.mentions._content;
   var queryArray = query.split(' ');
   for (var j = 0; j < queryArray.length; j++) {
       queryArray[j] = queryArray[j].toLowerCase();
   }
   for (var i = 0; i < data.length; i++) {
       var notInOverlap = queryArray.filter( function(n) { return !this.has(n) }, new Set(data[i][0]) );
       var coverage = ((queryArray.length - notInOverlap.length) * 100 / queryArray.length);
       console.log(coverage)
       if (queryArray.length < 5 && coverage > 80) {
            msg.channel.send("Esta notícia é " + responseMap[data[i][1]]);
            break;
       }
       else if (queryArray.length >= 5 && coverage > 40) {
            msg.channel.send(`${msg.author}` + " Não gostei, esta notícia é " + responseMap[data[i][1]]);
            break;
       }
   }
});

/*
var check= ["044", "451"],
data = ["343", "333", "044", "123", "444", "555"];

var res = check.filter( function(n) { return !this.has(n) }, new Set(data) );

console.log(res);
*/

client.login(token);
