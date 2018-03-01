var loginHash;

function onLoad() {
    //StatusBar.hide();
//    setTimeout(function () {
//        verifyPrintLogin();
//        var db = window.openDatabase("dbAppWifimax", "1.0", "Wifimax app DB", 200000);
//    db.transaction(createDB, errorCB, successCB);
//    }, 2000);
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    var db = window.openDatabase("dbAppWifimax", "1.0", "Wifimax app DB", 200000);
    db.transaction(createDB, errorCB, successCB);
    //document.addEventListener("pause", onPause, false);
    //document.addEventListener("resume", onResume, false);
    //document.addEventListener("menubutton", onMenuKeyDown, false);
    
    $('#frmLogin input').on("keydown", function (e) {
        if (e.keyCode === 13) {
            doLogin();
        }
    });
    
    $('#frmLogin input').focusout(function(){
        $('#logoLoginArea').removeClass('floating');
    });
    
    $('#frmLogin input').focus(function(){
        $('#logoLoginArea').addClass('floating');
    });
    
    setScreenOrientation('portrait');
    verifyPrintLogin();
    StatusBar.hide();
}

var setScreenOrientation = function (position, callback) {
    screen.orientation.lock(position);
    if (callback) {
        setTimeout(function () {
            callback();
        }, 600);
    }
};

var verifyPrintLogin = function () {

    var userTrue = function (tx, data) {
        //alert(data.rows.item(0).idCompany + data.rows.item(0).hash64);
        if (!data.rows.length) {
            $('.loaderLine').fadeOut(10, function () {
                setTimeout(function () {
                    $('#logoLoginArea').addClass('loaded');
                }, 50);
            });
        } else {
            //alert(data.rows.item(0).idCompany + data.rows.item(0).hash64);
            gIdCompany = data.rows.item(0).idCompany;
            loginHash = data.rows.item(0).hash64;
            var initRouter = data.rows.item(0).idRouter;
            var initHotspot = data.rows.item(0).idHotspot;
            
            var ids = [initRouter, initHotspot];
            
            getCompaniesLsit(function(){
                $('#wrappLogin').fadeOut(100, function () {
                    setTimeout(function () {
                        startDashBoard();
                    }, 100);
                });
            }, ids);
            
        }
    };
    setTimeout(function () {
        getUser(userTrue);
    }, 2000);
};

var doLogin = function () {
    var hashLogin;
    var login, password;

    login = $('input[name=userName]').val();
    password = $('input[name=password]').val();

    if (!login || !password) {
        $.notify('<strong>Falha</strong><br>' + 'Os campos Login e senha são obrigatórios', {
            allow_dismiss: true,
            timer: 4000,
            animate: {
                enter: 'animated bounceInUp',
                exit: 'animated bounceOutDown'
            }
        });
        return;
    }

    $('#logoLoginArea').removeClass('loaded floating');
    $('#frmLogin input').blur();
    $('.loaderLine').show();

    var query = 'username=' + login + '&password=' + encodeURIComponent(password);
    var obj = {
        url: wifimaxApp.url.LOGIN_USER,
        type: "POST",
        noLoader: true,
        query: query
    };

    request(obj, function (json) {
        hashLogin = btoa(login + ':' + password);
        
        addUser(login, hashLogin, json.idCompany);
        loginHash = hashLogin;
        gIdCompany = json.idCompany //json.idCompany 78 1 11;

        getCompaniesLsit(function () {
            $('#wrappLogin').fadeOut(100, function () {
                setTimeout(function () {
                    startDashBoard();
                }, 100);
            });
        }, '', true);


//        $('#wrappLogin').fadeOut(100, function () {
//            getRoutersByCompany(function () {
//                getListSize();
//                startDashBoard();
//            });
//        });
    });
};