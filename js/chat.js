window.onload = function(){
    //字体设置
    fontSelf();
};
window.onresize = function () {
    fontSelf();
};
function fontSelf() {
    var wHtml = $('html')[0];
    var w = document.documentElement.clientWidth;
    w =  w > 768 ? 768 : document.documentElement.clientWidth;
    wHtml.style.fontSize = w * 0.045 + 'px';
}
(function(){
    var roomNum =  localStorage.getItem('roomid'); //获取房间号
    var name = localStorage.getItem('name');
    var socket = io.connect('http://localhost:4000?roomNum=' + roomNum + '&name=' + name);   //建立连接请求，并发送房间号到服务器端


    $('#roomNum').html('('+roomNum+')');

    /*按下回车键发送消息*/
    $('#message').on('keypress', function(event){
        if(event.keyCode == 13){
            socket.emit('chatMessage', {'room':roomNum,'name':name ,'mes': $('#message').val()});
            $('#message').val('');
        }
    })
    socket.on('chatMessage', function(data){
        if(data.room == roomNum){
            $('.ui-tab-content .ui-list').append('<li><p>'+data.name+'</p><h4 class="dialog">'+data.mes+'</h4></li>');
        }
    })
    socket.on('newFriend', function(data){
        if(data.room == roomNum){
            $('.ui-tab-content .ui-list').append('<li><p>'+data.name+'</p><h4 class="dialog">'+data.mes+'</h4></li>');
        }
    })
    socket.on('myMessage', function(data){
        if(data.room == roomNum){
            $('.ui-tab-content .ui-list').append('<li><h4 class="my-dialog">'+data.mes+'</h4><p>'+data.name+'</p></li>');
        }
    })
})();
