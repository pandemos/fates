'use strict';

angular
    .module('fates.character', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/character/:idx', {
            templateUrl: 'character/character.html',
            controller: 'CharacterCtrl'
        });
    }])

    .controller('CharacterCtrl', [
        '$scope',
        '$routeParams',
        'GraphService',
        'ActionService',
        function($scope, $routeParams, GraphService, ActionService) {
            const idx = parseInt($routeParams.idx);
            GraphService
                .update()
                .then(graph => {
                    $scope.character = graph.characters[idx];
                });

            $scope.activeInvokes = [];
            $scope.skillCheckTarget = 3;

            $scope.invoke = (aspect, idx) => {
                $scope.activeInvokes.push(aspect);
                $('.character-aspect .btn').eq(idx).attr('disabled', 'disabled');
            };

            $scope.checkSkill = (skillLevel, skill, value) => {
                ActionService
                    .checkSkill(value, $scope.activeInvokes.length, $scope.skillCheckTarget)
                    .then(result => {
                        var resultClass, resultWord;

                        if (result == 'fail') {
                            resultClass = 'alert-danger';
                            resultWord = 'failed!'
                        }
                        else if (result == 'tie') {
                            resultClass = 'alert-warning';
                            resultWord = 'tied!';
                        }
                        else if (result == 'success') {
                            resultClass = 'alert-success';
                            resultWord = 'succeeded!';
                        }
                        else if (result == 'success-with-style') {
                            resultClass = 'alert-success'
                            resultWord = 'succeeded with style!';
                        }

                        $scope.activeInvokes = [];
                        $('.character-aspect .btn').removeAttr('disabled');
                        $('.alert-area')
                            .removeClass('hidden')
                            .html(`
                                <div class="alert ${resultClass} alert-dismissible">
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    Passive ${skill.name} check ${resultWord}                        
                                </div>
                            `);
                    });
            }
        }]);