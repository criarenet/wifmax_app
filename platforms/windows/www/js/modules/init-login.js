﻿var loginHash;
function onLoad() {
    setTimeout(function () {
        verifyPrintLogin()
    }, 2000);
    document.addEventListener("deviceready", onDeviceReady, false);
}
function onDeviceReady() {
    //document.addEventListener("pause", onPause, false);
    //document.addEventListener("resume", onResume, false);
    //document.addEventListener("menubutton", onMenuKeyDown, false);
    setScreenOrientation('portrait');
    verifyPrintLogin();
}
var setScreenOrientation = function (position, callback) {
    screen.orientation.lock(position);
    if (callback) {
        setTimeout(function () {
            callback();
        }, 400);
    }
};

var verifyPrintLogin = function () {

    var userTrue = function (data) {
        if (!data.length) {
            $('.loaderLine').fadeOut(10, function () {
                setTimeout(function () {
                    $('#logoLoginArea').addClass('loaded');
                }, 50);
            });
        } else {
            //alert(data[0].idCompany +'eeeeeee'+ data[0].hash64)
            gIdCompany = data[0].idCompany;
            loginHash = data[0].hash64;
            
            getCompaniesLsit(function(){
                $('#wrappLogin').fadeOut(100, function () {
                    setTimeout(function () {
                        startDashBoard();
                    }, 100);
                });
            });
            
        }
    };
    setTimeout(function () {
        getUser(userTrue)
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

    $('#logoLoginArea').removeClass('loaded');
    setTimeout(function () {
        $('.loaderLine').fadeIn()
    }, 150);

    var query = 'username=' + login + '&password=' + password;
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
        });


//        $('#wrappLogin').fadeOut(100, function () {
//            getRoutersByCompany(function () {
//                getListSize();
//                startDashBoard();
//            });
//        });
    });
};