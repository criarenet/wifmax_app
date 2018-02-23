var db = window.openDatabase("dbAppWifimax", "1.0", "Wifimax app DB", 200000);
db.transaction(populateDB, errorCB, successCB);

function populateDB(tx) {
//    tx.executeSql('DROP TABLE IF EXISTS USERS');
//    tx.executeSql('DROP TABLE IF EXISTS LASTREQUESTS');
//    tx.executeSql('DROP TABLE IF EXISTS LASTFILTER');
    
    tx.executeSql('CREATE TABLE IF NOT EXISTS USERS (name, hash64, idCompany)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS LASTREQUESTS (request, data)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS LASTFILTER (query)');
}

function errorCB(tx, err) {
    //alert("Error processing SQL: " + err);
    $.notify('<strong>Falha</strong><br>' + tx.message, {
        allow_dismiss: true,
        timer: 4000,
        animate: {
            enter: 'animated bounceInUp',
            exit: 'animated bounceOutDown'
        }
    });
}

function successCB(tx) {
//    $.notify('<strong>' + 'eer' + '</strong><br>' + 'adad asd asd asd.', {
//        allow_dismiss: true,
//        timer: 4000,
//        animate: {
//            enter: 'animated bounceInUp',
//            exit: 'animated bounceOutDown'
//        }
//    });
    //alert("success!");
}

var addUser = function (name, hash, idCompany) {
    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO USERS (name, hash64, idCompany) VALUES ("' + name + '", "' + hash + '", "' + idCompany + '")');
    }, errorCB, successCB);
};

var upDateCompany = function(idCompany){
    db.transaction(function (tx) {
        tx.executeSql('SELECT idCompany FROM USERS', [], function (tx, res) {
            if (res.rows.length) {
                tx.executeSql('UPDATE USERS SET idCompany = ?', [idCompany]);
            } 
        });
    }, errorCB);
}

var getUser = function (success) {
    
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM USERS', [], function (tx, res) {
            var res = res
            if (success) {
                success(res.rows);
            }
        });
    }, errorCB, successCB);
};

var addUpdateDataRequest = function (key, data) {

    var strData = JSON.stringify(data);
    var result = data;
    db.transaction(function (tx) {
        tx.executeSql('SELECT data FROM LASTREQUESTS WHERE request = ?', [key], function (tx, res) {
            if (!strData) {
                if (res.rows.length) {
                    result = JSON.parse(res.rows[0].data);
                    //return JSON.parse(res.rows[0].data);
                } else {
                    result = [];
                }
            } else {
                if (res.rows.length) {
                    tx.executeSql('UPDATE LASTREQUESTS SET data = ? WHERE request = ?', [strData, key]);
                } else {
                    tx.executeSql('INSERT INTO LASTREQUESTS (request, data) VALUES (?, ?)', [key, strData]);
                }
            }
//            console.log("res.rows.length: " + res.rows.length);
        });
    }, errorCB);
    return result;
};

var addUpdateDataFIlter = function (data) {
    db.transaction(function (tx) {
        tx.executeSql('SELECT query FROM LASTFILTER', [], function (tx, res) {
            if (res.rows.length) {
                tx.executeSql('UPDATE LASTFILTER SET query = ?', [data]);
            } else {
                tx.executeSql('INSERT INTO LASTFILTER (query) VALUES (?)', [data]);
            }
        });
    }, errorCB);
    //JSON.parse('{"' + decodeURI(QUERYSTRING.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')
};

var getLastQuery = function(callback){
    var result = {};
    db.transaction(function (tx) {
        tx.executeSql('SELECT query FROM LASTFILTER', [], function (tx, res) {
            if (res.rows.length) {
                result.query = res.rows[0].query;
                result.obj = JSON.parse('{"' + decodeURI((res.rows[0].query).replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
                if(callback){
                    callback(result);
                }
            }
        });
    }, errorCB);
};