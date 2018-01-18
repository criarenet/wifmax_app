$(document).ready(function () {
    getCompaniesList();
});

var getCompaniesList = function (callback) {
    var url = wifimaxApp.url.GET_COMPANIES;
    //var url = 'https://api.myjson.com/bins/1he11h';
    var query = '';
    var obj = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };
    
    request(obj, function (json) {
        buildCompaniesList(json.result);
    });
};

var buildCompaniesList = function(data){
    if(data.length == 1){
        buildRouterList(data[0].idCompany);
    }
};

var buildRouterList = function(idCompany){
    
};