function createDB(tx) {
//    tx.executeSql('DROP TABLE IF EXISTS USERS');
//    tx.executeSql('DROP TABLE IF EXISTS LASTREQUESTS');
//    tx.executeSql('DROP TABLE IF EXISTS LASTFILTER');

    tx.executeSql('CREATE TABLE IF NOT EXISTS USERS (name, hash64, idCompany)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS LASTREQUESTS (request, data)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS LASTFILTER (query)');
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
        tx.executeSql('INSERT INTO USERS (name, hash64, idCompany) VALUES ("' + name + '", "' + hash + '", "' + idCompany + '")');
    }, errorCB, successCB);
};

function queryDB(tx) {
    
}

function querySuccess(tx, results) {
    var len = results.rows.length;
    alert("DEMO table: " + len + " rows found.");
    for (var i = 0; i < len; i++) {
        alert("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
    }
}

var getUser = function (success) {
    var db = window.openDatabase("dbAppWifimax", "1.0", "Wifimax app DB", 200000);
    db.transaction(function(tx){
        tx.executeSql('SELECT * FROM USERS', [], success, errorCB);
    }, errorCB);
//    db.transaction(function (tx) {
//        tx.executeSql('SELECT * FROM USERS', [], function (tx, res) {
//            
////            success(res.rows);
////            if (success) {
////                success(res.rows);
////            }
//        });
//    }, errorCB, successCB);
};

var upDateCompany = function(idCompany){
    var db = window.openDatabase("dbAppWifimax", "1.0", "Wifimax app DB", 200000);
    db.transaction(function (tx) {
        tx.executeSql('SELECT idCompany FROM USERS', [], function (tx, res) {
            if (res.rows.length) {
                tx.executeSql('UPDATE USERS SET idCompany = ?', [idCompany]);
            } 
        });
    }, errorCB);
}