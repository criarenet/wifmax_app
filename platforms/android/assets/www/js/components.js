var typeFilterDate, reporstSelecteds = 'dashboard';

var startComponents = function(){
    $('#filterControl').on('click', function(){showHideFilters('');});
    $('#btCloseFilters').on('click', function(){showHideFilters('');});
    
    $('#btCloseMenuLeft').on('click', function(){showHideMenuLeft('');});

    $('#btApplyFilters').on('click', function () {
        showHideFilters(function () {
            var query = buildQuery();
            
            //addUpdateDataFIlter(query);
            
            switch (reporstSelecteds) {
                case 'dashboard':
                    buildDashBoard(query);
                    break;
                case 'statistics':
                    getDataStatistics(query);
                    break;
                case 'analytics':
                    loadDataAnalytics(query);
                    break;
                case 'contacts':
                    startContacsLists();
                    break;
            };
            
        });
    });
    
    $('#buttonMenuList').on('click', showHideMenuLeft);
        
    $('.maskKeyDate').on('keyup', function () {
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
//        if($(this).attr('id') === 'buttonMenuList'){
//            setTimeout(function(){
//                showHideMenuLeft();
//                showListMenu();
//            },100);
//        }
    });
    Waves.init();
    initSliders();
};

var showListMenu = function () {
    $('#menuList').addClass('showing')
     $('#menuList').addClass('slideInDown animated');
    setTimeout(function () {
        $('#menuList').removeClass('slideInDown animated');
    }, 300);
}

var buildQuery = function(dashboard){
    var query;
    var date;
    var idRouter = $('#routersList ul li i').parent().parent().parent().attr('data-idRouter');
    var idHotspot = $('#hotspotList ul li i').parent().parent().parent().attr('data-idhotspot');
    if(!idRouter){
        idHotspot = '';
    }
    query = 'idCompany=' + gIdCompany;
    query += (idRouter ? '&idRouter=' + idRouter : '');
    query += (idHotspot ? '&idHotspot=' + idHotspot : '');
    
    switch (periodQuery) {
        case 'Daily':
            date = $('#referenceDate').val();
            break;
        
        case 'Weekly':
            date = $('#weekDate').val();
            break;
        
        case 'Monthly':
            date = $('#monthlyDate').val();
            break;
    }
    
    if(dashboard !== 'dashbord'){
        query += '&referenceDate=' + date;
        query += '&userSearchPeriod=' + periodQuery;
    }else{
        //query += '&referenceDate=' + date;
        query += '&userSearchPeriod=' + 'Daily';
    }
    
    return query;
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

var showHideFilters = function (callback) {
    var filters = $('#wrapperFiltersFields');
    var classOpen = 'slideInRight animated';
    var classClose = 'slideOutRight animated';

    if (filters.hasClass('slideInRight')) {
        filters.addClass(classClose);
        setTimeout(function(){
            $('#carouselFilter').css('opacity', '0');
            filters.hide();
            filters.attr('class', 'row');
        },300);
    }else{
        filters.show();
        filters.addClass(classOpen);
        setTimeout(function(){
            $('#carouselFilter').css('opacity', '1');
        },550);
    }
    if(callback){
        setTimeout(function(){
            callback();
        },500);
    }
};


var showHideMenuLeft = function (callback) {
    var filters = $('#wrapperFiltersMenuLeft');
    var classOpen = 'slideInLeft animated';
    var classClose = 'slideOutLeft animated';

    if (filters.hasClass('slideInLeft')) {
        filters.addClass(classClose);
        setTimeout(function(){
            
            //$('#carouselFilter').css('opacity', '0');
            
            filters.hide();
            filters.attr('class', 'row');
        },300);
    }else{
        filters.show();
        filters.addClass(classOpen);
        setTimeout(function(){
            //$('#carouselFilter').css('opacity', '1');
        },300);
    }
//    if(callback){
//        setTimeout(function(){
//            callback();
//        },100);
//    }
};


var intervalsTypes = {
    'realTime':['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
        '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
        '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
        '21:00', '22:00', '23:00'],
    'Daily': [
        '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
        '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
        '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
        '21:00', '22:00', '23:00'
    ],
    'Weekly': ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
    /*function() {
        
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
        //return resp;
        return weekBase;
    }*/,
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