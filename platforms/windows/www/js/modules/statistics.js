var getUserOnlineStatistic = function (query, callback) {
    var url = wifimaxApp.url.GET_USER_DATA_STATISTIC;
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
        $('#statisticsContainer .labelColor').removeClass('loading');
        $('#statisticsContainer .labelColor').each(function () {
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