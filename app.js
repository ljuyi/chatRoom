var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(4000);

var roomInfo = [];

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

    //获取房间号
    for(var i in roomInfo) {
        if (roomInfo[i].roomid == thisNum[0]) {
            roomInfo[i].member.push(thisNum[1]);
            res.send(null);
        }
    }
    roomInfo.push({'roomid': thisNum[0], 'member': [thisNum[1]]});
    res.send(null);
    })


io.on('connection', function (socket) {
    console.log(socket.request.connection.remoteAddress + ' user connected'); // 获取客户端ip

    /*机器人广播*/
    socket.broadcast.emit('newFriend', {'room':socket.handshake.query.roomNum,'name':'robot','mes':socket.handshake.query.name + '进入房间'});

    /*聊天消息广播*/
    socket.on('chatMessage', function (data) {
        socket.broadcast.emit('chatMessage', {'room':data.room,'name': data.name,'mes': data.mes});
        socket.emit('myMessage', {'room':data.room,'name':data.name,'mes':data.mes});
    });

    /*用户离开房间广播*/
    socket.on('disconnect', function(){
        console.log(socket.request.connection.remoteAddress + ' user disconnect');

        socket.broadcast.emit('leaveFriend', {'room':socket.handshake.query.roomNum,'name':'robot','mes':socket.handshake.query.name + '离开房间'});

    })
});

