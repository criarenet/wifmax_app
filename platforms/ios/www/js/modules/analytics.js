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
                //getUserOnlineStatistic(buildQuery());
            },250);
        });
    });
};


var setterListAnalytics = function (data) {
    $('#analyticsContainer .labelColor').each(function () {
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
            setterListAnalytics(json.result);
        }
    });
};