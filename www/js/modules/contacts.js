var emptyListInfo = '<li class="infoChart"><i class="material-icons">info_outline</i><br>Não há informações disponíveis para os filtros atuais.</li>';
$(document).ready(function () {
    getContactListSize();
    $('#btSearchContacts').on('click', loadContactsList);
        
});


function chk_scroll(e)
{
    var elem = $(e.currentTarget);
    if (elem[0].scrollHeight - elem.scrollTop() <= elem.outerHeight())
    {
        //alert("bottom");
        paginationContacts();
    }

}



var startContacsLists = function () {
    var idRouter = $('#routersList ul li i').parent().parent().parent().attr('data-idRouter');
    var idHotspot = $('#hotspotList ul li i').parent().parent().parent().attr('data-idhotspot');
    var idCompany = gIdCompany;
    
    $('#onlineContactsList').html('');
    $('#onlineContactsList').html(emptyListInfo);

    $('#contactsList').html('');
    $('#contactsList').html(emptyListInfo);

    if (!idCompany || !idRouter || !idHotspot) {
        var txt = 'É necessário selecionar um hotspot para listar os contatos.';
        var title = 'Aviso';
        showNotifyContacts(title, txt);
        return;
    }
    loadContactsList();
    loadOnlineContacts();
}

var loadContactsList = function () {

    var url = wifimaxApp.url.GET_CONTACTS;
    var query; //buildQuery();

    var idRouter = $('#routersList ul li i').parent().parent().parent().attr('data-idRouter');
    var idHotspot = $('#hotspotList ul li i').parent().parent().parent().attr('data-idhotspot');
    var idCompany = gIdCompany;

    if (!idCompany || !idRouter || !idHotspot) {
        var txt = 'É necessário selecionar um hotspot para listar os contatos.';
        var title = 'Aviso';
        showNotifyContacts(title, txt);
        return;
    }

//    if (!$('#cboLastVisit').val()) {
//        var txt = 'É necessário selecionar o período da última visita.';
//        var title = 'Aviso';
//        showNotifyContacts(title, txt);
//        return;
//    }

    var period = getLastVisit('1');
    pagQuery = 'idCompany=' + idCompany + '&idRouter=' + idRouter + '&idHotspot=' + idHotspot + '&initialDate=' + period[1] + '&finalDate=' + period[0];
    pagQueryInd = 1;
    query = pagQuery + '&page=1&pageSize=50';
    
    //console.log(query)

    //return;

    $('#lastVisitLoader.loaderLine').show();
    var obj = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };
    request(obj, function (json) {
        $('#lastVisitLoader.loaderLine').hide();
        if (json.result.data.length) {
            listUser('#contactsList', json.result.data, true, '');
            if(json.result.data.length < 50){
                pagLimit = true;
            }else{
                pagLimit = false;
            }
        }else{
            $('#contactsList').html('');
            $('#contactsList').html(emptyListInfo);
        }
    });
};


var paginationContacts = function () {
    if(pagLimit){
        return;
    }
    var url = wifimaxApp.url.GET_CONTACTS;
    $('#lastVisitLoader.loaderLine').show();
    
    pagQueryInd = pagQueryInd + 1;
    var query = pagQuery + '&page='+pagQueryInd+'&pageSize=50';
    
    var obj = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };
    request(obj, function (json) {
        $('#lastVisitLoader.loaderLine').hide();
        if (json.result.data.length) {
            if(json.result.data.length < 50){
                pagLimit = true;
            }else{
                pagLimit = false;
            }
            listUser('#contactsList', json.result.data, false, '');
            
        }
    });
}


var listUser = function (id, data, reset, callback) {
    if (reset) {
        $(id).html('');
    }
    $.each(data, function (i, v) {
        //console.log(v);
        var contactdata = $.param(v);//JSON.stringify(v);
        var item = '<li class="list-group-item">\n\
                    <i data-contactdata="'+contactdata+'" onclick="detailContac(this)" class="material-icons btViewMore">trending_flat</i>\n\
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"><span><i class="material-icons ' + v.gender + '">account_circle</i></span></div>\n\
                    <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10"><span><b>' + v.userName + '</b><br><a>' + v.email + '</a></span>\n\
                    <span>Última conexão - ' + v.lastConnection + '</span></div></li>';
        $(id).append(item);
    });
};

var loadOnlineContacts = function () {

    var url = wifimaxApp.url.GET_ONLINE_CONTACTS;
    var query = buildQuery();

    $('#onlineLoader.loaderLine').show();
    var obj = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };
    request(obj, function (json) {
        $('#onlineLoader.loaderLine').hide();
        if (json.result.length) {
            listOnlineUser('#onlineContactsList', json.result, false, '');
        } else {
            $('#onlineContactsList').html('');
            $('#onlineContactsList').html(emptyListInfo);
        }
    });
}
var listOnlineUser = function (id, data, callback) {

    $(id).html('');
    $.each(data, function (i, v) {
        var item = '<li class="list-group-item">\n\
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"><span><i class="material-icons">account_circle</i></span></div>\n\
                    <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10"><span><b>' + v.userName + '</b><br><a>' + v.email + '</a></span>\n\
                    <span>Tempo de conexão - ' + v.connectTime + '</span></div></li>';
        $(id).append(item);
    });
};


var getLastVisit = function (period) {
    var dateArr = [];
    switch (period) {
        case '1':
            dateArr.push(moment(new Date()).format("DD/MM/YYYY"));
            dateArr.push(moment().subtract(1, 'days').format("DD/MM/YYYY"));
            break;
        case '2':
            dateArr.push(moment(new Date()).format("DD/MM/YYYY"));
            dateArr.push(moment().subtract(7, 'days').format("DD/MM/YYYY"));
            break;
        case '3':
            dateArr.push(moment(new Date()).format("DD/MM/YYYY"));
            dateArr.push(moment().subtract(30, 'days').format("DD/MM/YYYY"));
            break;
    };
    return dateArr;
};

var getContactListSize = function () {
    var wrapp = $('#contactsContainer').height();
    var top = 129;
    var listSize = (wrapp - top);
    $('#contactsList').height(listSize);
    $('#onlineContactsList').height(listSize);
    setTimeout(function(){$("#contactsList").bind('scroll',chk_scroll);},100)
};

var showNotifyContacts = function (title, txt) {
    $.notify('<strong>' + title + '</strong><br>' + txt, {
        allow_dismiss: true,
        timer: 4000,
        animate: {
            enter: 'animated bounceInUp',
            exit: 'animated bounceOutDown'
        }
    });
}

var detailContac = function (bt) {
    
    var queryString = $(bt).attr('data-contactdata');
    var objDetails = QueryStringToJSON(queryString);
    
    openPortratCharts('', function () {
        setTimeout(function () {
            $('#headerPortraitCharts .nav-wrapper').addClass('viewing');
            $('#titlePortaitChart h3').text('Detalhes do contato');
            $('#wrapperContactDetail').show().addClass('viewing');
        }, 250);
    });
}

function QueryStringToJSON(qstr) {            
    var pairs = qstr.split('&');
    
    var result = {};
    pairs.forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });
    return JSON.parse(JSON.stringify(result));
}