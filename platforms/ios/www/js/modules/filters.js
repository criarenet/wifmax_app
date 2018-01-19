$(document).ready(function () {
    //getCompaniesList();
    getRoutersByCompany();
});
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
        buildRoutersList('#routersList', json.result);
    });
};

var buildRoutersList = function (id, data, callback) {
    $(id).html('');
    
    var selectAll = '<li data-idrouter="'+gIdCompany+'" data-type="allRouters" onclick="showHotspots(this)" class="list-group-item\n\
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

var showHotspots = function (router) {
    var container = $('#hotspotList');
    var idRouter = $(router).attr('data-idRouter');

    var hotspots = getHotspotsByRouter(idRouter);

    $(container).html('');

    var selectAll = '<li data-idrouter="' + idRouter + '" data-type="allRouters" onclick="backToRouters()" class="list-group-item\n\
                     waves-light-blue">Selecionar todos<span>\n\
                     <div class="demo-google-material-icon"> <i style="color:#8BC34A;" class="material-icons">check_box</i></li>';
    $(container).append(selectAll);
    $.each(hotspots.groupRows, function (i, v) {
        var hotspot = '<li data-idhotspot="' + v.idHotspot + '" onclick="" class="list-group-item\n\
                     waves-light-blue">' + v.ssid + '<span>></span></li>';
        $(container).append(hotspot);
    });
    var titleHotspot = '<i class="material-icons" style="font-size: 30px;">signal_wifi_4_bar</i>\n\
                        <span style="position: absolute;top: 15px;margin-left: 5px; font-size: 24px;">Hotspots</span>';
    $(container).addClass('showFilter');
    setTimeout(function(){$('#carouselFilter h4').html(titleHotspot);},300);
};

var backToRouters = function(){
    
    var titleHotspot = '<i class="material-icons" style="font-size: 30px;">router</i>\n\
    <span style="position: absolute;top: 15px;margin-left: 5px; font-size: 24px;">Roteadores</span>';
    
    $('#hotspotList').removeClass('showFilter');
    setTimeout(function(){$('#carouselFilter h4').html(titleHotspot);},300);
    
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