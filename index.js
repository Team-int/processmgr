const Discord = require('discord.js');
const client = new Discord.Client();
const http = require('http');
const fs = require('fs');
const url = require('url');
let badWords = ['씨발', '시발', '병신', '개새끼', '게새끼', '지랄', '관종', '새끼', '세끼', '섹스', 'fuck', 'sex']
require('dotenv').config();
const server = http.createServer((req, res) => {
    let parsed = url.parse(req.url, true);
    res.writeHead(200);
    fs.readFile('./index.html', 'utf8', (err, data) => {
        res.end(data);
    });
});
client.login(process.env.TOKEN);
server.listen(4000);
const io = require('socket.io')(server);
io.on('connection', socket => {
    socket.on('new', data => {
        if (badWords.some(x => data.toLowerCase().replace(/\d/gi, '').includes(x))) return socket.emit('badWords')
        const embed = new Discord.MessageEmbed()
        .setTitle('새 건의')
        .setDescription(data)
        .setColor('RANDOM')
        .setTimestamp()
        client.channels.cache.get('759669885827022862').send(embed);
        socket.emit('done');
    });
});