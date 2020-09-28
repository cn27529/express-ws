//import express 和 ws 套件
const express = require('express')
const WebSocket = require('ws')

//指定開啟的 port
const PORT = 3000
const WSS_PORT = 8080

//創建 express 的物件，並綁定及監聽 3000 port ，且設定開啟後在 console 中提示
const app = express()

const path = require('path')

const {
    v4: uuidv4
} = require('uuid')

app.engine('.html', require('ejs').__express);

// Optional since express defaults to CWD/views

app.set('views', path.join(__dirname, 'views'));

// Path to our public directory

app.use(express.static(path.join(__dirname, 'public')));

// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html')

app.get('/', function (req, res) {
    res.send('Hello WebSocket')
});

// Dummy users
var users = [{
        name: 'tobi',
        email: 'tobi@gmail.com'
    },
    {
        name: 'loki',
        email: 'loki@gmail.com'
    },
    {
        name: 'jane',
        email: 'jane@gmail.com'
    }
];

app.get('/users', function (req, res) {
    res.render('index', {
        users: users,
        title: "users example",
        header: "Dummy users"
    })
});

app.listen(PORT, () => {
    console.log(`Express started on port ${PORT}`)
})

const wss = new WebSocket.Server({
    port: WSS_PORT
});

wss.on('connection', function connection(ws) {

    ws.on('message', function incoming(message) {
        console.log('client send: %s', message)
    });

    setInterval(() => {

        var uuid = uuidv4()
        ws.send(uuid);
        console.log('server send: %s', uuid)

    }, 1000)



});