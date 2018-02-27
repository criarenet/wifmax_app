var routerIpMrtg;
$(document).ready(function () {
    $('#detailsMrtgRouter').on('click', function(){
        
        var idRouter = $('#routersList ul li i').parent().parent().parent().attr('data-idRouter');
        if (!idRouter) {
            var txt = 'É necessário selecionar um roteador para visualizar os gráficos.'
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
        //funcionamento diferente do android
        setScreenOrientation('landscape', function () {
           
            openLandscapeCharts('', function () {

                setTimeout(function () {

                    $('#wrapperLandscapeCharts').append('<span class="dateInChart">' + $('#previewSelectedDate').html() + '</span>');
                    getTrafic(function (data) {
                        $('#headerLandscapeCharts .nav-wrapper').addClass('viewing');
                        $('#titlelandscapeChart h3').html(data);
                    });
                    $('#dataAccessCharts').addClass('viewing');
                }, 550);
            });
        });
        
    });
});

var clearMrtgTags = function(){
    $('#traficArea').html('');
    $('#traficArea').next().html('');

    $('#memoryArea').html('');
    $('#memoryArea').next().html('');
        
    $('#cpuArea').html('');
    $('#cpuArea').next().html('');
    
    $('#dataAccessCharts').removeClass('viewing');
    $('.mrtgImgContainner').addClass('empty');
};

var getTrafic = function (callback) {
    var query, url;
    url = wifimaxApp.url.GET_MRTG_TRAFIC;
    
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
    
    var types = [
        {
            type: 'TRAFFIC',
            tag: '#traficArea'
        },
        {
            type: 'MEMORY',
            tag: '#memoryArea'
        },
        {
            type: 'CPU',
            tag: '#cpuArea'
        }
    ];
    $('.mrtgImgContainner').addClass('empty');
    $.each(types, function(i, v){
        query = 'idCompany=' + gIdCompany + '&idRouter='+idRouter+'&chartType=' + types[i].type + '&chartSize=372&chartInterval=' + (periodQuery.toUpperCase());
        var obj = {
            url: url,
            type: "GET",
            noLoader: true,
            query: query
        };
        request(obj, function (json) {
            var d = new Date();
            var actualTime = d.getTime();
            if(!json.result[0].chartSrc){
                $(types[i].tag).html(emptyChartInfo);
            }else{
                var srcImage = json.result[0].chartSrc+ types[i].type + '-' + periodQuery.toLowerCase() +'.gif?'+actualTime;
                var img = '<img src="'+srcImage+'">';
                $(types[i].tag).append(img);
                $(types[i].tag).next().append(json.result[0].label);
                $(types[i].tag).removeClass('empty');

                routerIpMrtg = 'Roteador - ' + json.result[0].routerIP;
                if (callback && i == 2) {
                    callback(routerIpMrtg);
                }
            }
        });
    });
    
    
};