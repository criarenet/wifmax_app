$(document).ready(function () {
    getContactListSize();
    $('#btSearchContacts').on('click', loadContactsList);
});

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
    
    if (!$('#cboLastVisit').val()) {
        var txt = 'É necessário selecionar o período da última visita.';
        var title = 'Aviso';
        showNotifyContacts(title, txt);
        return;
    }
    
    var period = getLastVisit('1');
    query = 'idCompany='+idCompany+'&idRouter='+idRouter+'&idHotspot='+idHotspot+'&initialDate='+period[1]+'&finalDate='+period[0];
    query += '&page=1&pageSize=50';

    //console.log(query)
    
    //return;
    
    $('#contactsBody .loaderLine').show();
    var obj = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };
    request(obj, function (json) {
        $('#contactsBody .loaderLine').hide();
        if (json.result) {
            listUser('#contactsList', json.result.data, true, '');
        }
    });
};


paginationContacts = function(){
    $('#contactsBody .loaderLine').show();
    var obj = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };
    request(obj, function (json) {
        $('#contactsBody .loaderLine').hide();
        if (json.result) {
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
        var item = '<li class="list-group-item">\n\
                    <span style="width: 15%;"><i class="material-icons '+v.gender+'">account_circle</i></span>\n\
                    <span style="width: 65%;">' + v.userName + '<br><a>' + v.email + '</a></span>\n\
                    <span style="width: 15%; text-align: center;">' + v.visits + '</span></li>';
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
    var top = 160;
    var listSize = (wrapp - top);
    $('#contactsList').height(listSize);
};

var showNotifyContacts = function (title, txt) {
    $.notify('<strong>'+title+'</strong><br>' + txt, {
        allow_dismiss: true,
        timer: 4000,
        animate: {
            enter: 'animated bounceInUp',
            exit: 'animated bounceOutDown'
        }
    });
}