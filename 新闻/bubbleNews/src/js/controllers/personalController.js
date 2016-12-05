/**
 * Created by qingyun on 16/11/30.
 */
angular.module('cftApp.personal',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.personal',{
        url:'/personal',
        views:{
            'tabs-personal':{
                templateUrl:'personal.html',
                controller:'personalController'
            }
        }
    });
}]).controller('personalController',['$scope',function ($scope) {

}]);