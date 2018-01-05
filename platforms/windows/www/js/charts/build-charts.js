var buildLineChart = function(containner, series, obj, callback) {
    var period = intervalsTypes['Daily'];
    $(containner).highcharts({
        chart: {
            
            events: {
                load: function (event) {
                    if (callback) {
                        setTimeout(function () {
                            callback();
                        }, 300);
                    }
                }
            },
            
            type: obj.type ? obj.type : 'line',
            height: 200,
            backgroundColor: 'transparent'
        },
        credits:{
            enabled:false
        },
        legend: {reversed: true,itemDistance:10},
        exporting: {enabled: false},
        title: {text: ''},
        subtitle: {},
        xAxis: {
            title: {
                text: 'Proximidade'
            },
            categories: period
        },
        yAxis: {
            title: {text: ''},
            min: 0
        },
        tooltip: {
            formatter: function() {
                //console.log(this);
                var txt = '<b>' + this.series.name + '</b><br><br>';
                txt += this.key + ': ' + this.y + 'pessoa(s)';
                if (this.point.fullCategory)
                    txt += this.point.fullCategory;
                return txt;
            }
        },
        plotOptions: {
            
            series: {
                marker: {enabled: false}
            }
        },
        series: series
    });
};

var buildPieChart = function (containner, series, obj, callback) {
    var period = intervalsTypes['Daily'];
    $(containner).highcharts(
            {
                chart: {
                    
                    events: {
                        load: function (event) {
                            
                            if (callback) {
                                setTimeout(function () {
                                    callback();
                                }, 300);
                            }
                        }
                    },
                    
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: obj.type ? obj.type : 'pie'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: ''
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                },
                series: series
            });
};