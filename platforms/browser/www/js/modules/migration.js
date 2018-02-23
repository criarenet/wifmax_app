
var getMigrationData = function (obj, callback) {

    $.getJSON(obj.url, function (data) {
        if(callback){
            callback(data);
        }
        console.log("success" + data);
    }).done(function (data) {
        console.log("second success" + data);
    }).fail(function (data) {
        console.log("error" + data);
    }).always(function (data) {
        console.log("complete" + data);
    });
}

var buildDataMigrationChart = function () {
    var url = wifimaxApp.url.GET_MIGRATION_DATA;
    //var url = 'https://api.myjson.com/bins/1he11h';
    var date;
    switch (periodQuery) {
        case 'Daily':
            date = $('#referenceDate').val();
            break;
        
        case 'Weekly':
            date = $('#weekDate').val();
            break;
        
        case 'Monthly':
            date = $('#monthlyDate').val();
            break;
    }
    
    var idRouter = $('#routersList ul li i').parent().parent().parent().attr('data-idRouter');
    
    if(!idRouter){
        return;
    }
    
    var query = '?idCompany=' + gIdCompany + '&userSearchPeriod=' + (periodQuery.toUpperCase()) + '&hotspotList[0]='+idRouter+'&referenceDate='+date;
    url = url + query;
    var obj = {
        url: url
    };
    getMigrationData(obj, function (json) {
        var dataChart = [];
        $.each(json.result.links, function(i, v){
            var migArr = [];
            
            var nameForm = json.result.nodes[v.source].name;
            migArr.push(nameForm);
            
            var nameTo = json.result.nodes[v.target].name;
            migArr.push(nameTo);
            
            var weight = v.value;
            migArr.push(weight);
            
            dataChart.push(migArr);
        });
        //console.log(dataChart);
    });
};