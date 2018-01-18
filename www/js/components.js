var startComponents = function(){
    $('#filterControl').on('click', showHideFilters);
    $('#btCloseFilters').on('click', showHideFilters);

    $('#btApplyFilters').on('click', function(){
        showHideFilters();
        buildDashBoard();
    });
        
    $('.maskDate').on('keyup', function () {
        var field = this;
        mascaraData(field);
    });
    lastScrollTop = 0;
    $('#bodyApp').on('scrolldelta', function (e) {
        var top = e.scrollTop;

        if (top >= 1) {
            $('#wrapperHeader').addClass('fixFilter');
        } else {
            $('#wrapperHeader').removeClass('fixFilter');
        }
        $('#menuBottom').removeClass('fadeOutDown animated');
        if (top > lastScrollTop) {
            //$('#menuBottom').fadeOut();
            $('#menuBottom').addClass('fadeOutDown animated');
        }else{
            //$('#menuBottom').fadeIn();
            $('#menuBottom').addClass('fadeInUp animated');
        }
        lastScrollTop = top;
    });
    
    $('#menuBottom ul li').on('click', function(){
        $('#menuBottom ul li').removeClass('selected');
        $('#menuBottom ul li i').removeClass('rubberBand animated');
        $(this).addClass('selected');
        $(this).children('i').addClass('rubberBand animated');
    });
    initSliders();
};

var initSliders = function () {
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        loop: false,
        margin: 10,
        //navRewind: false,
        responsive: {
            0: {
                items: 1
            }
        }
    });
};

var showHideFilters = function () {
    var filters = $('#wrapperFiltersFields');
    var classOpen = 'slideInRight animated';
    var classClose = 'slideOutRight animated';

    if (filters.hasClass('slideInRight')) {
        filters.addClass(classClose);
        setTimeout(function(){
            filters.hide();
            filters.attr('class', 'row');
        },300);
    }else{
        $('#filtersFields').show();
        filters.show();
        filters.addClass(classOpen);
//        setTimeout(function(){
//            $('#filtersFields').fadeIn();
//        },400);
    }
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