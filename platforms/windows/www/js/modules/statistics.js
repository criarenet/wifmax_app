var emptyChartInfo = '<span class="infoChart"><i class="material-icons">info_outline</i><br>Não há informações disponíveis para os filtros atuais.';

$(document).ready(function () {
    initButtons();
    setScreenOrientation('portrait');
    fixWidthCharts();
});

var fixWidthCharts = function(){
    var maxWidth = $('.wrapperCarouselCharts').width();
    $('.wrapperCarouselCharts').css({'max-width': maxWidth+'px'});
};

var setScreenOrientation = function (position, callback) {
    screen.orientation.lock(position);
    if (callback) {
        setTimeout(function () {
            callback();
        }, 400);
    }
};

var initButtons = function(){
    $('#detailUsersChart').on('click', function(){
        openLandscapeCharts('', function(){
            setScreenOrientation('landscape');
            setTimeout(function(){
                $('#headerLandscapeCharts .nav-wrapper').addClass('viewing');
                //$('.chartBoxLandscape h3').addClass('viewing');
                $('#titlelandscapeChart h3').text('Usuários online');
                getUserOnlineStatistic(buildQuery());
            },250);
        });
    });
    
    $('#btCloseLandscapeCharts').on('click', function () {
        $('#userOnlineStatisticChart').html('');
        $('#newRegistersStatisticChart').html('');
        $('#headerLandscapeCharts .nav-wrapper').removeClass('viewing');
        //$('.chartBoxLandscape h3').removeClass('viewing');
        setTimeout(function () {
            setScreenOrientation('portrait', function () {
                openLandscapeCharts('');
            });
        }, 200);
    });
    
    $('#detailsNewRegistersChart').on('click', function(){
        openLandscapeCharts('', function(){
            setScreenOrientation('landscape');
            setTimeout(function(){
                $('#headerLandscapeCharts .nav-wrapper').addClass('viewing');
                //$('.chartBoxLandscape h3').addClass('viewing');
                $('#titlelandscapeChart h3').text('Usuários Cadastrados');
                getNewRegistersStatistic(buildQuery());
            },250);
        });
    });
};

var openLandscapeCharts = function (chart, callback) {
    var filters = $('#wrapperLandscapeCharts');
    var classOpen = 'slideInRight animated';
    var classClose = 'slideOutRight animated';

    if (filters.hasClass('slideInRight')) {
        filters.addClass(classClose);
        setTimeout(function(){
              filters.hide();
            filters.attr('class', 'row');
        },300);
    }else{
        filters.show();
        filters.addClass(classOpen);
        setTimeout(function(){
            //$('#carouselFilter').css('opacity', '1');
        },300);
    }
    if(callback){
        setTimeout(function(){
            callback();
        },400);
    }
};

var setterListValues = function (data) {
    $('#statisticsContainer .labelColor').each(function () {
        var $this = $(this);
        $this.removeClass('loading');
        //$this.text('0');
        var name = $this.attr('data-count');
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
                        //alert('finished');
                    }
                });
    });
};

var getDataStatistics = function (actualQuery) {

    $('#statisticsContainer .labelColor').text('0');
    $('#statisticsContainer .labelColor').addClass('loading');

    var totalData;
    var url = wifimaxApp.url.GET_USER_DATA_STATISTIC;
    //var url = 'https://api.myjson.com/bins/dqrv9';
    
    var keySqlStatisticInd1 = 'GET_USER_DATA_STATISTIC';
    
    var query = actualQuery ? actualQuery : gQuery;
    var obj = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };
    request(obj, function (json) {
        var dataInd1 = addUpdateDataRequest(keySqlStatisticInd1, json.result);
        setterListValues(dataInd1);
    });
    var url = wifimaxApp.url.GET_USERS_ONLINE_STATISTIC;
    //var url = 'https://api.myjson.com/bins/1he11h';
    
    var keySqlStatisticInd2 = 'GET_USERS_ONLINE_STATISTIC';
    
    var query = actualQuery ? actualQuery : gQuery;
    var objOnlineUsers = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };
    request(objOnlineUsers, function (json) {
        var dataInd2 = addUpdateDataRequest(keySqlStatisticInd2, json.result);
        setterListValues(dataInd2);
    });

    var url = wifimaxApp.url.GET_NEW_REGISTERS_STATISTIC;
    //var url = 'https://api.myjson.com/bins/1he11h';
    
    var keySqlStatisticInd3 = 'GET_NEW_REGISTERS_STATISTIC';
    
    var query = actualQuery ? actualQuery : gQuery;
    var objNewRegister = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };
    request(objNewRegister, function (json) {
        var dataInd3 = addUpdateDataRequest(keySqlStatisticInd3, json.result);
        setterListValues(dataInd3);
    });
    getBrowsersStatistic(actualQuery);
    getOSStatistic(actualQuery);
};

var getNewRegistersStatistic = function (actualQuery, callback) {
    var url = wifimaxApp.url.GET_NEW_REGISTERS_STATISTIC;
    //var url = 'https://api.myjson.com/bins/1he11h';
    
    var keySql = 'GET_NEW_REGISTERS_STATISTIC_CHART';
    
    var query = actualQuery ? actualQuery : gQuery;
    var obj = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };
    
    var formaters = {
        name: 'Usuários',
        timeLine: intervalsTypes.realTime
    };
    //$('.labelColor').text('0');
    $('#userOnlineStatisticChart').html('');
    
    request(obj, function (json) {
        if (json.result && json.result.data) {
            var data = addUpdateDataRequest(keySql, json.result.data);
            loadChartNewRegistersStatistic($('#newRegistersStatisticChart'), data, formaters);
        }
    });
};

var getUserOnlineStatistic = function (actualQuery, callback) {
    var url = wifimaxApp.url.GET_USERS_ONLINE_STATISTIC;
    //var url = 'https://api.myjson.com/bins/1he11h';
    
    var keySql = 'GET_USERS_ONLINE_STATISTIC';
    
    var query = actualQuery ? actualQuery : gQuery;
    var obj = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };
    
    var formaters = {
        name: 'Usuários',
        timeLine: intervalsTypes.realTime
    };
    //$('.labelColor').text('0');
    $('#userOnlineStatisticChart').html('');
    
    request(obj, function (json) {
        if (json.result && json.result.data) {
            var data = addUpdateDataRequest(keySql, json.result.data);
            loadChartOnlineUserStatistic($('#userOnlineStatisticChart'), json.result.data, formaters);
        }
    });
};

var loadChartOnlineUserStatistic = function (containner, data, formaters) {

    $(containner).highcharts({
        chart: {
            height: '260px'
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
            categories: formaters.realTime
        },
        yAxis: {
            title: {
                enabled: false
            }
        },
        tooltip: {
            formatter: function() {
                //console.log(this);
                var txt = '<b>Usuários online</b><br><br>';
                txt += 'às ' + this.key + 'hs - ' + this.y + ' usuário(s)';
                if (this.point.fullCategory)
                    txt += this.point.fullCategory;
                return txt;
            }
        },
        legend: {
            enabled: false,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            series: {
                marker:{

                },
                label: {
                    enabled: false
                },
                shadow: {
                    width: 3
                },
                color: '#22bd9a',
                lineWidth: 3,
                label: {
                    connectorAllowed: false
                },
                pointStart: 0
            }
        },
        series: [{
                name: formaters.name,
                data: data
            }],
        responsive: {
            rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
        }
    });
};

var loadChartNewRegistersStatistic = function (containner, data, formaters) {
    $(containner).highcharts({
        
    chart: {
            height: '260px',
            type:'column'
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
            categories: formaters.realTime
        },
        plotOptions: {
            series: {
                color: '#607D8B'
                
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
                var txt = '<b>Novos registros</b><br><br>';
                txt += 'às ' + this.key + 'hs - ' + this.y + ' registro(s)';
                if (this.point.fullCategory)
                    txt += this.point.fullCategory;
                return txt;
            }
        },
        legend: {
            enabled: false,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Year 1800',
        data: data
    }]
        
    });
};


var getOSStatistic = function (query, callback) {
    var url = wifimaxApp.url.GET_OPERATIONAL_SYSTEM_STATISTICS;
    //var url = 'https://api.myjson.com/bins/1he11h';
    var query = query ? query : gQuery;
    var obj = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };
    
    var pieColors = ['#673ab7', '#8561c5', '#a489d4', '#c2b0e2'];
    
    var formaters = {
        name: 'OS',
        colors: pieColors.reverse(),
        title:'<b>Sistemas operacionais mais utilizados</b><br><br>',
        timeLine: intervalsTypes.realTime
    };
    //$('.labelColor').text('0');
    $('#pieChartOSs').html('');
    
    request(obj, function (json) {
        if (json.result && json.result.length) {
            var data = [], others = 0;
            var oSObj = {"ANDROID5": 'Android',
                "MAC_OS_X_IPHONE": 'iOS',
                "ANDROID6": 'Android',
                "WINDOWS_PHONE8_1": 'Windows',
                "ANDROID4": 'Android',
                "ANDROID2": 'Android',
                "MAC_OS_X": 'Mac',
                "iOS7_IPHONE": 'iOS',
                "iOS9_IPHONE": 'iOS',
                "ANDROID_MOBILE": 'Android'
            };
            var andY = 0, iosY = 0, windY = 0;
            $.each(json.result, function (i, v) {
                if (v.y < 5) {
                    others = others + v.y;
                } else {
                    if (oSObj[v.name] === 'Android') {
                        andY = andY + v.y;
                    }
                    if (oSObj[v.name] === 'iOS') {
                        iosY = iosY + v.y;
                    }
                    if (oSObj[v.name] === 'Windows' && v.y < 5) {
                        windY = windY + v.y;
                    }
                }
            });
            if (andY >= 5){
                data.push({
                    name: 'Android',
                    y: andY
                });
            }
            if (iosY >= 5) {
                data.push({
                    name: 'iOS',
                    y: iosY
                });
            }
            if (windY >= 5) {
                data.push({
                    name: 'iOS',
                    y: windY
                });
            }
            data.push({
                name: 'Outros',
                y: others
            });
            loadPieChartStatistics($('#pieChartOSs'), data, formaters);
        }else{
            $('#pieChartOSs').html(emptyChartInfo);
        }
    });
};


var getBrowsersStatistic = function (query, callback) {
    var url = wifimaxApp.url.GET_BROWSERS_STATISTICS;
    //var url = 'https://api.myjson.com/bins/1he11h';
    var query = query ? query : gQuery;
    var obj = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };
    
    var pieColors = (function () {
        var colors = [],
                base = Highcharts.getOptions().colors[0],
                i;

        for (i = 0; i < 10; i += 1) {
            // Start out with a darkened base color (negative brighten), and end
            // up with a much brighter color
            colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
        }
        return colors;
    }());
    
    var formaters = {
        name: 'Browsers',
        colors: pieColors,
        title:'<b>Browsers mais utilizados</b><br><br>',
        timeLine: intervalsTypes.realTime
    };
    //$('.labelColor').text('0');
    $('#pieChartBrowsers').html('');
    
    request(obj, function (json) {
        if (json.result && json.result.length) {
            var data = [], others = 0;
            var brwObj = {
                'APPLE_WEB_KIT': 'Apple mob',
                'IEMOBILE11': 'IE mob',
                'EDGE_MOBILE': 'Edge mob',
                'FIREFOX_MOBILE': 'FireFox mob',
                'CHROME_MOBILE': 'Chrome mob',
                'CHROME': 'Chrome',
                'MOBILE_SAFARI': 'Safari'
            }
            $.each(json.result, function(i, v){
                if(v.y < 5){
                    others = others + v.y;
                }else{
                    data.push({
                        name: brwObj[v.name],
                        y: v.y
                    });
                }
            });
            data.push({
                name: 'Outros',
                y: others
            });
            loadPieChartStatistics($('#pieChartBrowsers'), data, formaters);
        }else{
            $('#pieChartBrowsers').html(emptyChartInfo);
        }
    });
};

var loadPieChartStatistics = function (containner, data, formaters) {

    $(containner).highcharts({
        chart: {
            height: '260px',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        exporting: {
            enabled: false
        },
        credits: {
            enabled: false,
            text: ''
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            //categories: formaters.realTime
        },
        yAxis: {
            title: {
                enabled: false
            }
        },
        plotOptions: {
            pie: {
                showInLegend: true,
                allowPointSelect: true,
                cursor: 'pointer',
                colors: formaters.colors,
                dataLabels: {
                    enabled: false
                }
            }
        },
        tooltip: {
            formatter: function () {
                //console.log(this);
                var txt = formaters.title;
                txt += this.key + ' - ' + this.y + '%';
                if (this.point.fullCategory)
                    txt += this.point.fullCategory;
                return txt;
            }
        },
        legend: {
            enabled: true,
            layout: 'horizontal',
            margin:3
        },
        series: [{
                name: 'Brands',
                data: data
            }]
    });
};