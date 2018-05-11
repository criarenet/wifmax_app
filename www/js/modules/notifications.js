$(document).ready(function () {
    getNoticicationsListSize();
    
    $('.delArea').on('click', function(){
        console.log(this);
        $('.delArea').removeClass('confirmDel');
        $('.slideDel').removeClass('confirmDel');
        var _this = $(this)
        $(_this).parent().children('.slideDel').addClass('confirmDel');
        setEvtTodel($(_this).parent().children('.slideDel'));
        setTimeout(function(){
            $(_this).addClass('confirmDel');
        },200);
    });
});

var setEvtTodel = function (item) {
    $(item).on('touchstart', function (e) {
        e.preventDefault();
        var touch = e.touches[0];
        window.initX = touch.pageX;
    });
    $(item).on('touchmove', function (e) {
        e.preventDefault();
        var touch = e.touches[0];
        if (touch.pageX > initX) {
            $('.delArea').removeClass('confirmDel');
            setTimeout(function () {
                $('.slideDel').removeClass('confirmDel');
            }, 200);
        } else {
        }
    });
}

var getNoticicationsListSize = function () {
    var wrapp = $('#notificationsContainer').height();
    var top = 100;
    var listSize = (wrapp - top);
    $('#notificationList').height(listSize);
    setTimeout(function(){$("#contactsList").bind('scroll',chk_scroll);},100);
};

