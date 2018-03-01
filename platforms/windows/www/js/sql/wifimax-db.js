function createDB(tx) {
//    tx.executeSql('DROP TABLE IF EXISTS USERS');
//    tx.executeSql('DROP TABLE IF EXISTS LASTREQUESTS');
//    tx.executeSql('DROP TABLE IF EXISTS LASTFILTER');
//    tx.executeSql('DROP TABLE IF EXISTS APPDATABASE');


    tx.executeSql('CREATE TABLE IF NOT EXISTS APPDATABASE (name, hash64, idRouter, idHotspot, idCompany)');
    //tx.executeSql('CREATE TABLE IF NOT EXISTS LASTREQUESTS (request, data)');
    //tx.executeSql('CREATE TABLE IF NOT EXISTS LASTFILTER (query)');
}

function errorCB(tx) {
    console.log(tx)
    $.notify('<strong>Falha</strong><br>' + tx.code, {
        allow_dismiss: true,
        timer: 4000,
        animate: {
            enter: 'animated bounceInUp',
            exit: 'animated bounceOutDown'
        }
    });
}

function successCB(tx) {
    //alert('ok')
}

var addUser = function (name, hash, idCompany) {
    var db = window.openDatabase("dbAppWifimax", "1.0", "Wifimax app DB", 200000);
    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO APPDATABASE (name, hash64, idCompany) VALUES ("' + name + '", "' + hash + '", "' + idCompany + '")');
    }, errorCB, successCB);
};

var getUser = function (success) {
    var db = window.openDatabase("dbAppWifimax", "1.0", "Wifimax app DB", 200000);
    db.transaction(function(tx){
        tx.executeSql('SELECT * FROM APPDATABASE', [], success, errorCB);
    }, errorCB);
};

var upDateCompany = function (idCompany) {
    var db = window.openDatabase("dbAppWifimax", "1.0", "Wifimax app DB", 200000);
    db.transaction(function (tx) {
        tx.executeSql('SELECT idCompany FROM APPDATABASE', [], function (tx, res) {
            if (res.rows.length) {
                var updateChild;
                if (res.rows.item(0).idCompany == idCompany) {
                    updateChild = false;
                } else {
                    updateChild = true;
                }
                if (updateChild) {
                    upDateRouter(0);
                    upDateHotspot(0);
                }
                tx.executeSql('UPDATE APPDATABASE SET idCompany = ?', [idCompany]);
            }
        });
    }, errorCB);
};

var upDateRouter = function(idRouter){
    var db = window.openDatabase("dbAppWifimax", "1.0", "Wifimax app DB", 200000);
    db.transaction(function (tx) {
        tx.executeSql('SELECT idRouter FROM APPDATABASE', [], function (tx, res) {
            if (res.rows.length) {
                
                if (res.rows.item(0).idRouter == idRouter) {
                    var updateChild;
                    updateChild = false;
                } else {
                    updateChild = true;
                }
                if (updateChild) {
                    upDateHotspot(0);
                }
                
                tx.executeSql('UPDATE APPDATABASE SET idRouter = ?', [idRouter]);
            } 
        });
    }, errorCB);
};

var upDateHotspot = function(idHotspot){
    var db = window.openDatabase("dbAppWifimax", "1.0", "Wifimax app DB", 200000);
    db.transaction(function (tx) {
        tx.executeSql('SELECT idHotspot FROM APPDATABASE', [], function (tx, res) {
            if (res.rows.length) {
                tx.executeSql('UPDATE APPDATABASE SET idHotspot = ?', [idHotspot]);
            } 
        });
    }, errorCB);
};