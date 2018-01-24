$(document).ready(function () {
    $('#menuLeftStatistics').on('click', function(){
        openPage('#statisticsContainer');
        typeFilterDate = 'useData';
    });
});

var openPage = function(pag){
    $('.pag').hide();
    $(pag).show();
    setTimeout(function(){
        showHideMenuLeft();
    },100);
};