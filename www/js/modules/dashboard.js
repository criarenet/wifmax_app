var gQuery = 'idCompany=11&idRouter=28&idHotspot=54';

$(document).ready(function () {
    buildDashBoard(gQuery);
});

var buildDashBoard = function(query){
    getUserOnlineChart(query);
    setTimeout(function(){getSimultUserChart(query);},1);
    setTimeout(function(){countUpDashboardNumbers(query);},3);
};

var getUserOnlineChart = function (query, callback) {
    var url = wifimaxApp.url.DASHBOARD_ONLINE_USERS;
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
    $('#userOnlineChart').html('');
    
    request(obj, function (json) {
        if (json.result && json.result.data) {
            loadChartOnlineUser($('#userOnlineChart'), json.result.data, formaters);
        }
    });
};

var countUpDashboardNumbers = function (query, callback) {
    var url = wifimaxApp.url.DASHBOARD_CONNECTION_DATA;
    //var url = 'https://api.myjson.com/bins/dqrv9';
    var query = query ? query : gQuery;
    var obj = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };
    
    $('.labelColor').text('0');
    $('.labelColor').addClass('loading');
    request(obj, function (json) {
        $('.labelColor').removeClass('loading');
        $('.labelColor').each(function () {
            var $this = $(this);
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

var getSimultUserChart = function (query, callback) {
    var url = wifimaxApp.url.DASHBOARD_SIMULT_USERS_CHART;
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

    $('#userOnlineChart').html('');

    request(obj, function (json) {
        loadChartSimultUser($('#simultUserChart'), json.result, formaters);
    });
};

var loadChartSimultUser = function (containner, data, formaters) {
    
    $(containner).highcharts({
        
        chart: {
            zoomType: 'x',
            height: '250px',
            resetZoomButton:{
                position:{
                    x:0,
                    y:0
                },
                relativeTo:'plot',
                theme: {
                    opacity: 0.4,
                    html:'kkk'
                }
            }
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
            categories: formaters.realTime,
            type: 'datetime'
        },
        yAxis: {
            title: {
                enabled: false
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
           formatter: function() {
               var d = new Date(this.x), min = d.getMinutes();
               if (min < 10) {
                   min = "0" + min
               }
var pointFormatted = d.getHours() + ':' + min + 'h<br/><b><span style="color' + this.point.series.color + '">\n\
</span></b>' + (this.point.y ? (this.point.y + ' usuário(s)') : 'Nenhum usuário');
return pointFormatted;
           }
       },
        plotOptions: {
            series:{
              pointStart:1516120620652,
              pointEnd:1516207312473
            },
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#34bfe0'],
                        [1, Highcharts.Color('#34bfe0').setOpacity(0).get('rgba')]
                    ]
                },
                color:'#34bfe0',
                marker: {
                    radius: 4
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            type: 'area',
            name: '',
            pointInterval: 60*1000,
            data: data.data
        }]    
        
    });   
 };

var loadChartOnlineUser = function (containner, data, formaters) {

    $(containner).highcharts({
        chart: {
            height: '250px'
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