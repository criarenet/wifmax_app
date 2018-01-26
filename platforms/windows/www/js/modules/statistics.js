$(document).ready(function () {
    initButtons();
    //setScreenOrientation('portrait');
});

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
                getUserOnlineStatistic();
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
                getNewRegistersStatistic();
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


var getNewRegistersStatistic = function (query, callback) {
    var url = wifimaxApp.url.GET_NEW_REGISTERS_STATISTIC;
    //var url = 'https://api.myjson.com/bins/1he11h';
    var query = query ? query : gQuery;
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
    $('.labelColor').text('0');
    $('#userOnlineStatisticChart').html('');
    
    request(obj, function (json) {
        if (json.result && json.result.data) {
            loadChartNewRegistersStatistic($('#newRegistersStatisticChart'), json.result.data, formaters);
        }
    });
};

var getUserOnlineStatistic = function (query, callback) {
    var url = wifimaxApp.url.GET_USERS_ONLINE_STATISTIC;
    //var url = 'https://api.myjson.com/bins/1he11h';
    var query = query ? query : gQuery;
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
    $('.labelColor').text('0');
    $('#userOnlineStatisticChart').html('');
    
    request(obj, function (json) {
        if (json.result && json.result.data) {
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
                color: '#8085e9',
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

var countUpStatisticNumbers = function (query, callback) {
    var url = wifimaxApp.url.GET_USER_DATA_STATISTIC;
    //var url = 'https://api.myjson.com/bins/dqrv9';
    var query = query ? query : gQuery;
    var obj = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };
    
    $('#statisticsContainer .labelColor').text('0');
    $('#statisticsContainer .labelColor').addClass('loading');
    request(obj, function (json) {
        //$('#statisticsContainer .labelColor').removeClass('loading');
        $('#statisticsContainer .labelColor').each(function () {
            var $this = $(this);
            $this.removeClass('loading');
            //$this.text('0');
            var name = $this.attr('data-count');
            countTo = json.result[name];
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
    credits: {
        enabled: false
    },
    series: [{
        name: 'Year 1800',
        data: [107, 31, 635, 203, 2]
    }]
        
    });
};