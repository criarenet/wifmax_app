var loginHash;
function onLoad() {
    //StatusBar.hide();
//    setTimeout(function () {
//        verifyPrintLogin();
//        StatusBar.hide();
//    }, 2000);
    document.addEventListener("deviceready", onDeviceReady, false);
}
function onDeviceReady() {
    
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
        });


//        $('#wrappLogin').fadeOut(100, function () {
//            getRoutersByCompany(function () {
//                getListSize();
//                startDashBoard();
//            });
//        });
    });
};