
define(['angular'], function(angular){

    if (!angular) return false;

    // 의존성 설정
    var app = angular.module("app", [
        'ngRoute'
    ]);

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        // google 검색 엔진의 크롤링을 위해 #!(해시뱅) 을 사용한다.
        $locationProvider.hashPrefix('!');
    }]);

    return app;
});
