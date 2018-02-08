﻿var getDataGender = function (actualQuery) {
    var url = wifimaxApp.url.GET_GENDER_CHART;
    //var url = 'https://api.myjson.com/bins/1he11h';

    var keySql = 'GET_GENDER_CHART';
    $('#pieChartGender').html('');
    var query = actualQuery ? actualQuery : gQuery;
    var obj = {
        url: url,
        type: "GET",
        noLoader: true,
        query: query
    };
    request(obj, function (json) {
        if (json.result) {
            
            var data = addUpdateDataRequest(keySql, json.result);
            var genderData = {};
            
            genderData.percentageFemale = data.percentageFemale;
            genderData.percentageMale = data.percentageMale;
            genderData.percentageNoGender = data.percentageNoGender;
            
            if(!genderData.percentageFemale && !genderData.percentageMale){
                $('#pieChartGender').html(emptyChartInfo);
            }else{
                loadChartGender($('#pieChartGender'), genderData);
            }
        }
    });
};



/**
 * In the chart render event, add icons on top of the circular shapes
 */
function renderIcons() {

    // Move icon
    if (!this.series[0].icon) {
        this.series[0].icon = this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
                .attr({
                    'stroke': '#ffffff',
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'stroke-width': 2,
                    'zIndex': 10
                })
                .add(this.series[2].group);
    }
    this.series[0].icon.translate(
            this.chartWidth / 2 - 10,
            this.plotHeight / 2 - this.series[0].points[0].shapeArgs.innerR -
            (this.series[0].points[0].shapeArgs.r - this.series[0].points[0].shapeArgs.innerR) / 2
            );

    // Exercise icon
    if (!this.series[1].icon) {
        this.series[1].icon = this.renderer.path(
                ['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8,
                    'M', 8, -8, 'L', 16, 0, 8, 8]
                )
                .attr({
                    'stroke': '#ffffff',
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'stroke-width': 2,
                    'zIndex': 10
                })
                .add(this.series[2].group);
    }
    this.series[1].icon.translate(
            this.chartWidth / 2 - 10,
            this.plotHeight / 2 - this.series[1].points[0].shapeArgs.innerR -
            (this.series[1].points[0].shapeArgs.r - this.series[1].points[0].shapeArgs.innerR) / 2
            );

    // Stand icon
    if (!this.series[2].icon) {
        this.series[2].icon = this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
                .attr({
                    'stroke': '#ffffff',
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'stroke-width': 2,
                    'zIndex': 10
                })
                .add(this.series[2].group);
    }

    this.series[2].icon.translate(
            this.chartWidth / 2 - 10,
            this.plotHeight / 2 - this.series[2].points[0].shapeArgs.innerR -
            (this.series[2].points[0].shapeArgs.r - this.series[2].points[0].shapeArgs.innerR) / 2
            );
}

var loadChartGender = function (containner, data, formaters) {

    $(containner).highcharts({
        chart: {
            type: 'solidgauge',
            height: '260px',
            events: {
                render: renderIcons
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
        tooltip: {
            borderWidth: 0,
            backgroundColor: 'none',
            shadow: false,
            style: {
                fontSize: '12px'
            },
            pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
            positioner: function (labelWidth) {
                return {
                    x: (this.chart.chartWidth - labelWidth) / 2,
                    y: (this.chart.plotHeight / 4)+40
                };
            }
        },
        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{// Track for Move
                    outerRadius: '112%',
                    innerRadius: '88%',
                    backgroundColor: Highcharts.Color('#E91E63')
                            .setOpacity(0.3)
                            .get(),
                    borderWidth: 0
                }, {// Track for Exercise
                    outerRadius: '87%',
                    innerRadius: '63%',
                    backgroundColor: Highcharts.Color('#3F51B5')
                            .setOpacity(0.3)
                            .get(),
                    borderWidth: 0
                }, {// Track for Stand
                    outerRadius: '62%',
                    innerRadius: '38%',
                    backgroundColor: Highcharts.Color('#009688')
                            .setOpacity(0.3)
                            .get(),
                    borderWidth: 0
                }]
        },
        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    enabled: false
                },
                linecap: 'round',
                stickyTracking: false,
                rounded: true
            }
        },
        series: [{
                name: 'Mulheres',
                data: [{
                        color: '#E91E63',
                        radius: '112%',
                        innerRadius: '88%',
                        y: (data.percentageFemale ? data.percentageFemale : 0)
                    }]
            }, {
                name: 'Homens',
                data: [{
                        color: '#3F51B5',
                        radius: '87%',
                        innerRadius: '63%',
                        y: (data.percentageMale ? data.percentageMale : 0)
                    }]
            }, {
                name: 'Indefinido',
                data: [{
                        color: '#009688',
                        radius: '62%',
                        innerRadius: '38%',
                        y: (data.percentageNoGender ? data.percentageNoGender : 0)
                    }]
            }]
    });


};