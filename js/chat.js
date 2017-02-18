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


    $('.ui-list').css({'height':document.documentElement.clientHeight - $('.ui-header').height() - $('footer').height()});
    function postMes(){
        socket.emit('chatMessage', {'room':roomNum,'name':name ,'mes': $('#message').val()});
        $('#message').val('');
    }

    function emitMes(data, cName){
        if(data.room == roomNum){
            $('.ui-list').append('<li><h4 class="' + cName + '">'+data.mes+'</h4><p>'+data.name+'</p></li>');
        }
    }
    function updataScroll(){
        $('.ui-list').scrollTop($('.ui-list')[0].scrollHeight);
    }


    $('#roomNum').html('('+roomNum+')');

    /*按下回车键发送消息*/
    $('#postMessage').on('click', function(){
       postMes();
    })

    $('#message').on('keypress', function(event){
        if(event.keyCode == 13){
            postMes();
        }
    })

    socket.on('chatMessage', function(data){
        emitMes(data, 'dialog');
        updataScroll();

    })
    socket.on('newFriend', function(data){
        emitMes(data, 'dialog');
        updataScroll();
    })
    socket.on('myMessage', function(data){
        emitMes(data, 'my-dialog');
        updataScroll();
    })
})();
