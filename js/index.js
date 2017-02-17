$(function() {
    Qrcode.init($('[node-type=qr-btn]'));
});
$('.ui-icon-close').click(function(){
    $(this).parent().find('input[type="text"]').val('');
})
