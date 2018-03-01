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
        var db = window.openDatabase("dbAppWifimax", "1.0", "Wifimax app DB", 200000);
        db.transaction(function (tx) {
            tx.executeSql('DROP TABLE IF EXISTS APPDATABASE');
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

var getCompaniesLsit = function (callback, ids, login) {
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
        var cback = '', selected = '';


        if (json.result.length > 1) {
            if (gIdCompany == 1) {
                
                listCompany('#companies', json.result, '', '', function(){
                    callback();
                    setTimeout(function () {
                        $('#btConfigArea').click();
                    }, 100);
                });
                return;
            }
            
            if(login){
                listCompany('#companies', json.result, '', '', callback);
                return;
            }
            selected = gIdCompany;
            cback = callback;
        } else {
            if(login){
                listCompany('#companies', json.result, '', '', callback);
                return;
            }
            selected = gIdCompany;
            cback = callback;
        }
        listCompany('#companies', json.result, selected, ids, cback);
    });
};

var listCompany = function (id, data, selected, ids, callback) {
    $(id).html('');
    //alert(data.length)
    if (data.length === 1) {
        
        $('#companies').html('<li data-idcompany="' + data[0].idCompany + '" onclick="" class="list-group-item\n\
                    waves-light-blue">' + data[0].name + '<span><div class="demo-google-material-icon"> <i style="color:#8BC34A;" class="material-icons">\n\
                    check_box</i></div></span></li>');
        gCompanyNameSeleceted = data[0].name;
        $('#chosenFilters h6').html('<span>Empresa - ' + data[0].name + '</span>');
    } else {
        $.each(data, function (i, v) {
            var checked;
            if (selected === v.idCompany) {
                checked = '<div class="demo-google-material-icon"> <i style="color:#8BC34A;" class="material-icons">check_box</i></div>';
                $('#chosenFilters h6').html('<span>Empresa - ' + v.name + '</span>');
                gCompanyNameSeleceted = v.name;
            } else {
                checked = '<span>></span>';
            }
            var item = '<li data-idcompany="' + v.idCompany + '" onclick="setCompanySelected(this)" class="list-group-item\n\
                    waves-light-blue">' + v.name + checked + '</li>';
            $(id).append(item);
        });
    }
    if (ids[0]) {
        getRoutersByCompany(getListSize, ids, callback);
    }else{
        getRoutersByCompany(getListSize, '', callback);
//        if(callback){
//            callback();
//        }
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