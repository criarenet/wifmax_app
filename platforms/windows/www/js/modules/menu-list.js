$(document).ready(function () {
    initMenuLeft();
});

var initMenuLeft = function(){
    
    $('#btCloseLandscapeCharts').on('click', function () {
        $('#userOnlineStatisticChart').html('');
        $('#newRegistersStatisticChart').html('');
        $('#genderAgeChart').html('');
        $('#conversionChart').html('');
        $('#headerLandscapeCharts .nav-wrapper').removeClass('viewing');
        //$('.chartBoxLandscape h3').removeClass('viewing');
        setTimeout(function () {
            setScreenOrientation('portrait', function () {
                openLandscapeCharts('');
            });
        }, 200);
    });
    $('#btClosePortraitCharts').on('click', function () {
        //$('#wrapperVouchersControl').hide();
        $('#headerPortraitCharts .nav-wrapper').removeClass('viewing');
        
        $('#wrapperVouchersControl').removeClass('viewing');
        setTimeout(function(){
            $('#wrapperVouchersControl').hide();
            $('#detailsVouchers ul').html('');
            $('#voucherChart').html('');
            
            $('#wrapperRedirectControl').hide();
            $('#detailsRedirects ul').html('');
            $('#redirectChart').html('');
        },100);
        setTimeout(function () {
            openPortratCharts('');
        },200);
        //$('.chartBoxLandscape h3').removeClass('viewing');
    });
    
    $('#menuLeftStatistics').on('click', function(){
        $('.pag').removeClass('viewing');
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
        $('.pag').removeClass('viewing');
        $('#pagSelectedTitle').text('Dashboard').css('color', '#787ee8');
        reporstSelecteds = 'dashboard';
        openPage('#dashBoardContainer', function(){
            setTimeout(function(){
                $('#dashBoardContainer').addClass('viewing');
            },200);
            //buildDashBoard(gQuery);
        });
        typeFilterDate = 'noDate';
    });
    
    $('#menuLeftAnalytics').on('click', function(){
        $('.pag').removeClass('viewing');
        $('#pagSelectedTitle').text('Analytics').css('color', '#fd2646');
        reporstSelecteds = 'analytics';
        openPage('#analyticsContainer', function(){
            var query = buildQuery();
            $('#pieChartGender').html('');
            setTimeout(function(){
                $('#analyticsContainer').addClass('viewing');
                setTimeout(function(){
                    loadDataAnalytics(query);
                },120);
            },200);
        });
        typeFilterDate = 'useData';
    });
    
    $('#menuLeftContacts').on('click', function(){
        $('.pag').removeClass('viewing');
        $('#pagSelectedTitle').text('Lista de contatos').css('color', '#34bfe0');
        reporstSelecteds = 'contacts';
        openPage('#contactsContainer', function(){
            setTimeout(function(){
                $('#contactsContainer').addClass('viewing');
            },200);
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