'use strict';

angular
    .module('fates.characters', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/characters', {
            templateUrl: 'characters/characters.html',
            controller: 'CharactersCtrl'
        });
    }])

    .controller('CharactersCtrl', ['$scope', 'GraphService', 'ActionService', function($scope, GraphService, ActionService) {

        GraphService
            .update()
            .then(graph => {
                $scope.graph = graph;
            });

        $scope.activeActionCharacters = [];

        $scope.allSkills = character => {
            let skillList = character.skills.map(skill => skill.skills.map(s => {
                s.value = character.skills.indexOf(skill);
                return s;
            }));
            skillList = [].concat.apply([], skillList);
            return skillList;

        }

        $scope.addToActiveAction = (character, skill) => {
            $scope.activeActionCharacters.push({
                name: character.identity.name,
                skill: {
                    name: skill.name,
                    skillValue: skill.value
                },
                invokes: 1
            });
            if ($scope.activeActionCharacters.length == 2) {
                $('.active-action-btn').removeAttr('disabled');
                $('.add-to-active-action-btn').attr('disabled', 'disabled');
            }
        };

        $scope.activeAction = () => {
            const [invoker, opponent] = $scope.activeActionCharacters;
            ActionService
                .checkActiveSkill(invoker.skill.skillValue, invoker.invokes, opponent.skill.skillValue, opponent.invokes)
                .then(result => {
                    var resultClass, resultWord;

                    $scope.activeActionCharacters = [];
                    $('.active-action-btn').attr('disabled', 'disabled');
                    $('.add-to-active-action-btn').removeAttr('disabled');


                    if (result == 'fail') {
                        resultClass = 'alert-danger';
                        resultWord = 'failed'
                    }
                    else if (result == 'tie') {
                        resultClass = 'alert-warning';
                        resultWord = 'tied';
                    }
                    else if (result == 'success') {
                        resultClass = 'alert-success';
                        resultWord = 'succeeded';
                    }
                    else if (result == 'success-with-style') {
                        resultClass = 'alert-success'
                        resultWord = 'succeeded with style';
                    }
                    else {
                        console.log("Unexpected action result: ", result);
                    }

                    $scope.activeInvokes = [];
                    $('.character-aspect .btn').removeAttr('disabled');
                    $('.alert-area')
                        .removeClass('hidden')
                        .html(`
                                <div class="alert ${resultClass} alert-dismissible">
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    ${invoker.name} ${resultWord} at a ${invoker.skill.name} (+${invoker.skill.skillValue}) check opposed by ${opponent.name}'s ${opponent.skill.name} (+${opponent.skill.skillValue})
                                </div>
                            `);
                });
        };

    }]);