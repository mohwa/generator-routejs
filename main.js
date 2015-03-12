requirejs.config({

    "baseUrl": '',

    "paths": {
        "angular": 'bower_components/angular/angular.min',
        "angular_routejs": 'bower_components/angular-route/angular-route.min',
        "app": 'app'
    },

    "shim": {
        "angular": {
            "exports": 'angular'
        },
        "angular_routejs": {
            "deps": ['angular']
        },
        "routes": {
            "deps": ['app'],
            "exports": 'routes'
        },
        "app": {
            "deps": [
                'angular',
                'angular_routejs'
            ],
            "exports": 'app'
        }
    }
});

define([
    'app',
    'route'
], function(app){

    angular.element(document).ready(function(e){

        angular.bootstrap(document, ['app']);
        console.log(app);
    });
}, function(err){
});