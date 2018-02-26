$(document).ready(function () {
    $('#detailMigration').on('click', function () {
        
        var idRouter = $('#routersList ul li i').parent().parent().parent().attr('data-idRouter');
        if (!idRouter) {
            var txt = 'É necessário selecionar um roteador para visualizar as migrações.'
            $.notify('<strong>Ops!</strong><br>' + txt, {
                allow_dismiss: true,
                timer: 4000,
                animate: {
                    enter: 'animated bounceInUp',
                    exit: 'animated bounceOutDown'
                }
            });
            return;
        }
        
        
        openLandscapeCharts('', function () {
            setScreenOrientation('landscape');
            setTimeout(function () {
                $('#headerLandscapeCharts .nav-wrapper').addClass('viewing');
                //$('.chartBoxLandscape h3').addClass('viewing');
                //var chartTitle ='Conversão de visualizações da splash-page em logins <span class="dateInChart">'+$('#previewSelectedDate').html()+'</span>';
                $('#titlelandscapeChart h3').html('Migração entre os roteadores');
                $('#wrapperLandscapeCharts').append('<span class="dateInChart">' + $('#previewSelectedDate').html() + '</span>');
                buildDataMigrationChart();
                //getChartConversion();
            }, 250);
        });
    });
});

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
            date = $('#weekDate').val().split(' ')[0];
            break;
        
        case 'Monthly':
            date = $('#monthlyDate').val();
            break;
    }
    
    var idRouter = $('#routersList ul li i').parent().parent().parent().attr('data-idRouter');
    
    var query = '?idCompany=' + gIdCompany + '&userSearchPeriod=' + (periodQuery.toUpperCase()) + '&hotspotList[0]='+parseInt(idRouter)+'&referenceDate='+encodeURIComponent(date);
    url = url + query;
    var obj = {
        url: url
    };
    getMigrationData(obj, function (json) {
        var dataChart = [];
        
        if(!json.result || !json.result.links){
            $('#migrationChart').html(emptyChartInfo);
            return;
        }
        
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
        loadRouterMigrationChart($('#migrationChart'),dataChart, '');
    });
};

//theme para migration Chart
Highcharts.myTheme = {
   colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
      '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
   chart: {
      backgroundColor: '#FFFFFF',
      style: {
         fontFamily: '\'Unica One\', sans-serif'
      },
      plotBorderColor: '#606063'
   },
   title: {
      style: {
         color: '#E0E0E3',
         textTransform: 'uppercase',
         fontSize: '20px'
      }
   },
   subtitle: {
      style: {
         color: '#E0E0E3',
         textTransform: 'uppercase'
      }
   },
   xAxis: {
      gridLineColor: '#707073',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      title: {
         style: {
            color: '#A0A0A3'

         }
      }
   },
   yAxis: {
      gridLineColor: '#707073',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
      title: {
         style: {
            color: '#A0A0A3'
         }
      }
   },
   tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
         color: '#F0F0F0'
      }
   },
   plotOptions: {
      series: {
         dataLabels: {
            color: '#777'
         },
         marker: {
            lineColor: '#000'
         }
      },
      boxplot: {
         fillColor: '#505053'
      },
      candlestick: {
         lineColor: 'white'
      },
      errorbar: {
         color: 'white'
      }
   },
   legend: {
      itemStyle: {
         color: '#E0E0E3'
      },
      itemHoverStyle: {
         color: '#FFF'
      },
      itemHiddenStyle: {
         color: '#606063'
      }
   },
   credits: {
      style: {
         color: '#666'
      }
   },
   labels: {
      style: {
         color: '#707073'
      }
   },

   drilldown: {
      activeAxisLabelStyle: {
         color: '#F0F0F3'
      },
      activeDataLabelStyle: {
         color: '#F0F0F3'
      }
   },

   navigation: {
      buttonOptions: {
         symbolStroke: '#DDDDDD',
         theme: {
            fill: '#505053'
         }
      }
   },

   // scroll charts
   rangeSelector: {
      buttonTheme: {
         fill: '#505053',
         stroke: '#000000',
         style: {
            color: '#CCC'
         },
         states: {
            hover: {
               fill: '#707073',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            },
            select: {
               fill: '#000003',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            }
         }
      },
      inputBoxBorderColor: '#505053',
      inputStyle: {
         backgroundColor: '#333',
         color: 'silver'
      },
      labelStyle: {
         color: 'silver'
      }
   },

   navigator: {
      handles: {
         backgroundColor: '#666',
         borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
         color: '#7798BF',
         lineColor: '#A6C7ED'
      },
      xAxis: {
         gridLineColor: '#505053'
      }
   },

   scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
   },

   // special colors for some of the
   legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
   background2: '#505053',
   dataLabelsColor: '#B0B0B3',
   textColor: '#C0C0C0',
   contrastTextColor: '#F0F0F3',
   maskColor: 'rgba(255,255,255,0.3)'
};

// Apply the theme


var loadRouterMigrationChart = function (containner, data, formaters) {
    //Highcharts.setOptions(Highcharts.theme);
    //$('#container').highcharts(Highcharts.merge(options, theme1));
    $(containner).highcharts(Highcharts.merge({

        chart: {
            height: '260px'
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
        
        series: [{
                keys: ['from', 'to', 'weight'],
                data: data,
                type: 'sankey',
                name: 'Sankey demo series'
            }]
    }, Highcharts.myTheme));
};