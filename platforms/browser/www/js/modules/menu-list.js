$(document).ready(function () {
    initMenuLeft();
});

var initMenuLeft = function(){
    $('#menuLeftStatistics').on('click', function(){
        $('#pagSelectedTitle').text('Estatísticas').css('color', '#22bd9a');
        reporstSelecteds = 'statistics';
        //console.log(reporstSelecteds);
        openPage('#statisticsContainer', function(){
            var query = buildQuery();
            getDataStatistics(query);
            setTimeout(function(){
                $('#statisticsContainer').addClass('viewing');
            },200);
        });
        typeFilterDate = 'useData';
    });
    
    $('#menuLeftDashboard').on('click', function(){
        $('#pagSelectedTitle').text('Dashboard').css('color', '#787ee8');
        reporstSelecteds = 'dashboard';
        openPage('#dashBoardContainer', function(){
            //buildDashBoard(gQuery);
        });
        typeFilterDate = 'noDate';
    });
    
    $('#menuLeftAnalytics').on('click', function(){
        $('#pagSelectedTitle').text('Analytics').css('color', '#fd2646');
        reporstSelecteds = 'analytics';
        openPage('#analyticsContainer', function(){
            //buildDashBoard(gQuery);
            setTimeout(function(){
                $('#analyticsContainer').addClass('viewing');
                setTimeout(function(){
                    getDataAnalytics();
                },120);
            },200);
        });
        typeFilterDate = 'useData';
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