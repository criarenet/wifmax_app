var wifimaxApp = {};
var gIdCompany = '11';

var request = function (obj, callback) {
    //$('.page-loader-wrapper').css('opacity', 0.9).fadeIn(100);
    if(obj.noLoader){
        window.gNoLoader = true;
    }else{
        $('#wrapperLoader').fadeIn();
    }
    setTimeout(function () {
        $.ajax({
            headers:{
                'Authorization': 'Basic ' + loginHash
            },
            contentType: obj.contentType ? obj.contentType : 'application/json; charset=utf-8',
            type: obj.type ? obj.type : 'POST',
            url: obj.url,
            data: obj.query ? obj.query : '',
            complete: function (e, xhr, settings) {
                if (gNoLoader) {
                    gNoLoader = false;
                } else {
                    $('#wrapperLoader').hide();
                }
                if (e.status >= 200 && e.status < 400) {
                    if (callback) {
                        callback(e.responseJSON);
                    }
                } else if (e.status === 401) {
                    var obj={
                        title: 'Sessão inválida',
                        text: 'Por favor entre novamente no sistema',
                        type: "warning"
                    };
                    showMessages(obj, function () {
                        window.location.href = contextPath + "/logoff"
                    });
                } else {
                    var txt = e.responseJSON.message;
                    alert(txt);
                    if (obj && obj.errorType === 'login') {
                        //showNotification('bg-deep-orange', txt, 'top', 'center');
                    }else{
                        var obj = {
                            title: 'Erro',
                            text: txt,
                            type: "error"
                        };
//                        showMessages(obj, function () {
//                            
//                        });
                    }
                }
                //$('.page-loader-wrapper').fadeOut();
            }
        });
    }, 100);
};

$.event.special.scrolldelta = {
    // from http://learn.jquery.com/events/event-extensions/
    delegateType: "scroll",
    bindType: "scroll",
    handle: function (event) {
        var handleObj = event.handleObj;
        var targetData = jQuery.data(event.target);
        var ret = null;
        var elem = event.target;
        var isDoc = elem === document;
        var oldTop = targetData.top || 0;
        var oldLeft = targetData.left || 0;
        targetData.top = isDoc ? elem.documentElement.scrollTop + elem.body.scrollTop : elem.scrollTop;
        targetData.left = isDoc ? elem.documentElement.scrollLeft + elem.body.scrollLeft : elem.scrollLeft;
        event.scrollTopDelta = targetData.top - oldTop;
        event.scrollTop = targetData.top;
        event.scrollLeftDelta = targetData.left - oldLeft;
        event.scrollLeft = targetData.left;
        event.type = handleObj.origType;
        ret = handleObj.handler.apply(this, arguments);
        event.type = handleObj.type;
        return ret;
    }
};

function mascaraData(field) {
    var data = field.value;
    data = data.replace(/([A-Z]|\/)+/ig, '').split('');
    if (data.length > 2) {
        data.splice(2, 0, "/");
    }
    if (data.length > 5) {
        data.splice(5, 0, "/");
    }
    field.value = data.join('');
}

var getToday = function () {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear();
    return output;
}