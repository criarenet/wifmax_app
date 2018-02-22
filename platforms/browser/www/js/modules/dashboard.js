//var gQuery = 'idCompany=11&idRouter=28&idHotspot=54&referenceDate=13/01/2018&userSearchPeriod=Daily';
var gCompanyNameSeleceted;
$(document).ready(function () {
    StatusBar.hide();
});


Array.prototype.getInterval = function (start, len) {
    var l = this.length;
    var arr = [];

    start = start || 0;
    len = len || l;

    for (var i = start, c = 0; c < len; c++, i++) {
        arr.push(this[(i % l)]);
    }
    return arr;

};

var startDashBoard = function () {
    buildDashBoard();
};

var setSelectionForm = function (obj) {
    var router = $("li").data("data-idrouter", obj.idRouter)[0];
    var hotspot = $("li").data("data-hotspot", obj.idHotspot)[0];

    setItemFilterSelected(router, 'routersList');
    setItemFilterSelected(hotspot, 'hotspotList');
    $('#referenceDate').val(obj.referenceDate);
};

var buildDashBoard = function(query){
    getUserOnlineChart(query);
    setTimeout(function(){getSimultUserChart(query);},1);
    setTimeout(function(){countUpDashboardNumbers(query);},3);
};

var getUserOnlineChart = function (params, callback) {
    var url = wifimaxApp.url.DASHBOARD_ONLINE_USERS;
    var keySql = 'DASHBOARD_ONLINE_USERS';
    //var url = 'https://api.myjson.com/bins/1he11h';

    var query = buildQuery('dashbord');
    
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
            var data = addUpdateDataRequest(keySql, json.result.data);
            
            var d = new Date(json.result.date);
            formaters.timeLine = intervalsTypes.Daily.getInterval(parseInt(d.getHours()), 24);
            
            loadChartOnlineUser($('#userOnlineChart'), data, formaters);
        }
    });
};

var countUpDashboardNumbers = function (params, callback) {
    var url = wifimaxApp.url.DASHBOARD_CONNECTION_DATA;
    //var url = 'https://api.myjson.com/bins/dqrv9';
    var keySql = 'DASHBOARD_CONNECTION_DATA';
    
    var query = buildQuery('dashbord');
    var obj = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };
    
    $('#dashBoardContainer .labelColor').text('0');
    $('#dashBoardContainer .labelColor').addClass('loading');
    request(obj, function (json) {
        var data = addUpdateDataRequest(keySql, json.result);
        $('#dashBoardContainer .labelColor').removeClass('loading');
        $('#dashBoardContainer .labelColor').each(function () {
            var $this = $(this);
            //$this.text('0');
            var name = $this.attr('data-count');
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
    });
};

var getSimultUserChart = function (params, callback) {
    var url = wifimaxApp.url.DASHBOARD_SIMULT_USERS_CHART;
    //var url = 'https://api.myjson.com/bins/1he11h';
    var keySql = 'DASHBOARD_SIMULT_USERS_CHART';
    var query = buildQuery('dashbord');
    var obj = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };
    
    var formaters = {
        name: 'Usuários'
    };

    $('#userOnlineChart').html('');

    request(obj, function (json) {
        var data = addUpdateDataRequest(keySql, json.result);
        formaters.timeLine = json.result.date;
        //var d = new Date(json.result.date);
        //formaters.timeLine = intervalsTypes.Daily.getInterval(parseInt(d.getHours()), 24);
        //alert(formaters.timeLine)
        loadChartSimultUser($('#simultUserChart'), data, formaters);
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
                //relativeTo:'plot',
                theme: {
                    opacity: 0.4
                    //html:'kkk'
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
            type: 'datetime'
            //categories: formaters.timeLine
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
              pointStart:formaters.timeLine,
              pointEnd:formaters.timeLine + 3600*1000
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
            pointInterval: 60*500,
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
            categories: formaters.timeLine
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