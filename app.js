var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(4000);

var roomNum = [], _thisNum, lock = 0;

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
    })
    .all('/room', function(req, res){
    var thisNum = req.url.slice(6).split(',');
    roomNum.push(thisNum[0]);
    if(lock == 0){
        lock = 1;
        _thisNum = thisNum[0];
        res.send(null);
    }else{}
    })


io.on('connection', function (socket) {
    console.log('a user connected');
    if(lock == 1){
        socket.broadcast.emit('newFriend', {'room':_thisNum,'name':'机器人','mes':'有新朋友来啦！'});
        lock = 0;
    }
    socket.on('chatMessage', function (data) {
        socket.broadcast.emit('chatMessage', {'room':data.room,'name': data.name,'mes': data.mes});
        socket.emit('myMessage', {'room':data.room,'name':data.name,'mes':data.mes});
    });
});
io.emit('some event', { for: 'everyone'});
