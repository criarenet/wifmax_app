$(document).ready(function () {
    
    $('#dateTabBts li').on('click', function(){

        $('#dateTabBts li').removeClass('selected');
        $('.tab-pane').removeClass('animated flipInX active');
        $(this).addClass('selected');
        var containner = $(this).attr('data-tabselected');
        $(containner).addClass('animated flipInX active');
    });
    
    //getRoutersByCompany(getListSize);
    
//    $('#changeDatePeriod').on('change', function(){
//        $('.panelTab').removeClass('selected');
//        var date = $('.panelTab')[0];
//        var period = $('.panelTab')[1];
//        if($('#changeDatePeriod:checked').length){
//            $(period).addClass('selected');
//        }else{
//            $(date).addClass('selected');
//        }
//    });
    
});

var getListSize = function () {
    var allHeight = $(window).height();
    var top = 55;
    
    var bottom = 45;
    var listSize = (allHeight - top) - bottom;
    $('#carouselFilter').height(listSize);
    $('#routersList, #hotspotList, #filterDate').height(listSize);
    $('.btBackRouters').on('click', function(){
        $('#hotspotList').removeClass('showFilter');
    });
};

var getRoutersByCompany = function (callback) {
    var url = wifimaxApp.url.GET_ROUTERS_BY_COMPANIES;
    //var url = 'https://api.myjson.com/bins/1he11h';
    var query = 'idCompany='+gIdCompany;
    var obj = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };
    
    request(obj, function (json) {
        window.actualRoutersList = json.result;
        buildRoutersList('#routersList ul', json.result, callback);
    });
};

var buildRoutersList = function (id, data, callback) {
    $(id).html('');
    
    var selectAll = '<li data-idrouterCompany="'+gIdCompany+'" data-type="allRouters" onclick="showHotspots(this)" class="list-group-item\n\
                     waves-light-blue">Selecionar todos<span>\n\
                     <div class="demo-google-material-icon"> <i style="color:#8BC34A;" class="material-icons">check_box</i></li>';
    $(id).append(selectAll);
    $.each(data, function (i, v) {
        //console.log(v);
        var item = '<li data-idrouter="'+v.groupAttributes.idRouter+'" onclick="showHotspots(this)" class="list-group-item\n\
                     waves-light-blue">'+v.groupAttributes.routerAlias+'<span>></span></li>';
        $(id).append(item);
    });
    if (callback) {
        callback();
    }
};

var setItemFilterSelected = function(conatiner, wrapp){
    $('#'+wrapp+' ul li span').html('>');
    $(conatiner).children('span').html('<div class="demo-google-material-icon"> <i style="color:#8BC34A;" class="material-icons">check_box</i></div>');
    var listSeleceted;
    if(wrapp === 'routersList'){
        listSeleceted = 'Roteador - ';
        if($(conatiner).text().replace(' check_box', '') === 'Selecionar todos'){
            $('#chosenFilters h6').html('<span>Empresa - '+ gCompanyNameSeleceted +'</span>');
            return;
        }
    }else{
        listSeleceted = 'Hotspot - ';
        if($(conatiner).text().replace(' check_box', '') === 'Selecionar todos'){
            return;
        }
    }
    $('#chosenFilters h6').html('<span>'+ listSeleceted + $(conatiner).text().replace(' check_box', '') +'</span>');
};

var showHotspots = function (router) {
    var container = $('#hotspotList ul');
    var idRouter = $(router).attr('data-idRouter');
    
    if(!idRouter){
        setItemFilterSelected(router, 'routersList');
        return;
    }
    
    var selected = $(router).children('span').html().indexOf('check_box');
    if (selected > 0) {
        $('#hotspotList').addClass('showFilter');
        return;
    }

    var hotspots = getHotspotsByRouter(idRouter);
    $(container).html('');
    var selectAll = '<li data-idrouter="' + idRouter + '" data-type="allRouters" onclick="backToRouters(this)" class="list-group-item\n\
                     waves-light-blue">Selecionar todos<span>\n\
                     <div class="demo-google-material-icon"> <i style="color:#8BC34A;" class="material-icons">check_box</i></li>';
    $(container).append(selectAll);
    $.each(hotspots.groupRows, function (i, v) {
        var hotspot = '<li data-idhotspot="' + v.idHotspot + '" onclick="backToRouters(this)" class="list-group-item\n\
                     waves-light-blue">' + v.ssid + '<span>></span></li>';
        $(container).append(hotspot);
    });
    $('#hotspotList').addClass('showFilter');
    setTimeout(function () {
        setItemFilterSelected(router, 'routersList');
    }, 100);
};

var backToRouters = function (hotspot) {
    $('#hotspotList').removeClass('showFilter');
    setTimeout(function () {
        setItemFilterSelected(hotspot, 'hotspotList');
    }, 100);
};

var getHotspotsByRouter = function (id) {
    var idRouter = parseInt(id);

    for (var i = 0; i <= actualRoutersList.length; i++) {
        if (actualRoutersList[i].groupAttributes.idRouter === idRouter) {
            return actualRoutersList[i];
        }
    }
};



var getCompaniesList = function (callback) {
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
        buildCompaniesList(json.result);
    });
};

var buildCompaniesList = function(data){
    if(data.length == 1){
        buildRouterList(data[0].idCompany);
    }
};

var buildRouterList = function(idCompany){
    
};