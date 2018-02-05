$(document).ready(function () {
    initButtonsAnalytics();
});


var initButtonsAnalytics = function(){
    $('#detailAgeChart').on('click', function(){
        openLandscapeCharts('', function(){
            setScreenOrientation('landscape');
            setTimeout(function(){
                $('#headerLandscapeCharts .nav-wrapper').addClass('viewing');
                //$('.chartBoxLandscape h3').addClass('viewing');
                $('#titlelandscapeChart h3').text('Usuários por sexo e por faixa etária');
                getChartGenderAge();
            },250);
        });
    });
    $('#detailConversion').on('click', function(){
        openLandscapeCharts('', function(){
            setScreenOrientation('landscape');
            setTimeout(function(){
                $('#headerLandscapeCharts .nav-wrapper').addClass('viewing');
                //$('.chartBoxLandscape h3').addClass('viewing');
                $('#titlelandscapeChart h3').text('Conversão de visualizações da splash-page em logins');
                getChartConversion();
            },250);
        });
    });
    
    $('#detailVouchersControl').on('click', function () {
        openPortratCharts('', function () {
            setTimeout(function () {
                $('#headerPortraitCharts .nav-wrapper').addClass('viewing');
                //$('.chartBoxLandscape h3').addClass('viewing');
                //wifimaxApp.url.GET_VOUCHERCONTROL_USERS
                //alert('aqui')
                $('#titlePortaitChart h3').text('Vouchers utilizados');
                //getChartConversion();
            }, 250);
        });
    });
    
};


var setterListAnalytics = function (data, spanClass) {
    $('#analyticsContainer .labelColor.'+spanClass).each(function () {
        var $this = $(this);
        $this.removeClass('loading');
        //$this.text('0');
        var name = $this.attr('data-count');
        var complement = $this.attr('data-complement');
        if(!data){
            return;
        }
        countTo = data[name];
        $({countNum: $this.text()}).animate({
            countNum: countTo
        },
                {
                    duration: 1000,
                    easing: 'linear',
                    step: function () {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $this.text(this.countNum);
                        if (complement) {
                            $this.text($this.text() + ' ' + complement);
                        }
                        //alert('finished');
                    }
                });
    });
};

var loadDataAnalytics = function(query){
    getDataAnalytics(query, '');
    setTimeout(function () {
        getConversionData(query, '');
        getVouchersControl(query);
    }, 10);
};

var getVouchersControl = function (actualQuery, callback) {
    var url = wifimaxApp.url.GET_VOUCHERCONTROL_USERS;
    //var url = 'https://api.myjson.com/bins/1he11h';
    
    var keySql = 'GET_VOUCHERCONTROL_USERS';
    
    var query = actualQuery ? actualQuery : gQuery;
    var obj = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };
    request(obj, function (json) {
        if (json.result) {
            var tot = {};
            var volume = 0
            $.each(json.result, function(i, v){
                volume = volume + v.usersVolume;
            });
            tot.userVolume = volume;
            window.gVouchers = json.result;
            setterListAnalytics(tot, 'vouchersLabel');
        }
    });
};

var getDataAnalytics = function (actualQuery, callback) {
    var url = wifimaxApp.url.GET_ANALYTICS_DATA;
    //var url = 'https://api.myjson.com/bins/1he11h';
    
    var keySql = 'GET_ANALYTICS_DATA';
    
    var query = actualQuery ? actualQuery : gQuery;
    var obj = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };
    $('#analyticsContainer .labelColor').text('0');
    $('#analyticsContainer .labelColor').addClass('loading');
    request(obj, function (json) {
        if (json.result) {
            setterListAnalytics(json.result, 'analyticsLabel');
        }
    });
};

var getConversionData = function (actualQuery, callback) {
    var _this = $('span[data-count=conversionRatePercent]');
    var url = wifimaxApp.url.GET_CONVERSION_DATA;
    //var url = 'https://api.myjson.com/bins/1he11h';
    
    var keySql = 'GET_CONVERSION_DATA';
    
    var query = actualQuery ? actualQuery : gQuery;
    var obj = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };
    //$(_this).text('0');
    //$(_this).addClass('loading');
    request(obj, function (json) {
        if (json.result) {
            setterListAnalytics(json.result, 'conversionLabel');
        }
    });
};



var getChartGenderAge = function (actualQuery, callback) {
    var url = wifimaxApp.url.GET_ANALYTICS_GENDER_AGE_CHART;
    //var url = 'https://api.myjson.com/bins/1he11h';
    
    var keySql = 'GET_ANALYTICS_GENDER_AGE_CHART';
    
    var query = actualQuery ? actualQuery : gQuery;
    var obj = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };
    
    var formaters = {
    };


    $('#genderAgeChart').html('');
    
    
    request(obj, function (json) {
        if (json.result) {
            var data = addUpdateDataRequest(keySql, json.result);
            
            formaters.categories = data.categories;
            var dataComplet = [];
            var color;
            $.each(data, function(i, v){
                if(i === 'female' || i === 'male' || i === 'undefined'){
                    var name;
                    if(i == 'female'){
                        name = 'Feminino';
                        color = 'rgb(204, 159, 241)';
                    }else if(i == 'male'){
                        color = 'rgb(140, 210, 238)';
                        name = 'masculino';
                    }else{
                        name = 'Não declarado';
                        color = 'rgb(89, 192, 166)';
                    }
                    var obj = {};
                    obj.name = name;
                    obj.color = color;
                    obj.data = v;
                    dataComplet.push(obj);
                }
            });
            
            loadChartGenderAge($('#genderAgeChart'), dataComplet, formaters);
        }
    });
};


var loadChartGenderAge = function (containner, data, formaters) {
    $(containner).highcharts({
        
    chart: {
            height: '260px',
            type: 'bar'
        },
        exporting:{
            enabled:false
        },
        credits:{
            enabled: false,
            text:''
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis:{
            categories: formaters.categories
        },
        plotOptions: {

        },
        yAxis: {
            title: {
                enabled: false
            }
        },
    tooltip: {
            formatter: function() {
                //console.log(this);
                var txt = '<b>Novos registros</b><br><br>';
                txt += 'às ' + this.key + 'hs - ' + this.y + ' registro(s)';
                if (this.point.fullCategory)
                    txt += this.point.fullCategory;
                return txt;
            }
        },
        legend: {
            enabled: true,
            layout: 'horizontal',
            verticalAlign: 'bottom'
        },
    credits: {
        enabled: false
    },
    series: data
        
    });
};

var getChartConversion = function (actualQuery, callback) {
    var url = wifimaxApp.url.GET_CONVERSION_CHART;
    //var url = 'https://api.myjson.com/bins/1he11h';
    
    var keySql = 'GET_CONVERSION_CHART';
    
    var query = actualQuery ? actualQuery : gQuery;
    var obj = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };
    var formaters = {
    };
    $('#conversionChart').html('');
    request(obj, function (json) {
        if (json.result) {
            var data = addUpdateDataRequest(keySql, json.result);
            //formaters.categories = data.categories;
            var dataComplet = [];
            
            var colorsDef = {
                'authentications': {
                    grad: [
                        [0, 'rgba(173, 130, 207, .5)'],
                        [1, 'rgba(173, 130, 207, .5)']
                    ],
                    init: 'rgb(173, 130, 207)'
                },
                'loginPageViews': {
                    grad: [
                        [0, 'rgba(95, 213, 136, .2)'],
                        [1, 'rgba(95, 213, 136, .2)']
                    ],
                    init: 'rgb(95, 213, 136)'
                }
            }

            $.each(json.result, function(i, v){
                if(i === 'authentications' || i === 'loginPageViews'){
                    
                    var obj = {
                        name: (i == 'authentications' ? 'Logins' : 'Splash page'),
                                color: colorsDef[i].init,
                                lineWidth: 1,
                                fillColor: {
                                linearGradient: [0, 0, 0, 350],
                                        stops: colorsDef[i].grad
                                },
                                data: v
                        };
                        
                    dataComplet.push(obj);
                }
            });
//            console.log(dataComplet);
            loadChartConversion($('#conversionChart'), dataComplet, formaters);
        }
    });
};

var loadChartConversion = function (containner, data, formaters) {
    $(containner).highcharts({
    chart: {
            height: '260px',
            type: 'area',
            renderTo: "conversionRatePeriodChart"
        },
        exporting:{
            enabled:false
        },
        credits:{
            enabled: false,
            text:''
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis:{
            //categories: []
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                }
            }
        },
        yAxis: {
            title: {
                enabled: false
            }
        },
    tooltip: {
            formatter: function() {
                //console.log(this);
                var txt = this.key + 'hs<br>' + this.y + ' ' + this.series.legendItem.textStr;
                return txt;
            }
        },
        legend: {
            enabled: true,
            layout: 'horizontal',
            verticalAlign: 'bottom'
        },
    credits: {
        enabled: false
    },
    series: data

    });
};