requirejs.config({

    "baseUrl": '',

    "paths": {
        "angular": 'bower_components/angular/angular.min',
        "app": 'app'
    },

    "shim": {
        "angular": {
            "exports": 'angular'
        },
        //"routes": {
        //    "deps": ['app'],
        //    "exports": 'routes'
        //},
        "app": {
            "deps": [
                'angular'
            ],
            "exports": 'app'
        }
    }
});

define([
    'app'
], function(app){

    angular.element(document).ready(function(e){

        angular.bootstrap(document, ['app']);
        console.log(app);
    });
}, function(err){
});