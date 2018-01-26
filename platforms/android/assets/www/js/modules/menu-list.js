$(document).ready(function () {
    initMenuLeft();
});

var initMenuLeft = function(){
    $('#menuLeftStatistics').on('click', function(){
        $('#pagSelectedTitle').text('Estatísticas').css('color', '#22bd9a');
        openPage('#statisticsContainer', countUpStatisticNumbers);
        typeFilterDate = 'useData';
    });
    
    $('#menuLeftDashboard').on('click', function(){
        $('#pagSelectedTitle').text('Dashboard').css('color', '#787ee8');
        
        openPage('#dashBoardContainer', function(){
            //buildDashBoard(gQuery);
        });
        typeFilterDate = 'noDate';
    });
};

var openPage = function (pag, callback) {
    $('.pag').hide();
    $(pag).show();
    setTimeout(function () {
        showHideMenuLeft();
        if (callback) {
            setTimeout(function () {
                callback();
            }, 200);
        }
    }, 30);
};