var startComponents = function(){
    $('#filterControl').on('click', showHideFilters);
    $('#btCloseFilters').on('click', showHideFilters);
    
    $(window).on('scrolldelta', function (e) {
        var top = e.scrollTop;
        if(top >= 51){
            $('#headerCompany').addClass('fixFilter');
            $('#filterControl').addClass('fixFilter');
        }else /*if(top < 45)*/{
            $('#headerCompany').removeClass('fixFilter');
            $('#filterControl').removeClass('fixFilter');
        }
    });
    $('#btApplyFilters').on('click', function(){
        showHideFilters();
        initCharts();
        //getDataLineCharts($('#lineChartArea'), 'https://api.myjson.com/bins/kwn6p');
        //buildMessage();
    });
    initCharts();
    
    $('.maskDate').on('keyup', function () {
        var field = this;
        mascaraData(field);
    });
    
};

var initCharts = function(){
    var line = $('#lineChartArea');
    var brw = $('#pizzaBrowser');
    var plt = $('#pizzaPlat');
    
    line.html('');
    brw.html('');
    plt.html('');
    
    $('#wrapperLoader').fadeIn();
    getDataLineCharts(line, 'https://api.myjson.com/bins/kwn6p', function(){
        getDataPizzaBrowser(brw, 'https://api.myjson.com/bins/u0ntt',function(){
            getDataPizzaPlatform(plt, 'https://api.myjson.com/bins/zqgut', function(){
                $('#wrapperLoader').hide();
            });
        });
    });
};

var showHideFilters = function () {
    var filters = $('#wrapperFiltersFields');
    var classOpen = 'fadeInUp animated';
    var classClose = 'fadeOutDown animated';

    if (filters.hasClass('fadeInUp')) {
        filters.addClass(classClose);
        setTimeout(function(){
            filters.hide();
            filters.attr('class', 'row');
        },300);
        //filters.hide();
    }else{
        filters.show();
        filters.addClass(classOpen);
    }
};

var getDataLineCharts = function (container, url, callback) {
    var query = '';
    var obj = {
        url: url,
        type: "GET",
        noLoader:true,
        query: query
    };
    request(obj, function (json) {
        if (json.result) {
            //alert(json.result);
            var data = json.result;
            var series = [
                {
                    name: 'Total',
                    data: data.total
                },
                {
                    name: 'Passantes',
                    data: data.passing

                }, {
                    name: 'Visitas',
                    data: data.visit
                },
                {
                    name: 'Visitantes',
                    data: data.incoming
                }

            ];
            var obj = {
                type:'line'
            };
            buildLineChart(container, series, obj, callback);
        }
    });
};

var getDataPizzaBrowser = function (container, url, callback) {
    var query = '';
    var objRequest = {
        url: url,
        type: "GET",
        noLoader:true,
        query: query
    };
    request(objRequest, function (json) {
        if (json.result) {
            //alert(json.result);
            //var data = json.result;
            var series = [{
            name: 'Brands',
            colorByPoint: true,
            data: json.result
        }];
            
            var obj = {
                type:'pie'
            };
            buildPieChart(container, series, obj, callback);
        }
    });
};
var getDataPizzaPlatform = function (container, url, callback) {
    var query = '';
    var objRequest = {
        url: url,
        type: "GET",
        noLoader:true,
        query: query
    };
    request(objRequest, function (json) {
        if (json.result) {
            //alert(json.result);
            //var data = json.result;
            var series = [{
            name: 'Brands',
            colorByPoint: true,
            data: json.result
        }];
            
            var obj = {
                type:'pie'
            };
            buildPieChart(container, series, obj, callback);
        }
    });
};
var intervalsTypes = {
    'realTime':['00', '01', '02', '03', '04', '05', '06',
        '07', '08', '09', '10', '11', '12', '13',
        '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23'],
    'Daily': [
        '00', '01', '02', '03', '04', '05', '06',
        '07', '08', '09', '10', '11', '12', '13',
        '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23'
    ],
    'Weekly': function() {
        
        var selectDay = $('#datepicker input[name=start]').val().split('/');

        var weekBase = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
        var startDay = new Date(selectDay[2], (selectDay[1])-1, selectDay[0]).getDay();
        var resp = [];
        var weekDay = startDay;
        for (var i = 0; i < 7; i++) {
            if (!resp.length) {
                resp.push(weekBase[startDay]);
            } else {
                var weekDay = weekDay + 1;
                if (weekDay > 6) {
                    weekDay = 0;
                }
                resp.push(weekBase[weekDay]);
            }
        }
        return resp;
    },
    'Monthly': function(start, len) {
        var res = [];
        var d = new Date();
        d.setTime(start);
        d.setHours(12);
        var mm = d.getMonth();
        if (mm === 3 || mm === 5 || mm === 8 || mm === 10) {
            len = 30;
        } else if (mm === 1) {
            var y = d.getFullYear();
            if (Number.isInteger(y / 4) && !Number.isInteger(y / 100)) {
                len = 29;
            } else if (Number.isInteger(y / 400)) {
                len = 29;
            } else {
                len = 28;
            }
        }
        for (var i = 0; i < len; i++) {
            var day, month;
            month = d.getMonth()+1;
            day = i + 1;
            if(day<10){
                day = '0'+day;
            }
            
            if(month<10){
                month = '0'+month;
            }
            res.push(day + '/' + month);
            //d.increment();
        }

        return res;

    },
    'Yearly': ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

};
