define(['app'], function (app) {

app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/page2',{
        "template": "<div>page2</div>",
        "controller": function (){ console.log('page2');},
        "animation": "slideLeft",
        "isLogin": "true"});

    $routeProvider.when('/page3',{
        "template": "<div>page3</div>",
        "controller": function (){ console.log('page3');},
        "animation": "slideLeft",
        "isLogin": "true"});

    $routeProvider.when('/page1',{
        "template": "<div>page1</div>",
        "controller": function (){ console.log('page1');},
        "animation": "slideLeft",
        "isLogin": "true"});



    $routeProvider.otherwise({redirectTo: '/page2'});

}]);

return app;

});