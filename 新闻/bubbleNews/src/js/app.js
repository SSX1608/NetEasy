/**
 * Created by qingyun on 16/11/30.
 */
angular.module('cftApp',['ionic','cftApp.httpFactory','cftApp.tabs','cftApp.news','cftApp.search','cftApp.live','cftApp.topic','cftApp.personal','cftApp.slideBox']).config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.tabs.style('standard');
    $ionicConfigProvider.navBar.alignTitle('center');
    $stateProvider.state("tabs",{
        url:"/tabs",
        abstract:true,
        templateUrl:"tabs.html",
        controller:'tabsController'
    });
    $urlRouterProvider.otherwise('tabs/news');
}]);