﻿$(document).ready(function () {
    
    $('#dateTabBts li').on('click', function(){

        $('#dateTabBts li').removeClass('selected');
        $('.tab-pane').removeClass('animated flipInX active');
        $(this).addClass('selected');
        var containner = $(this).attr('data-tabselected');
        $(containner).addClass('animated flipInX active');
    });
});

var getListSize = function () {
    var allHeight = $(window).height();
    var top = 55;

    var bottom = 45;
    var listSize = (allHeight - top) - bottom;
    $('#carouselFilter').height(listSize);
    $('#routersList, #hotspotList, #filterDate').height(listSize);
    $('.btBackRouters').on('click', function(){
        showRouterHotspots();
        //$('#hotspotList').removeClass('showFilter');
    });
};

var getRoutersByCompany = function (callback, ids, extCallback) {
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
        var selected = '';
        if(ids && ids[0]){
            selected = ids[0];
        }
        window.actualRoutersList = json.result;
        buildRoutersList('#routersList ul', json.result, callback, ids, selected, extCallback);
    });
};

var buildRoutersList = function (id, data, callback, ids, selected, extCallback) {
    $(id).html('');
    getListSize();
    var selectAll = '<li data-idrouterCompany="'+gIdCompany+'" data-type="allRouters" onclick="showHotspots(this, showRouterHotspots)" class="list-group-item\n\
                     waves-light-blue">Selecionar todos <span>></span></li>';
//                     <div class="demo-google-material-icon"> <i style="color:#8BC34A;" class="material-icons">check_box</i></li>';
    $(id).append(selectAll);
    
    $.each(data, function (i, v) {
        var checked;
        
        if (selected == v.groupAttributes.idRouter) {
            checked = '<span><div class="demo-google-material-icon"> <i style="color:#8BC34A;" class="material-icons">check_box</i></div></span>';
            //$('#chosenFilters h6').html('<span>Empresa - ' + v.name + '</span>');
            //gCompanyNameSeleceted = v.name;
        } else {
            checked = '<span>></span>';
        }
        
        var item = '<li data-idrouter="'+ v.groupAttributes.idRouter +'" onclick="showHotspots(this, showRouterHotspots)" class="list-group-item\n\
                     waves-light-blue">'+ v.groupAttributes.routerAlias + checked + '</li>';
        $(id).append(item);
    });
    
    var selRouter = $('#routersList ul li i').parent().parent().parent();
    
    if(ids && ids[1]){
        showHotspots(selRouter, showRouterHotspots, extCallback, ids[1]);
    }else{
        //showHotspots(selRouter, showRouterHotspots, extCallback, '');
        if (extCallback) {
            extCallback();
        }
    }
//    if(parseInt(ids[0])){
//        var firstRouterSelected = $('#routersList ul li').attr('data-idRouter', ids[0]);
//        console.log(firstRouterSelected)
//        showHotspots(firstRouterSelected, showRouterHotspots);
//    }
    
    if (callback) {
        callback();
    }
    
};


var showRouterHotspots = function (callback) {
    var filters = $('#hotspotList');
    var classOpen = 'slideInLeft animated';
    var classClose = 'slideOutLeft animated';

    if (filters.hasClass('slideInLeft')) {
        filters.addClass(classClose);
        setTimeout(function(){
            $('#hotspotList ul').css('opacity', '0');
            filters.hide();
            filters.attr('class', 'filterList');
        },500);
    }else{
        
        filters.addClass(classOpen);
        setTimeout(function(){
            filters.show();
        },1);
        setTimeout(function(){
            $('#hotspotList ul').css('opacity', '1');
        },500);
    }
    if(callback){
        setTimeout(function(){
            callback();
        },500);
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

var showHotspots = function (router, callback, extCallback, idHot) {
    var container = $('#hotspotList ul');
    var idRouter = $(router).attr('data-idRouter');
    
    if(!idRouter){
        setItemFilterSelected(router, 'routersList');
        return;
    }
    
    upDateRouter(idRouter);
    
    var selected = $(router).children('span').html().indexOf('check_box');
    //console.log(selected, idHot)
    if (selected > 0 && $('#hotspotList ul li').length) {
        if (callback) {
            callback();
        }
        if (extCallback) {
            extCallback();
        }
        return;
    }

    var hotspots = getHotspotsByRouter(idRouter);
    $(container).html('');
    var selectAll = '<li data-idrouter="' + idRouter + '" data-type="allRouters" onclick="backToRouters(this)" class="list-group-item\n\
                     waves-light-blue">Selecionar todos<span>></span></li>';
    $(container).append(selectAll);
    $.each(hotspots.groupRows, function (i, v) {
        var checked;
        if (idHot && idHot == v.idHotspot) {
            checked = '<span><div class="demo-google-material-icon"> <i style="color:#8BC34A;" class="material-icons">check_box</i></div></span>';
            //$('#chosenFilters h6').html('<span>Empresa - ' + v.name + '</span>');
            //gCompanyNameSeleceted = v.name;
        } else {
            checked = '<span>></span>';
        }
        
        
        var hotspot = '<li data-idhotspot="' + v.idHotspot + '" onclick="backToRouters(this)" class="list-group-item\n\
                     waves-light-blue">' + v.ssid + checked + '</li>';
        $(container).append(hotspot);
    });
    
    if(callback){
        callback();
    }
    if(extCallback){
        extCallback();
    }
    //$('#hotspotList').addClass('showFilter');
    setTimeout(function () {
        setItemFilterSelected(router, 'routersList');
    }, 100);
};

var backToRouters = function (hotspot) {
    //$('#hotspotList').removeClass('showFilter');
    showRouterHotspots();
    var idHotspot = $(hotspot).attr('data-idhotspot');
    //alert(idHotspot);
    if(idHotspot){
        upDateHotspot(idHotspot);
    }
    
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