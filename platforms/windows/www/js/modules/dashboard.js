$(document).ready(function () {
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        loop: false,
        margin: 10,
        navRewind: false,
        responsive: {
            0: {
                items: 1
            }
        }
    });
    getUserOnlineChart();
    setTimeout(function(){getSimultUserChart();},1);
    setTimeout(function(){countUpDashboardNumbers();},3);
});

var getUserOnlineChart = function (callback) {
    var url = wifimaxApp.url.DASHBOARD_ONLINE_USERS;
    //var url = 'https://api.myjson.com/bins/1he11h';
    var query = '';
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
            loadChartUser($('#userOnlineChart'), json.result.data, formaters);
        }
    });
};

var countUpDashboardNumbers = function () {
    var url = wifimaxApp.url.DASHBOARD_CONNECTION_DATA;
    //var url = 'https://api.myjson.com/bins/dqrv9';
    var query = '';
    var obj = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };
    
    request(obj, function (json) {
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

var getSimultUserChart = function (callback) {
    var url = wifimaxApp.url.DASHBOARD_SIMULT_USERS_CHART;
    //var url = 'https://api.myjson.com/bins/1he11h';
    var query = 'idCompany=126';
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
        loadChartSimultUser($('#simultUserChart'), json.result, formaters);
    });
};

var loadChartSimultUser = function (containner, data, formaters) {
    $(containner).highcharts({
        chart: {
            height: '250px',
            marginBottom: 120,
            reflow: false,
            marginLeft: 50,
            marginRight: 20,
            style: {
                position: 'absolute'
            }
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
//            formatter: function () {
//                var point = this.points[0];
//                return '<b>' + point.series.name + '</b><br/>' + Highcharts.dateFormat('%A %B %e %Y', this.x) + ':<br/>' +
//                        '1 USD = ' + Highcharts.numberFormat(point.y, 2) + ' EUR';
//            },
//            shared: true
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true,
                            radius: 3
                        }
                    }
                }
            }
        },
        series: [{
                name: 'USD to EUR',
                pointStart: 0,
                pointInterval: 24 * 3600 * 1000,
                data: data.data
            }],
        exporting: {
            enabled: false
        }
    });
    
}
var loadChartUser = function (containner, data, formaters) {

    $(containner).highcharts({
        chart: {
            height: '250px'
//            events: {
//                load: function () {
//                    setTimeout(function(){
//                        formaters.callback();
//                    },1000);
//                }
//            }
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