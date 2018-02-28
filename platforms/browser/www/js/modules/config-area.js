$(document).ready(function () {
    //initButtonsAnalytics();
    //getCompaniesLsit();
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
    
    
    $('#btLogout').on('click', function(){
        
        db.transaction(function (tx) {
            tx.executeSql('DROP TABLE IF EXISTS USERS');
        });
        
        location.reload();
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

var getCompaniesLsit = function (callback) {
    //StatusBar.hide();
    var url = wifimaxApp.url.GET_COMPANIES;
    //var url = 'https://api.myjson.com/bins/1he11h';
    var query = '';
    var obj = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };

    request(obj, function (json) {
        var cback;
        if(json.result.length > 1){
            cback = function(){
                if(!gIdCompany || gIdCompany == 1){
                    //alert(gIdCompany)
                    $('#btConfigArea').click();
                }else{
                    getRoutersByCompany(function () {
                        getListSize();
                        //$('#btApplyFilters').click();
                        //startDashBoard();
                    });
                }
                setTimeout(function(){
                    callback();
                },1000);
            };
        }else{
            cback = function(){
                getRoutersByCompany(function () {
                    getListSize();
                    //$('#btApplyFilters').click();
                    startDashBoard();
                });
                callback();
            };
        }
        listCompany('#companies', json.result, cback);
    });
};

var listCompany = function (id, data, callback) {

    $(id).html('');
//    var mainCompany = '<li data-idCompany="' + gIdCompany + '" data-type="allRouters" onclick="showHotspots(this)" class="list-group-item\n\
//                     waves-light-blue">'+gCompanyNameSeleceted+'<span>\n\
//                     <div class="demo-google-material-icon"> <i style="color:#8BC34A;" class="material-icons">check_box</i></li>';
//    $(id).append(mainCompany);

    $.each(data, function (i, v) {
        //console.log(v);
        var onClickFunc;
        if (data.length != 1) {
            onClickFunc = 'setCompanySelected(this)';
        }else{
            onClickFunc = '';
        }
        var item = '<li data-idcompany="' + v.idCompany + '" onclick="'+onClickFunc+'" class="list-group-item\n\
                     waves-light-blue">' + v.name + '<span>></span></li>';
        $(id).append(item);
        if (data.length === 1) {
            $('#companies li span').html('<div class="demo-google-material-icon"> <i style="color:#8BC34A;" class="material-icons">check_box</i></div>')
            gCompanyNameSeleceted = v.name
            $('#chosenFilters h6').html('<span>Empresa - ' + v.name +'</span>');
            $('#companies li').off('click', setCompanySelected);
        }
    });
    
    

    if (callback) {
        callback();
    }
};

var setCompanySelected = function(conatiner, wrapp){
    
    wrapp = 'companies';
    
    $('#'+wrapp+' li span').html('>');
    gIdCompany = $(conatiner).attr('data-idcompany');
    upDateCompany(gIdCompany);
    $(conatiner).children('span').html('<div class="demo-google-material-icon"> <i style="color:#8BC34A;" class="material-icons">check_box</i></div>');
    gCompanyNameSeleceted = $(conatiner).html().split('<')[0];
    //showHideConfigArea();
    $('#btApplyFilters').click();
    setTimeout(function(){
            showHideConfigArea();
        },250);
    getRoutersByCompany(function () {
        getListSize();
        
        //startDashBoard();
        
        
    });
    var listSeleceted = 'Empresa - ';
    $('#chosenFilters h6').html('<span>'+ listSeleceted + $(conatiner).text().replace(' check_box', '') +'</span>');
};