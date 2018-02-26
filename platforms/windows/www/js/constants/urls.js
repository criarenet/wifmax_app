if (!wifimaxApp.url) wifimaxApp.url = {};

/*login*/
wifimaxApp.url.LOGIN_USER = "https://api.wifimax.com.br/v2/j/app/login";

/*Dashboard*/
wifimaxApp.url.DASHBOARD_ONLINE_USERS = "https://manager.wifimax.com.br/admin/userlibrary.do?action=getOnlineUsersDashBoard";

wifimaxApp.url.DASHBOARD_CONNECTION_DATA = "https://manager.wifimax.com.br/admin/userlibrary.do?action=getUserConnectionDatasDashBoard";

wifimaxApp.url.DASHBOARD_SIMULT_USERS_CHART = "https://manager.wifimax.com.br/admin/user.do?action=searchOnlineUsersDashBoard";

wifimaxApp.url.GET_COMPANIES = "https://manager.wifimax.com.br/admin/company.do?action=getCompaniesCombo";

wifimaxApp.url.GET_ROUTERS_BY_COMPANIES = "https://manager.wifimax.com.br/admin/router.do?action=getAllRoutersCombo";

/*statistics*/
wifimaxApp.url.GET_USER_DATA_STATISTIC = "https://manager.wifimax.com.br/admin/userlibrary.do?action=getUserConnectionDatasStatistic";

wifimaxApp.url.GET_USERS_ONLINE_STATISTIC = "https://manager.wifimax.com.br/admin/userlibrary.do?action=getOnlineUsersStatistics";

wifimaxApp.url.GET_NEW_REGISTERS_STATISTIC = "https://manager.wifimax.com.br/admin/userlibrary.do?action=getRegisteredUsers";

wifimaxApp.url.GET_BROWSERS_STATISTICS = "https://manager.wifimax.com.br/admin/graphic.do?action=getBrowserPizzaGraphic";

wifimaxApp.url.GET_OPERATIONAL_SYSTEM_STATISTICS = "https://manager.wifimax.com.br/admin/graphic.do?action=getOperationalSystemPizzaGraphic";

wifimaxApp.url.GET_LANDING_PAGES_STATISTCS = "https://manager.wifimax.com.br/admin/graphic.do?action=getLandingPageStatistics";

wifimaxApp.url.GET_MRTG_TRAFIC = "https://manager.wifimax.com.br/admin/graphic.do?action=getByRouter";

/*Analytics*/
wifimaxApp.url.GET_ANALYTICS_DATA = "https://manager.wifimax.com.br/admin/user.do?action=searchUsersProfilesDatas";

wifimaxApp.url.GET_ANALYTICS_GENDER_AGE_CHART = "https://manager.wifimax.com.br/admin/user.do?action=searchAgeGroupGender";

wifimaxApp.url.GET_CONVERSION_DATA = "https://manager.wifimax.com.br/admin/user.do?action=getLoginPageViewsAndAuthentication";

wifimaxApp.url.GET_CONVERSION_CHART = "https://manager.wifimax.com.br/admin/user.do?action=getLoginPageViewsAndAuthentication";

wifimaxApp.url.GET_VOUCHERCONTROL_USERS = "https://manager.wifimax.com.br/admin/vouchercontrol.do?action=getVoucherControlUsersVolume";

wifimaxApp.url.GET_GENDER_CHART = "https://manager.wifimax.com.br/admin/user.do?action=searchUsersProfilesDatas";

wifimaxApp.url.GET_MIGRATION_DATA = "https://api.wifimax.com.br/v1.0/reports/public/migrations/detalhado/app";

//https://api.wifimax.com.br/v1.0/reports/public/migrations/detalhado/?jsoncallback=Request.JSONP.request_map.request_0&idCompany=11&userSearchPeriod=DAILY&hotspotList[0]=57&referenceDate=22%2F02%2F2018";

/*config*/
wifimaxApp.url.GET_COMPANIES = "https://manager.wifimax.com.br/admin/company.do?action=getCompaniesCombo";


/*users*/
wifimaxApp.url.GET_CONTACTS = "https://manager.wifimax.com.br/admin/user.do?action=getContacts";

wifimaxApp.url.GET_ONLINE_CONTACTS = "https://manager.wifimax.com.br/report/logeedusers.do";