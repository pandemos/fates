'use strict';

angular
    .module('fates.graph', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/graph', {
            templateUrl: 'graph/graph.html',
            controller: 'GraphCtrl'
        });
    }])

    .controller('GraphCtrl', ['$scope', 'GraphService', function($scope, GraphService) {
        GraphService
            .update()
            .then(graph => {
                $scope.graph = graph;
            });
    }]);