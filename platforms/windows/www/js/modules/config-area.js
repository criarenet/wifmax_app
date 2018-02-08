$(document).ready(function () {
    //initButtonsAnalytics();
    $('#btConfigArea').on('click', function(){
        $('#btConfigArea').addClass('rubberBand animated');
        setTimeout(function(){
            showHideConfigArea();
        },200);
    });
    $('#btCloseConfigArea').on('click', function(){
            $('#btConfigArea').removeClass('selected rubberBand animated');
            
            showHideConfigArea();
    });
});

var showHideConfigArea = function (callback) {
    var filters = $('#wrapperConfigArea');
    var classOpen = 'bounceInUp animated';
    var classClose = 'bounceOutDown animated';

    if (filters.hasClass('bounceInUp')) {
        filters.addClass(classClose);
        setTimeout(function(){
            
            //$('#carouselFilter').css('opacity', '0');
            
            filters.hide();
            filters.attr('class', 'row');
        },300);
    }else{
        filters.show();
        filters.addClass(classOpen);
        setTimeout(function(){
            //$('#carouselFilter').css('opacity', '1');
        },300);
    }
};