$(function() {
    Qrcode.init($('[node-type=qr-btn]'));
});
$('.ui-icon-close').click(function(){
    $(this).parent().find('input[type="text"]').val('');
    $('div.ui-btn-primary').addClass('disabled');
    $('div.ui-btn-primary').html('给自己起个名字吧！');
});

(function(){
    $('div.ui-btn-primary').addClass('disabled');
    $('div.ui-btn-primary').html('给自己起个名字吧！');

    $('#name').on('change', function(){
        if($(this).val() == '' || $(this).val() == null){
            $('div.ui-btn-primary').addClass('disabled');
            $('div.ui-btn-primary').html('给自己起个名字吧！');
        }else{
            $('div.ui-btn-primary').removeClass('disabled')
            $('div.ui-btn-primary').html('扫一扫');
        }
    })
})();
