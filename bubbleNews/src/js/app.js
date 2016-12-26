/**
 * Created by qingyun on 16/11/30.
 */
angular.module('myApp',['ionic','myApp.httpFactory','myApp.slideBox','myApp.tabs','myApp.news','myApp.search','myApp.live','myApp.topic','myApp.personal','myApp.newsSummaryC','myApp.newsFactory']).config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
    $ionicConfigProvider.views.transition('ios');
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.tabs.style('standard');
    $stateProvider.state("tabs",{
        url:"/tabs",
        abstract:true,
        templateUrl:"tabs.html",
        controller:'tabsController'
    });
    $urlRouterProvider.otherwise('tabs/news');
}]);