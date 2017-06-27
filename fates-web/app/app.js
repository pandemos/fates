'use strict';

// Declare app level module which depends on views, and components
angular.module('fates', [
    'ngRoute',
    'fates.graph',
    'fates.characters',
    'fates.character',
    'fates.version'
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/graph'});
}])

.service('GraphService', ['$http', function($http) {

    return {
        update: () => {
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/graph'
            }).then(response => {
                return response.data;
            })
        }
    };

}])
.service('ActionService', ['$http', function($http) {

    return {

        checkSkill(skill, invokes, target) {
            return $http({
                method: 'GET',
                url: `http://localhost:3000/action/passive/skill/${skill}/invokes/${invokes}/target/${target}`
            }).then(result => {
                return result.data;
            });
        },

        checkActiveSkill(invokerSkill, invokerInvokes, opponentSkill, opponentInvokes) {
            return $http({
                method: 'GET',
                url: `http://localhost:3000/action/active/invoker-skill/${invokerSkill}/invoker-invokes/${invokerInvokes}/opponent-skill/${opponentSkill}/opponent-invokes/${opponentInvokes}`
            }).then(result => {
                return result.data;
            });
        }
    };

}]);
